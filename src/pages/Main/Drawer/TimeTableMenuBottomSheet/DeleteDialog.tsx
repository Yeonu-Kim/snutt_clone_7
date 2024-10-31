import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { useGuardContext } from '@/hooks/useGuardContext';
import { showDialog } from '@/utils/showDialog';

type DeleteDialog = {
  onClose(): void;
  timetableId: string;
};

export const DeleteDialog = ({ onClose, timetableId }: DeleteDialog) => {
  const [isVisible, setIsVisible] = useState(true);
  const { timeTableService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { showErrorDialog } = showDialog();
  const queryClient = useQueryClient();

  const { mutate: deleteTimeTable, isPending } = useMutation({
    mutationFn: async () => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return await timeTableService.deleteTimeTableById({
        token,
        timetableId,
      });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries({
          queryKey: ['TimeTableService'],
        });
        handleClose();
      } else {
        showErrorDialog(response.message);
      }
    },
    onError: () => {
      showErrorDialog('시간표 이름 변경 중 문제가 발생했습니다.');
    },
  });

  const onClickButton = () => {
    deleteTimeTable();
  };

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
        <p className="text-sm">
          {isPending ? '처리 중입니다...' : '시간표를 정말 삭제하시겠습니까?'}
        </p>
        <div className="flex justify-end flex-end gap-4">
          <button onClick={handleClose}>취소</button>
          <button onClick={onClickButton}>확인</button>
        </div>
      </div>
    </div>
  );
};
