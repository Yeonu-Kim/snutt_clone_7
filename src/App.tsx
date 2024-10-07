import './reset.css';

import type { CallParams } from './api';
import { impleSnuttApi } from './api';
import { EnvContext } from './context/EnvContext';
import { ServiceContext } from './context/ServiceContext';
import { useGaurdContext } from './hooks/useGaurdContext';
import { impleAuthRepository } from './infrastructure/impleAuthRepository';
import { impleUserRepository } from './infrastructure/impleUserRepository';
import { Landing } from './pages/landing';
import { getAuthService } from './usecases/authServices';
import { getUserService } from './usecases/userService';

export const App = () => {
  // .env 파일 내역 불러오기
  const ENV = useGaurdContext(EnvContext);

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

  const services = {
    authService,
    userService,
  };

  return (
    <ServiceContext.Provider value={services}>
      <Landing />
    </ServiceContext.Provider>
  );
};
