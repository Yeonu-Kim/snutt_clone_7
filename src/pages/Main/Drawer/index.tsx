import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Icon } from '@/components/common/Icon';
import { LoadingPage } from '@/components/Loading';
import { ICON_SRC } from '@/constants/fileSource';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import type { TimeTableBrief } from '@/entities/timetable';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useGetTimeTable } from '@/pages/Main';
import { AddTimeTableBottomSheet } from '@/pages/Main/Drawer/AddTimeTableBottomSheet';
import { AddTimeTableBySemesterBottomSheet } from '@/pages/Main/Drawer/AddTimeTableBySemesterBottomSheet';
import { TimeTableMenuBottomSheet } from '@/pages/Main/Drawer/TimeTableMenuBottomSheet';
import { formatSemester } from '@/utils/format';
import { showDialog } from '@/utils/showDialog';

type Drawer = {
  isOpen: boolean;
  onClose: () => void;
  selectedTimetableId: string | null;
  handleClickSetTimetableId: (timetableId: string | null) => void;
};

type BottomSheetItem = Pick<TimeTableBrief, '_id' | 'title'>;

type BottomSheetSelect = 'ADD' | 'RECENT_ADD' | 'MENU' | 'NONE';

export const Drawer = ({
  isOpen,
  onClose,
  selectedTimetableId,
  handleClickSetTimetableId,
}: Drawer) => {
  const { showTBDDialog, showErrorDialog } = showDialog();
  const { timeTableService } = useGuardContext(ServiceContext);

  const setSelectedTimeTableId = (timetableId: string) => {
    handleClickSetTimetableId(timetableId);
    onClose();
  };

  const {
    showBottomSheet,
    openDropdowns,
    bottomSheetTimeTableInfo,
    selectedYear,
    selectedSemester,
    toggleDropdown,
    openAddTimeTable,
    openTimeTableMenu,
    openAddTimeTableBySemester,
    closeBottomSheet,
  } = useDrawer();

  const { timeTableListData } = useGetTimeTable();
  const { courseBookListData } = useGetCouseBook();

  if (timeTableListData === undefined || courseBookListData === undefined)
    return <LoadingPage />;

  if (timeTableListData.type === 'error') {
    showErrorDialog(timeTableListData.message);
    return null;
  }
  if (courseBookListData.type === 'error') {
    showErrorDialog(courseBookListData.message);
    return null;
  }

  const timetableItems = timeTableListData.data;
  const coursebookItems = courseBookListData.data;

  const groupedTimetables = timeTableService.groupTimeTableByCourseBook({
    timetableItems,
    coursebookItems,
  });

  const BottomSheet = () => {
    switch (showBottomSheet) {
      case 'ADD':
        return (
          <AddTimeTableBottomSheet
            onClose={closeBottomSheet}
            courseBookList={coursebookItems}
          />
        );
      case 'RECENT_ADD':
        return (
          selectedYear !== null &&
          selectedSemester !== null && (
            <AddTimeTableBySemesterBottomSheet
              year={selectedYear}
              semester={selectedSemester}
              onClose={closeBottomSheet}
            />
          )
        );
      case 'MENU':
        return (
          bottomSheetTimeTableInfo !== null && (
            <TimeTableMenuBottomSheet
              timetable={bottomSheetTimeTableInfo}
              onClose={closeBottomSheet}
              selectedTimetableId={selectedTimetableId}
              handleClickSetTimetableId={handleClickSetTimetableId}
            />
          )
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* 서랍 부분 */}
      <div
        className={`absolute left-0 top-0 h-full w-[330px] transform border-r border-gray-300 bg-white px-4 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-50 transition-transform duration-300 ease-in-out dark:border-gray-600 dark:bg-gray-950 dark:text-gray-200`}
      >
        <DrawerHeader onClose={onClose} />
        <ul className="drawer-content">
          <AddTimeTableMenuBar onClick={openAddTimeTable} />
          <div
            className="overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400"
            style={{ maxHeight: `calc(100dvh - 9rem)` }}
          >
            {Object.entries(groupedTimetables).map(([key, group]) => (
              <li key={key} className="flex flex-col">
                <CourseBookMenuBar
                  courseBook={group}
                  isOpen={openDropdowns[key] === true}
                  onClick={() => {
                    toggleDropdown(key);
                  }}
                />
                <div
                  className={`flex flex-col gap-4 overflow-hidden duration-200 ease-in-out ${
                    openDropdowns[key] === true
                      ? 'h-full py-2 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  {group.items.map((timeTable) => (
                    <TimeTableMenuBar
                      key={timeTable._id}
                      timeTable={timeTable}
                      selectedTimeTableId={selectedTimetableId}
                      onClick={() => {
                        setSelectedTimeTableId(timeTable._id);
                      }}
                    >
                      <TimeTableMenuIcon onClick={showTBDDialog}>
                        <Icon
                          src={ICON_SRC.COPY}
                          className="dark:invert"
                          alt="복사 아이콘"
                        />
                      </TimeTableMenuIcon>
                      <TimeTableMenuIcon
                        onClick={() => {
                          openTimeTableMenu({
                            _id: timeTable._id,
                            title: timeTable.title,
                          });
                        }}
                      >
                        <Icon
                          src={ICON_SRC.MORE}
                          className="rotate-90 dark:invert"
                          alt="더보기 아이콘"
                        />
                      </TimeTableMenuIcon>
                    </TimeTableMenuBar>
                  ))}
                  {group.items.length === 0 ? (
                    <AddTimeTableBySemesterMenuBar
                      onClick={() => {
                        openAddTimeTableBySemester(group.year, group.semester);
                      }}
                    >
                      + 시간표 추가하기
                    </AddTimeTableBySemesterMenuBar>
                  ) : null}
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>

      {/* 바텀시트 부분 */}
      <BottomSheet />
    </>
  );
};

const useGetCouseBook = () => {
  const { token } = useGuardContext(TokenAuthContext);
  const { courseBookService } = useGuardContext(ServiceContext);

  const { data: courseBookListData } = useQuery({
    queryKey: ['CourseBookService', 'getCourseBookList', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 없습니다.');
      }
      return courseBookService.getCourseBookList({ token: t });
    },
    enabled: token !== null,
  });

  return { courseBookListData };
};

const useDrawer = () => {
  const [showBottomSheet, setShowBottomSheet] =
    useState<BottomSheetSelect>('NONE');
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [bottomSheetTimeTableInfo, setBottomSheetTimeTableInfo] =
    useState<BottomSheetItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  return {
    showBottomSheet,
    openDropdowns,
    bottomSheetTimeTableInfo,
    selectedYear,
    selectedSemester,
    toggleDropdown: (id: string) => {
      setOpenDropdowns((prev) => ({
        ...prev,
        [id]: prev[id] !== undefined ? !prev[id] : false,
      }));
    },
    openAddTimeTable: () => {
      setShowBottomSheet('ADD');
    },
    openAddTimeTableBySemester: (year: number, semester: number) => {
      setSelectedYear(year);
      setSelectedSemester(semester);
      setShowBottomSheet('RECENT_ADD');
    },
    openTimeTableMenu: (timetable: BottomSheetItem) => {
      setBottomSheetTimeTableInfo(timetable);
      setShowBottomSheet('MENU');
    },
    closeBottomSheet: () => {
      setShowBottomSheet('NONE');
    },
  };
};

const DrawerHeader = ({ onClose }: { onClose(): void }) => {
  return (
    <div className="flex items-center justify-between border-b border-solid border-gray-300 py-4 dark:border-gray-600">
      <div className="flex items-center gap-2">
        <Icon
          src={ICON_SRC.LOGO}
          alt="SNUTT 로고"
          className="dark:brightness-150 dark:filter"
        />
        <h1 className="text-lg font-semibold">SNUTT</h1>
      </div>
      <button
        className="text-xl focus:outline-none dark:bg-gray-600"
        onClick={onClose}
        aria-label="Close Menu"
      >
        <Icon
          src={ICON_SRC.CLOSE}
          alt="서랍 닫기 버튼"
          className="dark:brightness-0 dark:invert dark:filter"
        />
      </button>
    </div>
  );
};

const AddTimeTableMenuBar = ({ onClick }: { onClick(): void }) => {
  return (
    <li className="flex items-center justify-between pb-4 pt-4">
      <span className="text-sm text-gray-400 dark:text-gray-200">
        나의 시간표
      </span>
      <span className="font-bold text-gray-400" onClick={onClick}>
        <Icon
          src={ICON_SRC.ADD}
          alt="시간표 추가하기 버튼"
          className="dark:brightness-0 dark:invert dark:filter"
        />
      </span>
    </li>
  );
};

const CourseBookMenuBar = ({
  courseBook,
  isOpen,
  onClick,
}: {
  courseBook: {
    year: number;
    semester: 1 | 2 | 3 | 4;
    items: TimeTableBrief[];
  };
  isOpen: boolean;
  onClick(): void;
}) => {
  return (
    <div className="flex items-center justify-between py-2 text-gray-700">
      <div className="flex gap-2 dark:text-gray-400">
        <span className="font-bold">
          {courseBook.year}년 {formatSemester(courseBook.semester)}
        </span>
        <button onClick={onClick}>
          <Icon
            src={ICON_SRC.ARROW.DOWN}
            alt="학기별 시간표 열기 버튼"
            className={`cursor-pointer transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'} dark:invert`}
            aria-expanded={isOpen}
          />
        </button>
        {courseBook.items.length === 0 ? (
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-[50%] bg-red"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const TimeTableMenuBar = ({
  timeTable,
  selectedTimeTableId,
  onClick,
  children,
}: {
  timeTable: TimeTableBrief;
  selectedTimeTableId: string | null;
  onClick(): void;
  children: ReactNode;
}) => {
  return (
    <div
      className="mr-4 flex items-center justify-between transition-all"
      key={timeTable._id}
    >
      <div className="flex cursor-pointer items-center gap-1" onClick={onClick}>
        {timeTable._id === selectedTimeTableId ? (
          <div className="flex items-center">
            <Icon
              size="sm"
              src={ICON_SRC.CHECK_BOX.CIRCLE}
              alt="선택된 시칸표 아이콘"
            />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-[50%]"></div>
          </div>
        )}
        <span className="text-sm">{timeTable.title}</span>
        <span className="text-sm text-gray-400">
          ({timeTable.total_credit}학점)
        </span>
        {timeTable.isPrimary && (
          <Icon
            size="sm"
            src={ICON_SRC.PRIMARY}
            alt="학기 대표 시간표 아이콘"
          />
        )}
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
};

const TimeTableMenuIcon = ({
  onClick,
  children,
}: {
  onClick(): void;
  children: ReactNode;
}) => {
  return (
    <span className="cursor-pointer text-sm text-gray-400" onClick={onClick}>
      {children}
    </span>
  );
};

const AddTimeTableBySemesterMenuBar = ({
  onClick,
  children,
}: {
  onClick(): void;
  children: ReactNode;
}) => {
  return (
    <p className="ml-4 cursor-pointer text-sm" onClick={onClick}>
      {children}
    </p>
  );
};
