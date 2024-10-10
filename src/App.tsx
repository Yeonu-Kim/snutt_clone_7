import './reset.css';
import './index.css';

import { useState } from 'react';

import type { CallParams } from './api';
import { impleSnuttApi } from './api';
import { EnvContext } from './context/EnvContext';
import { ServiceContext } from './context/ServiceContext';
import { TokenManageContext } from './context/TokenManageContext';
import { useGuardContext } from './hooks/useGuardContext';
import { impleAuthRepository } from './infrastructure/impleAuthRepository';
import { implTokenSessionStorageRepository } from './infrastructure/impleStorageRepository';
import { impleUserRepository } from './infrastructure/impleUserRepository';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { getAuthService } from './usecases/authServices';
import { getTokenService } from './usecases/tokenService';
import { getUserService } from './usecases/userService';

export const App = () => {
  // .env 파일 내역 불러오기
  const ENV = useGuardContext(EnvContext);

  const call = async (content: CallParams) => {
    const response = await fetch(`${ENV.API_BASE_URL}/${content.path}`, {
      method: content.method,
      headers: content.headers,
      ...(content.body !== undefined
        ? { body: JSON.stringify(content.body) }
        : {}),
    });

    const responseBody = (await response.json().catch(() => null)) as unknown;

    return {
      status: response.status,
      data: responseBody,
    };
  };

  const snuttApi = impleSnuttApi({
    httpClient: {
      call: call,
    },
  });

  // Repository, Service를 하나의 services 변수로 통합
  const authRepository = impleAuthRepository({ snuttApi });
  const userRepository = impleUserRepository({ snuttApi });

  const authService = getAuthService({ authRepository });
  const userService = getUserService({ userRepository });
  const tokenService = getTokenService({
    temporaryStorageRepository: implTokenSessionStorageRepository(),
  });
  const services = {
    authService,
    userService,
    tokenService,
  };

  const [token, setToken] = useState(tokenService.getToken());
  const tokenContextValue = {
    saveToken: (newToken: string) => {
      setToken(newToken);
      tokenService.saveToken(newToken);
    },
    clearToken: () => {
      setToken(null);
      tokenService.clearToken();
    },
  };

  return (
    <ServiceContext.Provider value={services}>
      <TokenManageContext.Provider value={tokenContextValue}>
        {token !== null ? <Landing /> : <Login />}
      </TokenManageContext.Provider>
    </ServiceContext.Provider>
  );
};
