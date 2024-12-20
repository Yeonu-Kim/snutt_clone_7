import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DialogContainer } from '@/components/Dialog';
import { SpinnerLoading } from '@/components/Loading';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useRouteNavigation } from '@/hooks/useRouteNavigation';
import { useDialog } from '@/hooks/useVisible';
import { showDialog } from '@/utils/showDialog';

export const DeleteLectureDialog = ({
  onClose,
  timetableId,
  lectureId,
}: {
  onClose(): void;
  timetableId: string;
  lectureId: string;
}) => {
  const { isVisible, handleClose } = useDialog({ onClose });
  const { deleteLecture, isPending } = useDeleteTimeTable({
    handleClose,
  });

  const onClickButton = () => {
    deleteLecture({ timetableId, lectureId });
  };

  return (
    <DialogContainer isVisible={isVisible} onClick={handleClose}>
      {isPending && <SpinnerLoading />}
      <h1 className="text-lg font-semibold">강의 삭제</h1>
      <p className="text-sm">강의를 삭제하시겠습니까?</p>
      <div className="flex-end flex justify-end gap-4">
        <button onClick={handleClose}>취소</button>
        <button onClick={onClickButton}>확인</button>
      </div>
    </DialogContainer>
  );
};

const useDeleteTimeTable = ({ handleClose }: { handleClose(): void }) => {
  const { lectureService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { showErrorDialog } = showDialog();
  const queryClient = useQueryClient();
  const { toMain } = useRouteNavigation();

  const { mutate: deleteLecture, isPending } = useMutation({
    mutationFn: async ({
      timetableId,
      lectureId,
    }: {
      timetableId: string;
      lectureId: string;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return await lectureService.deleteLecture({
        token,
        timetableId,
        lectureId,
      });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries({
          queryKey: ['TimeTableService'],
        });
        handleClose();
        toMain();
      } else {
        showErrorDialog(response.message);
      }
    },
    onError: () => {
      showErrorDialog('시간표 이름 변경 중 문제가 발생했습니다.');
    },
  });

  return { deleteLecture, isPending };
};
