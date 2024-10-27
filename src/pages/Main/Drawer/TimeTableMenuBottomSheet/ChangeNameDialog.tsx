import { useState } from 'react';

type ChangeNameDialog = {
  onClose(): void;
  prevTimeTableName: string;
};

export const ChangeNameDialog = ({
  onClose,
  prevTimeTableName,
}: ChangeNameDialog) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeTableName, setTimeTableName] = useState(prevTimeTableName);

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
        <h1 className="text-lg font-semibold">이름 변경하기</h1>
        <input
          type="text"
          id="id"
          value={timeTableName}
          onChange={(e) => {
            setTimeTableName(e.target.value);
          }}
          className="py-1 border-b-2 border-gray focus:outline-none focus:border-black"
        />
        <div className="flex flex-end justify-end gap-4">
          <button onClick={handleClose}>취소</button>
          <button onClick={handleClose}>확인</button>
        </div>
      </div>
    </div>
  );
};
