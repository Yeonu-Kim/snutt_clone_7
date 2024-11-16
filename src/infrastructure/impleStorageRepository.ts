import { getAuthService } from '@/usecases/authServices';
import type { getTimeTableService } from '@/usecases/timeTableService.ts';

const storageKey = {
  snuttToken: 'snutt_token',
  selectedTimetableId: 'selectedTimetableId',
  colorScheme: 'colorScheme',
};

type TokenRepository = Parameters<typeof getAuthService>[0]['tokenRepository'];
type TimetableRepository = Parameters<
  typeof getTimeTableService
>[0]['timetableStorageRepository'];

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
      const timetableId = localStorage.getItem(storageKey.selectedTimetableId);
      return timetableId !== null ? timetableId : undefined;
    },
    saveStorageTimetableId: (timetableId: string) => {
      localStorage.setItem(storageKey.selectedTimetableId, timetableId);
    },
    clearStorageTimetableId: () => {
      localStorage.removeItem(storageKey.selectedTimetableId);
    },
  };
};

export const impleColorSchemeRepository = () => {
  return {
    getStorageColorScheme: () => {
      return localStorage.getItem(storageKey.colorScheme);
    },
    saveStorageColorScheme: (colorScheme: string) => {
      localStorage.setItem(storageKey.colorScheme, colorScheme);
    },
    clearStorageColorScheme: () => {
      localStorage.removeItem(storageKey.colorScheme);
    },
  };
};
