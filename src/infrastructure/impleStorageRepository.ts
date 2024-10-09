import { type getTokenService } from '../usecases/tokenService';

const storageKey = {
  snuttToken: 'snutt_token',
};

type GetTokenServiceParams = Parameters<typeof getTokenService>[0];

export const implTokenSessionStorageRepository =
  (): GetTokenServiceParams['temporaryStorageRepository'] => {
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
