import { useState } from 'react';
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
      isPrimary: true,
      updated_at: '2024-03-03T12:48:03.259Z',
      total_credit: 0,
    },
    {
      _id: 'c',
      year: 2023,
      semester: 3,
      title: '3학년 2학기',
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
      className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4">
        <button
          className="text-xl focus:outline-none mb-4"
          onClick={onClose}
          aria-label="Close Menu"
        >
          ×
        </button>
        <div className="relative">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <span>
                  {item.year}년 {item.semester}학기
                </span>
                <button
                  className="ml-2 text-gray-700 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(item._id);
                  }}
                >
                  ...
                </button>
                {openDropdowns[item._id] === true && (
                  <div
                    className="absolute left-16 mt-1 w-48 bg-white border border-gray-300 shadow-md z-10"
                    onClick={() => {
                      setTimetableId(item._id);
                    }}
                  >
                    <p className="px-4 py-2">{item.title}</p>
                    {item.isPrimary && (
                      <span className="text-blue-500 ml-2">👤</span>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
