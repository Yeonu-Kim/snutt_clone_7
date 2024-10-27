import { useState } from 'react';

import { ICON_SRC } from '@/constants/fileSource';
import { formatSemester } from '@/utils/format';
import { showDialog } from '@/utils/showDialog';

import { AddTimeTableBottomSheet } from './AddTimeTableBottonSheet';
import { TimeTableMenuBottomSheet } from './TimeTableMenuBottomSheet';

type Drawer = {
  isOpen: boolean;
  onClose: () => void;
  setTimetableId: React.Dispatch<React.SetStateAction<string | null>>;
};

type MenuItem = {
  _id: string;
  year: number;
  semester: 1 | 2 | 3 | 4;
  title: string;
  isPrimary: boolean;
  updated_at: string;
  total_credit: number;
};

type CoursebookItem = {
  year: number;
  semester: 1 | 2 | 3 | 4;
  updated_at: string;
};

type BottomSheetItem = Pick<MenuItem, '_id' | 'title'>;

export const Drawer = ({ isOpen, onClose, setTimetableId }: Drawer) => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [bottomSheetTimeTable, setBottomSheetTimeTableId] =
    useState<BottomSheetItem | null>(null);
  const [showAddTimeTableBottomSheet, setShowAddTimeTableBottomSheet] =
    useState(false);
  const { showTBDDialog } = showDialog();
  const coursebookItems: CoursebookItem[] = [
    {
      year: 2024,
      semester: 3,
      updated_at: '2024-10-26T00:01:56.330Z',
    },
    {
      year: 2024,
      semester: 1,
      updated_at: '2024-10-16T00:02:49.950Z',
    },
    {
      year: 2023,
      semester: 4,
      updated_at: '2024-07-01T12:00:43.047Z',
    },
  ];

  const timetableItems: MenuItem[] = [
    {
      _id: 'a',
      year: 2024,
      semester: 3,
      title: '4학년 2학기',
      isPrimary: true,
      updated_at: '2024-10-23T12:48:03.259Z',
      total_credit: 1,
    },
    {
      _id: 'b',
      year: 2024,
      semester: 1,
      title: '4학년 1학기',
      isPrimary: false,
      updated_at: '2024-03-03T12:48:03.259Z',
      total_credit: 0,
    },
    {
      _id: 'c',
      year: 2023,
      semester: 4,
      title: '겨울 학기 ㅜㅜ',
      isPrimary: true,
      updated_at: '2023-09-02T12:48:03.259Z',
      total_credit: 0,
    },
    {
      _id: 'c',
      year: 2024,
      semester: 1,
      title: '예비',
      isPrimary: true,
      updated_at: '2023-09-02T12:48:03.259Z',
      total_credit: 0,
    },
  ];

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
          {coursebookItems.map((coursebook) => (
            <li
              key={`${coursebook.year}-${coursebook.semester}`}
              className="flex flex-col"
            >
              <div className="flex justify-between items-center py-2 text-gray-700">
                <div className="flex gap-2">
                  <span className="font-bold">
                    {coursebook.year}년 {formatSemester(coursebook.semester)}
                  </span>
                  <img
                    src={ICON_SRC.ARROW.DOWN}
                    className={`w-6 h-6 cursor-pointer transition-transform duration-200 ${
                      openDropdowns[
                        `${coursebook.year}-${coursebook.semester}`
                      ] === true
                        ? 'rotate-180'
                        : 'rotate-0'
                    }`}
                    onClick={() => {
                      toggleDropdown(
                        `${coursebook.year}-${coursebook.semester}`,
                      );
                    }}
                  ></img>
                </div>
              </div>
              <div
                className={`flex flex-col gap-4 duration-200 ease-in-out overflow-hidden ${
                  openDropdowns[`${coursebook.year}-${coursebook.semester}`] ===
                  true
                    ? 'py-2 max-h-40 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                {timetableItems
                  .filter(
                    (item) =>
                      item.year === coursebook.year &&
                      item.semester === coursebook.semester,
                  )
                  .map((timetable) => (
                    <div
                      className="flex justify-between items-center transition-all"
                      key={timetable._id}
                    >
                      <div
                        className="flex gap-1 cursor-pointer"
                        onClick={() => {
                          setTimetableId(timetable._id);
                        }}
                      >
                        <span className="text-sm">{timetable.title}</span>
                        <span className="text-sm text-gray-400">
                          {'('}
                          {timetable.total_credit}학점
                          {')'}
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
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showAddTimeTableBottomSheet ? (
        <AddTimeTableBottomSheet onClose={closeAddTimeTable} />
      ) : null}
      {bottomSheetTimeTable !== null ? (
        <TimeTableMenuBottomSheet
          timetable={bottomSheetTimeTable}
          onClose={closeTimeTableMenu}
        />
      ) : null}
    </>
  );
};
