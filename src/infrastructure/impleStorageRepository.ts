import { getAuthService } from '@/usecases/authServices';

const storageKey = {
  snuttToken: 'snutt_token',
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
