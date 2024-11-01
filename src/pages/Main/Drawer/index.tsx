import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { LoadingPage } from '@/components/Loading';
import { ICON_SRC } from '@/constants/fileSource';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import type { TimeTableBrief } from '@/entities/timetable';
import { useGuardContext } from '@/hooks/useGuardContext';
import { AddTimeTableBottomSheet } from '@/pages/Main/Drawer/AddTimeTableBottomSheet';
import { AddTimeTableBySemesterBottomSheet } from '@/pages/Main/Drawer/AddTimeTableBySemesterBottomSheet';
import { TimeTableMenuBottomSheet } from '@/pages/Main/Drawer/TimeTableMenuBottomSheet';
import { formatSemester } from '@/utils/format';
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
  const { timeTableService, courseBookService } =
    useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);

  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [bottomSheetTimeTable, setBottomSheetTimeTableId] =
    useState<BottomSheetItem | null>(null);
  const [showAddTimeTableBottomSheet, setShowAddTimeTableBottomSheet] =
    useState(false);
  const [showAddTimeTableBySemester, setShowAddTimeTableBySemester] =
    useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const { showTBDDialog, showErrorDialog } = showDialog();

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

  if (timeTableListData === undefined || courseBookListData === undefined)
    return <LoadingPage />;

  if (timeTableListData.type === 'error') {
    showErrorDialog(timeTableListData.message);
    return <></>;
  }
  if (courseBookListData.type === 'error') {
    showErrorDialog(courseBookListData.message);
    return <></>;
  }

  const timetableItems = timeTableListData.data;
  const coursebookItems = courseBookListData.data;

  const sortedTimetableItems = [...timetableItems].sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    if (a.semester !== b.semester) {
      return b.semester - a.semester;
    }
    return a.isPrimary ? -1 : 0;
  });

  const recentCourse = coursebookItems.find((_, index) => index === 0);

  const initialGroupedTimeTables =
    recentCourse !== undefined
      ? {
          [`${recentCourse.year}-${recentCourse.semester}`]: {
            year: recentCourse.year,
            semester: Number(recentCourse.semester) as 1 | 2 | 3 | 4, // courseBook의 semester는 string이라 다음과 같이 수정함.
            items: [],
          },
        }
      : {};

  const groupedTimetables = sortedTimetableItems.reduce<
    Record<
      string,
      { year: number; semester: 1 | 2 | 3 | 4; items: TimeTableBrief[] }
    >
  >((acc, timetable) => {
    const key = `${timetable.year}-${timetable.semester}`;
    if (acc[key] === undefined) {
      acc[key] = {
        year: timetable.year,
        semester: timetable.semester,
        items: [],
      };
    }
    acc[key].items.push(timetable);
    return acc;
  }, initialGroupedTimeTables);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : false,
    }));
  };

  const openAddTimeTable = () => {
    setShowAddTimeTableBottomSheet(true);
  };

  const openTimeTableMenu = (timetable: BottomSheetItem) => {
    setBottomSheetTimeTableId(timetable);
  };

  const closeAddTimeTable = () => {
    setShowAddTimeTableBottomSheet(false);
  };

  const closeTimeTableMenu = () => {
    setBottomSheetTimeTableId(null);
  };
  const closeAddTimeTableBySemester = () => {
    setShowAddTimeTableBySemester(false);
  };

  const clickTimetableMenu = (timetableId: string) => {
    setTimetableId(timetableId);
    onClose();
  };

  const clickAddTimeTableBySemester = (year: number, semester: number) => {
    setSelectedYear(year);
    setSelectedSemester(semester);
    setShowAddTimeTableBySemester(true);
  };

  return (
    <>
      <div
        className={`absolute top-0 left-0 h-full w-[330px] px-4 bg-white border-r border-gray-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center py-4 border-b border-solid border-gray-300">
          <div className="flex items-center gap-2">
            <img src={ICON_SRC.LOGO} className="w-5 h-5" />
            <h1 className="text-lg font-semibold">SNUTT</h1>
          </div>
          <button
            className="text-xl focus:outline-none"
            onClick={onClose}
            aria-label="Close Menu"
          >
            x
          </button>
        </div>
        <ul>
          <li className="flex justify-between items-center pt-4 pb-2">
            <span className="text-sm text-gray-400">나의 시간표</span>
            <span
              className="font-bold text-gray-400"
              onClick={openAddTimeTable}
            >
              +
            </span>
          </li>
          <div
            className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            style={{ maxHeight: `calc(100dvh - 9rem)` }}
          >
            {Object.entries(groupedTimetables).map(([key, group]) => (
              <li key={key} className="flex flex-col">
                <div className="flex justify-between items-center py-2 text-gray-700">
                  <div className="flex gap-2">
                    <span className="font-bold">
                      {group.year}년 {formatSemester(group.semester)}
                    </span>
                    <img
                      src={ICON_SRC.ARROW.DOWN}
                      className={`w-6 h-6 cursor-pointer transition-transform duration-200 ${openDropdowns[key] === true ? 'rotate-180' : 'rotate-0'}`}
                      onClick={() => {
                        toggleDropdown(key);
                      }}
                      aria-expanded={openDropdowns[key]}
                    />
                    {group.items.length === 0 ? (
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-[50%] bg-red"></div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-4 duration-200 ease-in-out overflow-hidden ${
                    openDropdowns[key] === true
                      ? 'py-2 h-full opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  {group.items.map((timetable) => (
                    <div
                      className="flex justify-between items-center transition-all mr-4"
                      key={timetable._id}
                    >
                      <div
                        className="flex gap-1 cursor-pointer"
                        onClick={() => {
                          clickTimetableMenu(timetable._id);
                        }}
                      >
                        {timetable._id === selectedTimetableId ? (
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-[50%] bg-mint mr-2"></div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-[50%] mr-2"></div>
                          </div>
                        )}
                        <span className="text-sm">{timetable.title}</span>
                        <span className="text-sm text-gray-400">
                          ({timetable.total_credit}학점)
                        </span>
                        {timetable.isPrimary && <span>👤</span>}
                      </div>
                      <div className="flex gap-2">
                        <span
                          className="text-sm text-gray-400 cursor-pointer"
                          onClick={showTBDDialog}
                        >
                          복사
                        </span>
                        <span
                          className="text-sm text-gray-400 cursor-pointer"
                          onClick={() => {
                            openTimeTableMenu({
                              _id: timetable._id,
                              title: timetable.title,
                            });
                          }}
                        >
                          ...
                        </span>
                      </div>
                    </div>
                  ))}
                  {group.items.length === 0 ? (
                    <p
                      className="text-sm cursor-pointer ml-4"
                      onClick={() => {
                        clickAddTimeTableBySemester(group.year, group.semester);
                      }}
                    >
                      + 시간표 추가하기
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
      {showAddTimeTableBottomSheet ? (
        <AddTimeTableBottomSheet
          onClose={closeAddTimeTable}
          courseBookList={coursebookItems}
        />
      ) : null}
      {bottomSheetTimeTable !== null ? (
        <TimeTableMenuBottomSheet
          timetable={bottomSheetTimeTable}
          onClose={closeTimeTableMenu}
        />
      ) : null}
      {showAddTimeTableBySemester &&
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
