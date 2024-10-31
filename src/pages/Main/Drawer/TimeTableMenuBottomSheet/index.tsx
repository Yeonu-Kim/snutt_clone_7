import { useEffect, useState } from 'react';

import { showDialog } from '@/utils/showDialog';

import { ChangeNameDialog } from './ChangeNameDialog';
import { DeleteDialog } from './DeleteDialog';

type TimeTableMenuBottomSheet = {
  timetable: {
    _id: string;
    title: string;
  };
  onClose(): void;
};

export const TimeTableMenuBottomSheet = ({
  timetable,
  onClose,
}: TimeTableMenuBottomSheet) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showChangeNameDialog, setShowChangeNameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { showTBDDialog } = showDialog();

  const menuOptions = [
    {
      label: '이름 변경',
      action: () => {
        setShowChangeNameDialog(true);
      },
    },
    {
      label: '학기 대표 시간표 해제',
      action: () => {
        showTBDDialog();
      },
    },
    {
      label: '시간표 테마 설정',
      action: () => {
        showTBDDialog();
      },
    },
    {
      label: '시간표 삭제',
      action: () => {
        setShowDeleteDialog(true);
      },
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // 애니메이션 실행 이후 바텀시트가 닫히도록 설정
    setTimeout(onClose, 300);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
        onClick={handleClose}
      >
        <div
          className={`w-full bg-white rounded-t-lg p-4 transform transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {menuOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center py-2 cursor-pointer hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                option.action();
              }}
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
      {showChangeNameDialog ? (
        <ChangeNameDialog
          timetableId={timetable._id}
          onClose={handleClose}
          prevTimeTableName={timetable.title}
        />
      ) : null}
      {showDeleteDialog ? (
        <DeleteDialog onClose={handleClose} timetableId={timetable._id} />
      ) : null}
    </>
  );
};
