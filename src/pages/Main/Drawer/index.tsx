import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import {
  AddTimeTableBySemesterMenuBar,
  AddTimeTableMenuBar,
  CourseBookMenuBar,
  DrawerHeader,
  TimeTableMenuBar,
  TimeTableMenuIcon,
} from '@/components/DrawerContainer';
import { LoadingPage } from '@/components/Loading';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import type { TimeTableBrief } from '@/entities/timetable';
import { useGuardContext } from '@/hooks/useGuardContext';
import { AddTimeTableBottomSheet } from '@/pages/Main/Drawer/AddTimeTableBottomSheet';
import { AddTimeTableBySemesterBottomSheet } from '@/pages/Main/Drawer/AddTimeTableBySemesterBottomSheet';
import { TimeTableMenuBottomSheet } from '@/pages/Main/Drawer/TimeTableMenuBottomSheet';
import { showDialog } from '@/utils/showDialog';

type Drawer = {
  isOpen: boolean;
  onClose: () => void;
  selectedTimetableId: string | null;
  setTimetableId: React.Dispatch<React.SetStateAction<string | null>>;
};

type BottomSheetItem = Pick<TimeTableBrief, '_id' | 'title'>;

export const Drawer = ({
  isOpen,
  onClose,
  selectedTimetableId,
  setTimetableId,
}: Drawer) => {
  const { showTBDDialog, showErrorDialog } = showDialog();
  const { timeTableService } = useGuardContext(ServiceContext);

  const setSelectedTimeTableId = (timetableId: string) => {
    setTimetableId(timetableId);
    onClose();
  };

  const {
    showAddTimeTableBottomSheet,
    showAddTimeTableBySemesterBottomSheet,
    openDropdowns,
    bottomSheetTimeTableInfo,
    selectedYear,
    selectedSemester,
    toggleDropdown,
    openAddTimeTable,
    closeAddTimeTable,
    openTimeTableMenu,
    closeTimeTableMenu,
    openAddTimeTableBySemester,
    closeAddTimeTableBySemester,
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

  return (
    <>
      {/* 서랍 부분 */}
      <div
        className={`absolute top-0 left-0 h-full w-[330px] px-4 bg-white border-r border-gray-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <DrawerHeader onClose={onClose} />
        <ul className="drawer-content">
          <AddTimeTableMenuBar onClick={openAddTimeTable} />
          <div
            className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
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
                  className={`flex flex-col gap-4 duration-200 ease-in-out overflow-hidden ${
                    openDropdowns[key] === true
                      ? 'py-2 h-full opacity-100'
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
                        복사
                      </TimeTableMenuIcon>
                      <TimeTableMenuIcon
                        onClick={() => {
                          openTimeTableMenu({
                            _id: timeTable._id,
                            title: timeTable.title,
                          });
                        }}
                      >
                        ...
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
      {showAddTimeTableBottomSheet ? (
        <AddTimeTableBottomSheet
          onClose={closeAddTimeTable}
          courseBookList={coursebookItems}
        />
      ) : null}
      {bottomSheetTimeTableInfo !== null ? (
        <TimeTableMenuBottomSheet
          timetable={bottomSheetTimeTableInfo}
          onClose={closeTimeTableMenu}
          selectedTimetableId={selectedTimetableId}
          setTimetableId={setTimetableId}
        />
      ) : null}
      {showAddTimeTableBySemesterBottomSheet &&
      selectedYear !== null &&
      selectedSemester !== null ? (
        <AddTimeTableBySemesterBottomSheet
          year={selectedYear}
          semester={selectedSemester}
          onClose={closeAddTimeTableBySemester}
        />
      ) : null}
    </>
  );
};

const useGetTimeTable = () => {
  const { token } = useGuardContext(TokenAuthContext);
  const { timeTableService } = useGuardContext(ServiceContext);

  const { data: timeTableListData } = useQuery({
    queryKey: ['TimeTableService', 'getTimeTableList', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 없습니다.');
      }
      return timeTableService.getTimeTableList({ token: t });
    },
    enabled: token !== null,
  });

  return { timeTableListData };
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
  const [showAddTimeTableBottomSheet, setShowAddTimeTableBottomSheet] =
    useState(false);
  const [
    showAddTimeTableBySemesterBottomSheet,
    setShowAddTimeTableBySemesterBottomSheet,
  ] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [bottomSheetTimeTableInfo, setBottomSheetTimeTableInfo] =
    useState<BottomSheetItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  return {
    showAddTimeTableBottomSheet,
    showAddTimeTableBySemesterBottomSheet,
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
      setShowAddTimeTableBottomSheet(true);
    },
    closeAddTimeTable: () => {
      setShowAddTimeTableBottomSheet(false);
    },
    openTimeTableMenu: (timetable: BottomSheetItem) => {
      setBottomSheetTimeTableInfo(timetable);
    },
    closeTimeTableMenu: () => {
      setBottomSheetTimeTableInfo(null);
    },
    openAddTimeTableBySemester: (year: number, semester: number) => {
      setSelectedYear(year);
      setSelectedSemester(semester);
      setShowAddTimeTableBySemesterBottomSheet(true);
    },
    closeAddTimeTableBySemester: () => {
      setShowAddTimeTableBySemesterBottomSheet(false);
    },
  };
};