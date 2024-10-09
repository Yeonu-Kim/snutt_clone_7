import './reset.css';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import type { CallParams } from './api';
import { impleSnuttApi } from './api';
import { EnvContext } from './context/EnvContext';
import { ServiceContext } from './context/ServiceContext';
import { TokenAuthContext } from './context/TokenAuthContext';
import { TokenManageContext } from './context/TokenManageContext';
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

const privateRoutes = [
  {
    path: '/',
    element: <LandingPage />,
  },
];

const publicRouter = createBrowserRouter(publicRoutes);
const privateRouter = createBrowserRouter(privateRoutes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

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

  const services = {
    authService,
    userService,
  };

  // 토큰과 관련된 context는 따로 저장
  const temporaryStorageRepository = implTokenSessionStorageRepository();
  const tokenService = getTokenService({ temporaryStorageRepository });

  // tanstack query를 사용하지 않으면 그냥 tokenService를 TokenManageContext에 넣으면 됨.
  // 하지만 우리는 tanstack query를 사용하기로 했으므로
  // 인증 상태에 따라 캐싱된 데이터를 업데이트해줘야 함.
  const [token, setToken] = useState(tokenService.getToken());

  // token을 context api를 사용하여 관리하면 getToken을 사용할 이유가 없어짐.
  // saveToken과 clearToken만 생성
  const tokenServiceWithStateSetter = {
    ...tokenService,
    saveToken: (newToken: string) => {
      setToken(newToken);
      tokenService.saveToken(newToken);
    },
    clearToken: () => {
      setToken(null);
      tokenService.clearToken();
      // 241009 연우:
      // resetQuery에서 오류가 나오면 어떻게 해야할지 몰라서 일단 error 찍는 걸로 넣음.
      queryClient.resetQueries().catch((error: unknown) => {
        console.error(error);
      });
    },
  };

  return (
    <QueryClientProvider key={token} client={queryClient}>
      <ServiceContext.Provider value={services}>
        <TokenManageContext.Provider value={tokenServiceWithStateSetter}>
          {token !== null ? (
            <TokenAuthContext.Provider value={{ token }}>
              <RouterProvider router={privateRouter} />
            </TokenAuthContext.Provider>
          ) : (
            <RouterProvider router={publicRouter} />
          )}
        </TokenManageContext.Provider>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
