import { useEffect, useState } from 'react';

type TimeTableMenuBottomSheet = {
  timetableId: string;
  onClose(): void;
};

export const TimeTableMenuBottomSheet = ({
  timetableId,
  onClose,
}: TimeTableMenuBottomSheet) => {
  const menuOptions = [
    {
      label: '이름 변경',
      action: () => {
        console.error({ timetableId });
      },
    },
    {
      label: '학기 대표 시간표 해제',
      action: () => {
        console.error('Remove Representative');
      },
    },
    {
      label: '시간표 테마 설정',
      action: () => {
        console.error('Set Theme');
      },
    },
    {
      label: '시간표 삭제',
      action: () => {
        console.error('Delete Timetable');
      },
    },
  ];

  return <BottomSheet onClose={onClose} options={menuOptions} />;
};

type BottomSheetProps = {
  onClose: () => void;
  options: { label: string; action: () => void }[];
};

const BottomSheet = ({ onClose, options }: BottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the slide-up animation when the component mounts
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // Slide down animation before closing
    setIsVisible(false);
    setTimeout(onClose, 300); // Close the bottom sheet after the animation completes
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className={`w-full bg-white rounded-t-lg p-4 transform transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              option.action();
              handleClose();
            }}
          >
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
