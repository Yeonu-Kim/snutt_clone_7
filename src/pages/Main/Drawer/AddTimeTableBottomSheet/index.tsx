type TimeTableMenuBottomSheet = {
  onClose(): void;
};

export const AddTimeTableBottomSheet = ({
  onClose,
}: TimeTableMenuBottomSheet) => {
  return <div onClick={onClose}>시간표 만들기</div>;
};
