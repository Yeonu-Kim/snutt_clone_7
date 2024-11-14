import { useState } from 'react';

import { BottomSheetContainer } from '@/components/BottomeSheetContainer';
import { useBottomSheet } from '@/hooks/useVisible';
import { ChangeNameDialog } from '@/pages/Main/Drawer/TimeTableMenuBottomSheet/ChangeNameDialog';
import { DeleteDialog } from '@/pages/Main/Drawer/TimeTableMenuBottomSheet/DeleteDialog';
import { showDialog } from '@/utils/showDialog';

type TimeTableMenuBottomSheet = {
  timetable: {
    _id: string;
    title: string;
  };
  onClose(): void;
  selectedTimetableId: string | null;
  handleClickSetTimetableId: (timetableId: string | null) => void;
};

export const TimeTableMenuBottomSheet = ({
  timetable,
  onClose,
  handleClickSetTimetableId,
  selectedTimetableId,
}: TimeTableMenuBottomSheet) => {
  const { isVisible, handleClose } = useBottomSheet({ onClose });
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

  return (
    <>
      <BottomSheetContainer isVisible={isVisible} onClick={handleClose}>
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
      </BottomSheetContainer>
      {showChangeNameDialog ? (
        <ChangeNameDialog
          timetableId={timetable._id}
          onClose={handleClose}
          prevTimeTableName={timetable.title}
        />
      ) : null}
      {showDeleteDialog ? (
        <DeleteDialog
          onClose={handleClose}
          timetableId={timetable._id}
          selectedTimetableId={selectedTimetableId}
          handleClickSetTimetableId={handleClickSetTimetableId}
        />
      ) : null}
    </>
  );
};
