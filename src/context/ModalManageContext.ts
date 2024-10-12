import { createContext } from 'react';

type ModalManageContext = {
  isModalOpen: boolean;
  closeModal(): void;
};

export const ModalManageContext = createContext<ModalManageContext | null>(
  null,
);
