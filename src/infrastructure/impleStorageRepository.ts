import { getAuthService } from '@/usecases/authServices';
import type { getTimeTableService } from '@/usecases/timeTableService.ts';

const storageKey = {
  snuttToken: 'snutt_token',
  selectedTimetableId: 'selectedTimetableId',
};

type TokenRepository = Parameters<typeof getAuthService>[0]['tokenRepository'];
type TimetableRepository = Parameters<typeof getTimeTableService>[0]['timetableStorageRepository'];

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

export const implTimetableStorageRepository = (): TimetableRepository => {
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
