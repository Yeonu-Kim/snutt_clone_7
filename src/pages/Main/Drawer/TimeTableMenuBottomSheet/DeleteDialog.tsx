import { useState } from 'react';

type DeleteDialog = {
  onClose(): void;
  timetableId: string;
};

export const DeleteDialog = ({ onClose, timetableId }: DeleteDialog) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    // 애니메이션 실행 이후 바텀시트가 닫히도록 설정
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed flex justify-center items-center inset-0 z-50 flex items-end bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className={`flex flex-col gap-4 bg-white rounded-lg shadow-lg p-6 w-[300px] relative transition-transform duration-300 ${
          isVisible ? 'animate-popup' : 'animate-popout'
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-lg font-semibold">시간표 삭제</h1>
        <p className="text-sm">{timetableId} 시간표를 정말 삭제하시겠습니까?</p>
        <div className="flex justify-end flex-end gap-4">
          <button onClick={handleClose}>취소</button>
          <button onClick={handleClose}>확인</button>
        </div>
      </div>
    </div>
  );
};
