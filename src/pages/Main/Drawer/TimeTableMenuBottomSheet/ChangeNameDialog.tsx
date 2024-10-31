import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { useGuardContext } from '@/hooks/useGuardContext';
import { showDialog } from '@/utils/showDialog';

type ChangeNameDialog = {
  timetableId: string;
  onClose(): void;
  prevTimeTableName: string;
};

export const ChangeNameDialog = ({
  timetableId,
  onClose,
  prevTimeTableName,
}: ChangeNameDialog) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeTableName, setTimeTableName] = useState(prevTimeTableName);
  const { timeTableService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { showErrorDialog } = showDialog();
  const queryClient = useQueryClient();

  const { mutate: changeTimeTableName, isPending } = useMutation({
    mutationFn: async (inputTimeTableName: string) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return await timeTableService.changeTimeTableName({
        token,
        timetableId,
        timetableName: inputTimeTableName,
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

  const handleClose = () => {
    setIsVisible(false);
    // 애니메이션 실행 이후 바텀시트가 닫히도록 설정
    setTimeout(onClose, 300);
  };

  const onClickButton = () => {
    if (timeTableName !== '') {
      changeTimeTableName(timeTableName);
    }
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
          value={isPending ? '처리 중입니다...' : timeTableName}
          onChange={(e) => {
            setTimeTableName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && timeTableName !== '') {
              onClickButton();
            }
          }}
          disabled={isPending}
          className="py-1 border-b-2 border-gray focus:outline-none focus:border-black"
        />
        <div className="flex flex-end justify-end gap-4">
          <button onClick={handleClose}>취소</button>
          <button onClick={onClickButton}>확인</button>
        </div>
      </div>
    </div>
  );
};
