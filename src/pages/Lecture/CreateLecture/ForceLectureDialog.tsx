import { DialogContainer } from '@/components/Dialog';
import { SpinnerLoading } from '@/components/Loading';
import { useDialog } from '@/hooks/useVisible';

export const ForceLectureDialog = ({
  onConfirm,
  isPending,
  onClose,
}: {
  onConfirm: () => void;
  onClose: () => void;
  isPending: boolean;
}) => {
  const { isVisible, handleClose } = useDialog({ onClose });
  return (
    <DialogContainer isVisible={isVisible} onClick={handleClose}>
      {isPending && <SpinnerLoading />}
      <h1 className="text-lg font-semibold">시간대 겹침</h1>
      <p className="text-sm">다른 강의와 시간이 겹칩니다. </p>
      <p className="text-sm">강의를 덮어쓰시겠습니까?</p>
      <div className="flex justify-end flex-end gap-4">
        <button onClick={handleClose}>취소</button>
        <button onClick={onConfirm}>확인</button>
      </div>
    </DialogContainer>
  );
};
