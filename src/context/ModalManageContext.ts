import { createContext } from 'react';

type ModalManageContext = {
  isModalOpen: boolean;
  setModalOpen(isOpen: boolean): void;
};

export const ModalManageContext = createContext<ModalManageContext | null>(
  null,
);
