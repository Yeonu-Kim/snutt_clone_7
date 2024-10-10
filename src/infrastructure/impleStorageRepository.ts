import { type getTokenService } from '../usecases/tokenService';

type GetTokenServiceParams = Parameters<typeof getTokenService>[0];

export const implTokenSessionStorageRepository =
  (): GetTokenServiceParams['temporaryStorageRepository'] => {
    return {
      getToken: () => sessionStorage.getItem('snutt_token'),
      saveToken: (token) => {
        sessionStorage.setItem('snutt_token', token);
      },
      clearToken: () => {
        sessionStorage.removeItem('snutt_token');
      },
    };
  };
