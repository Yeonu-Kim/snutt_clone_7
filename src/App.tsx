import './reset.css';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import type { CallParams } from './api';
import { impleSnuttApi } from './api';
import { EnvContext } from './context/EnvContext';
import { ServiceContext } from './context/ServiceContext';
import { useGuardContext } from './hooks/useGuardContext';
import { impleAuthRepository } from './infrastructure/impleAuthRepository';
import { implTokenSessionStorageRepository } from './infrastructure/impleStorageRepository';
import { impleUserRepository } from './infrastructure/impleUserRepository';
import { NotFound } from './pages/Error';
import { LandingPage } from './pages/landing';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { getAuthService } from './usecases/authServices';
import { getTokenService } from './usecases/tokenService';
import { getUserService } from './usecases/userService';

const publicRoutes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
];

const routes = [...publicRoutes];

const router = createBrowserRouter(routes);

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

  return (
    <ServiceContext.Provider value={services}>
      <RouterProvider router={router} />
    </ServiceContext.Provider>
  );
};
