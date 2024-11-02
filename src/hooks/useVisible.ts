import { useEffect, useState } from 'react';

export const useBottomSheet = ({ onClose }: { onClose(): void }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // 애니메이션 실행 이후 바텀시트가 닫히도록 설정
    setTimeout(onClose, 300);
  };

  return {
    isVisible,
    handleClose,
  };
};

export const useDialog = ({ onClose }: { onClose(): void }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    // 애니메이션 실행 이후 바텀시트가 닫히도록 설정
    setTimeout(onClose, 300);
  };

  return { isVisible, handleClose };
};
