import { createContext } from 'react';

type ModalManageContext = {
  isModalOpen: boolean;
  setOpen(isOpen: boolean): void;
};

export const ModalManageContext = createContext<ModalManageContext | null>(
  null,
);
