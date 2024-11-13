import { getAuthService } from '@/usecases/authServices';

const storageKey = {
  snuttToken: 'snutt_token',
  selectedTimetableId: 'selectedTimetableId',
};

type TokenRepository = Parameters<typeof getAuthService>[0]['tokenRepository'];

export const implTokenSessionStorageRepository = (): TokenRepository => {
  return {
    getToken: () => sessionStorage.getItem(storageKey.snuttToken),
    saveToken: (token) => {
      sessionStorage.setItem(storageKey.snuttToken, token);
    },
    clearToken: () => {
      sessionStorage.removeItem(storageKey.snuttToken);
    },
  };
};

export const implTimetableStorageRepository = () => {
  return {
    getStorageTimetableId: () => {
      const savedTimetableId = localStorage.getItem(
        storageKey.selectedTimetableId,
      );
      if (savedTimetableId == null) return null;
      return savedTimetableId;
    },
    saveStorageTimetableId: (timetableId: string) => {
      localStorage.setItem(storageKey.selectedTimetableId, timetableId);
    },
    clearStorageTimetableId: () => {
      localStorage.removeItem(storageKey.selectedTimetableId);
    },
  };
};
