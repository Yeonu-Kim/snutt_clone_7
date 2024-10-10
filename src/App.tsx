import './reset.css';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import type { CallParams } from './api';
import { impleSnuttApi } from './api';
import { AuthProtectedRoute } from './components/Auth';
import { EnvContext } from './context/EnvContext';
import { ServiceContext } from './context/ServiceContext';
import { TokenAuthContext } from './context/TokenAuthContext';
import { TokenManageContext } from './context/TokenManageContext';
import { useGuardContext } from './hooks/useGuardContext';
import { impleAuthRepository } from './infrastructure/impleAuthRepository';
import { implTokenSessionStorageRepository } from './infrastructure/impleStorageRepository';
import { impleUserRepository } from './infrastructure/impleUserRepository';
import { NotFoundPage } from './pages/Error';
import { LandingPage } from './pages/Landing';
import { MainPage } from './pages/Main';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { getAuthService } from './usecases/authServices';
import { getTokenService } from './usecases/tokenService';
import { getUserService } from './usecases/userService';

const publicRoutes = [
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
    element: <LandingPage />,
  },
];

// 어떠한 경로로 요청하더라도 Landing Page로 이동할 수 있도록 함.
// 무효 토큰을 막아야 하는 페이지는 AuthProtectedRoute 사용

const privateRoutes = [
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/',
    element: (
      <AuthProtectedRoute>
        <MainPage />
      </AuthProtectedRoute>
    ),
  },
  {
    path: '/*',
    element: <NotFoundPage />,
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
  const [isTokenUnvalid, setIsTokenUnvalid] = useState(false);
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

    if (!response.ok) {
      if (
        responseBody !== null &&
        typeof responseBody === 'object' &&
        'errcode' in responseBody &&
        responseBody.errcode === 8194
      )
        setIsTokenUnvalid(true);
    }
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
  // 인증 상태에 따라 캐싱된 데이터를 업데이트 or 삭제해줘야 함.
  const [token, setToken] = useState(tokenService.getToken());

  // token을 context api를 사용하여 관리하면 getToken을 사용할 이유가 없어짐.
  // saveToken과 clearToken만 생성
  const tokenServiceWithStateSetter = {
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
            <TokenAuthContext.Provider value={{ token, isTokenUnvalid }}>
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
