import { useState } from 'react';

import { ICON_SRC } from '@/constants/fileSource';
import { formatSemester } from '@/utils/format';
type Drawer = {
  isOpen: boolean;
  onClose: () => void;
  setTimetableId: React.Dispatch<React.SetStateAction<string | null>>;
};

type MenuItem = {
  _id: string;
  year: number;
  semester: number;
  title: string;
  isPrimary: boolean;
  updated_at: string;
  total_credit: number;
};

export const Drawer = ({ isOpen, onClose, setTimetableId }: Drawer) => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const menuItems: MenuItem[] = [
    {
      _id: 'a',
      year: 2024,
      semester: 3,
      title: '4학년 2학기',
      isPrimary: true,
      updated_at: '2024-10-23T12:48:03.259Z',
      total_credit: 0,
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
  ];

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : false,
    }));
  };

  return (
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
          <span className="font-bold text-gray-400">+</span>
        </li>
        {menuItems.map((item) => (
          <li key={item._id} className="flex flex-col">
            <div className="flex justify-between items-center py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
              <div className="flex gap-2">
                <span className="font-bold">
                  {item.year}년 {formatSemester(item.semester)}
                </span>
                <img
                  src={ICON_SRC.ARROW.DOWN}
                  className="w-6 h-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(item._id);
                  }}
                ></img>
              </div>
              <button className="ml-2 text-gray-700 focus:outline-none">
                ...
              </button>
            </div>
            <div
              className={`flex justify-between items-center transition-all duration-300 ease-in-out overflow-hidden ${
                openDropdowns[item._id] === true
                  ? 'py-2 max-h-40 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
              onClick={() => {
                setTimetableId(item._id);
              }}
            >
              {openDropdowns[item._id] === true ? (
                <>
                  <div className="flex gap-1">
                    <span className="text-sm">{item.title}</span>
                    <span className="text-sm text-gray-400">
                      {'('}
                      {item.total_credit}학점
                      {')'}
                    </span>
                    {item.isPrimary && <span>👤</span>}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-400">복사</span>
                    <span className="text-sm text-gray-400">...</span>
                  </div>
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
