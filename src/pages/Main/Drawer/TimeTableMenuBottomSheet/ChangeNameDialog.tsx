import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { DialogContainer } from '@/components/Dialog';
import { SpinnerLoading } from '@/components/Loading';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useDialog } from '@/hooks/useVisible';
import { showDialog } from '@/utils/showDialog';

export const ChangeNameDialog = ({
  timetableId,
  onClose,
  prevTimeTableName,
}: {
  timetableId: string;
  onClose(): void;
  prevTimeTableName: string;
}) => {
  const [timetableName, setTimetableName] = useState(prevTimeTableName);

  const { isVisible, handleClose } = useDialog({ onClose });
  const { changeTimeTableName, isPending } = useChangeTimeTableName({
    handleClose,
  });

  const onClickButton = () => {
    if (timetableName !== '') {
      changeTimeTableName({ timetableId, timetableName });
    }
  };

  return (
    <DialogContainer isVisible={isVisible} onClick={handleClose}>
      {isPending && <SpinnerLoading />}
      <h1 className="text-lg font-semibold">이름 변경하기</h1>
      <input
        type="text"
        id="id"
        value={timetableName}
        onChange={(e) => {
          setTimetableName(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && timetableName !== '') {
            onClickButton();
          }
        }}
        placeholder={'시간표 제목을 입력하세요'}
        disabled={isPending}
        className="py-1 border-b-2 border-gray focus:outline-none focus:border-black"
      />
      <div className="flex flex-end justify-end gap-4">
        <button onClick={handleClose}>취소</button>
        <button onClick={onClickButton}>확인</button>
      </div>
    </DialogContainer>
  );
};

const useChangeTimeTableName = ({ handleClose }: { handleClose(): void }) => {
  const { timeTableService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { showErrorDialog } = showDialog();
  const queryClient = useQueryClient();

  const { mutate: changeTimeTableName, isPending } = useMutation({
    mutationFn: async ({
      timetableId,
      timetableName,
    }: {
      timetableId: string;
      timetableName: string;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return await timeTableService.changeTimeTableName({
        token,
        timetableId,
        timetableName,
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

  return { changeTimeTableName, isPending };
};
