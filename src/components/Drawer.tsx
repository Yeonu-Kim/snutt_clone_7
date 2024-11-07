import type { ReactNode } from 'react';

import { ICON_SRC } from '@/constants/fileSource';
import type { TimeTableBrief } from '@/entities/timetable';
import { formatSemester } from '@/utils/format';

export const DrawerHeader = ({ onClose }: { onClose(): void }) => {
  return (
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
        <img src={ICON_SRC.CLOSE} />
      </button>
    </div>
  );
};

export const AddTimeTableMenuBar = ({ onClick }: { onClick(): void }) => {
  return (
    <li className="flex justify-between items-center pt-4 pb-4">
      <span className="text-sm text-gray-400">나의 시간표</span>
      <span className="font-bold text-gray-400" onClick={onClick}>
        <img src={ICON_SRC.ADD} />
      </span>
    </li>
  );
};

export const CourseBookMenuBar = ({
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
    <div className="flex justify-between items-center py-2 text-gray-700">
      <div className="flex gap-2">
        <span className="font-bold">
          {courseBook.year}년 {formatSemester(courseBook.semester)}
        </span>
        <img
          src={ICON_SRC.ARROW.DOWN}
          className={`w-6 h-6 cursor-pointer transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          onClick={onClick}
          aria-expanded={isOpen}
        />
        {courseBook.items.length === 0 ? (
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-[50%] bg-red"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const TimeTableMenuBar = ({
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
      className="flex justify-between items-center transition-all mr-4"
      key={timeTable._id}
    >
      <div className="flex items-center gap-1 cursor-pointer" onClick={onClick}>
        {timeTable._id === selectedTimeTableId ? (
          <div className="flex items-center">
            <img src={ICON_SRC.CHECK_BOX.CIRCLE} className="w-4 h-4" />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-[50%] mr-2"></div>
          </div>
        )}
        <span className="text-sm">{timeTable.title}</span>
        <span className="text-sm text-gray-400">
          ({timeTable.total_credit}학점)
        </span>
        {timeTable.isPrimary && (
          <img src={ICON_SRC.PRIMARY} className="w-4 h-4" />
        )}
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
};

export const TimeTableMenuIcon = ({
  onClick,
  children,
}: {
  onClick(): void;
  children: ReactNode;
}) => {
  return (
    <span className="text-sm text-gray-400 cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

export const AddTimeTableBySemesterMenuBar = ({
  onClick,
  children,
}: {
  onClick(): void;
  children: ReactNode;
}) => {
  return (
    <p className="text-sm cursor-pointer ml-4" onClick={onClick}>
      {children}
    </p>
  );
};
