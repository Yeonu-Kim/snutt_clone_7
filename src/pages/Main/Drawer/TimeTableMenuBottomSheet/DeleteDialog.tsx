import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DialogContainer } from '@/components/Dialog';
import { SpinnerLoading } from '@/components/Loading';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useDialog } from '@/hooks/useVisible';
import { showDialog } from '@/utils/showDialog';

export const DeleteDialog = ({
  onClose,
  timetableId,
  selectedTimetableId,
  handleClickSetTimetableId,
}: {
  onClose(): void;
  timetableId: string;
  selectedTimetableId: string | null;
  handleClickSetTimetableId: (timetableId: string | null) => void;
}) => {
  const { isVisible, handleClose } = useDialog({ onClose });
  const { deleteTimeTable, isPending } = useDeleteTimeTable({
    handleClose,
    selectedTimetableId,
    handleClickSetTimetableId: handleClickSetTimetableId,
  });

  const onClickButton = () => {
    deleteTimeTable({ timetableId });
  };

  return (
    <DialogContainer isVisible={isVisible} onClick={handleClose}>
      {isPending && <SpinnerLoading />}
      <h1 className="text-lg font-semibold">시간표 삭제</h1>
      <p className="text-sm">시간표를 정말 삭제하시겠습니까?</p>
      <div className="flex justify-end flex-end gap-4">
        <button onClick={handleClose}>취소</button>
        <button onClick={onClickButton}>확인</button>
      </div>
    </DialogContainer>
  );
};

const useDeleteTimeTable = ({
  handleClose,
  selectedTimetableId,
  handleClickSetTimetableId,
}: {
  handleClose(): void;
  selectedTimetableId: string | null;
  handleClickSetTimetableId: (timetableId: string | null) => void;
}) => {
  const { timeTableService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { showErrorDialog } = showDialog();
  const queryClient = useQueryClient();

  const { mutate: deleteTimeTable, isPending } = useMutation({
    mutationFn: async ({ timetableId }: { timetableId: string }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      if (timetableId === selectedTimetableId) {
        handleClickSetTimetableId(null);
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

  return { deleteTimeTable, isPending };
};
