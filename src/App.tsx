import './reset.css';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import type { CallParams } from './api';
import { impleSnuttApi } from './api';
import { AuthProtectedRoute } from './components/Auth';
import { PATH, ROUTE_TYPE } from './constants/route';
import { EnvContext } from './context/EnvContext';
import { ModalManageContext } from './context/ModalManageContext';
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
import { MyPage } from './pages/MyPage';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { getAuthService } from './usecases/authServices';
import { getUserService } from './usecases/userService';
import { showDialog } from './utils/showDialog';

// 어떠한 경로로 요청하더라도 Landing Page로 이동할 수 있도록 함.
// 무효 토큰을 막아야 하는 페이지는 AuthProtectedRoute 사용

const routes = [
  {
    path: PATH.SIGNIN,
    element: <SignInPage />,
    type: ROUTE_TYPE.ALL,
  },
  {
    path: PATH.SIGNUP,
    element: <SignUpPage />,
    type: ROUTE_TYPE.ALL,
  },
  {
    path: PATH.INDEX,
    element: (
      <AuthProtectedRoute>
        <MainPage />
      </AuthProtectedRoute>
    ),
    type: ROUTE_TYPE.SIGNIN,
  },
  {
    path: PATH.MYPAGE,
    element: (
      <AuthProtectedRoute>
        <MyPage />
      </AuthProtectedRoute>
    ),
    type: ROUTE_TYPE.SIGNIN,
  },
  {
    path: '/*',
    element: <LandingPage />,
    type: ROUTE_TYPE.UNSIGNIN,
  },
  {
    path: '/*',
    element: <NotFoundPage />,
    type: ROUTE_TYPE.SIGNIN,
  },
];

const UnSignInRoutes = routes.filter(
  (route) =>
    route.type === ROUTE_TYPE.ALL || route.type === ROUTE_TYPE.UNSIGNIN,
);

const SignInRoutes = routes.filter(
  (route) => route.type === ROUTE_TYPE.ALL || route.type === ROUTE_TYPE.SIGNIN,
);

const UnSignInRouter = createBrowserRouter(UnSignInRoutes);
const SignInRouter = createBrowserRouter(SignInRoutes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App = () => {
  const [isTokenError, setIsTokenError] = useState(false);
  // .env 파일 내역 불러오기
  const ENV = useGuardContext(EnvContext);
  const { showErrorDialog } = showDialog();

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
        setIsTokenError(true);
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
  const temporaryStorageRepository = implTokenSessionStorageRepository();

  const authService = getAuthService({
    authRepository,
    tokenRepository: temporaryStorageRepository,
  });
  const userService = getUserService({ userRepository });

  const services = {
    authService,
    userService,
  };

  // 토큰과 관련된 context는 따로 저장

  // tanstack query를 사용하지 않으면 그냥 tokenService를 TokenManageContext에 넣으면 됨.
  // 하지만 우리는 tanstack query를 사용하기로 했으므로
  // 인증 상태에 따라 캐싱된 데이터를 업데이트 or 삭제해줘야 함.
  const [token, setToken] = useState(temporaryStorageRepository.getToken());

  // token을 context api를 사용하여 관리하면 getToken을 사용할 이유가 없어짐.
  // saveToken과 clearToken만 생성
  const manageToken = {
    saveToken: (newToken: string) => {
      setToken(newToken);
    },
    clearToken: () => {
      setToken(null);
      // 241009 연우:
      // resetQuery에서 오류가 나오면 어떻게 해야할지 몰라서 일단 error 찍는 걸로 넣음.
      queryClient.resetQueries().catch(() => {
        showErrorDialog(
          '예상치 못한 에러가 발생했어요. 페이지를 새로고침 해주세요.',
        );
      });
    },

    // 241012 연우:
    // 개발자용 토큰 변조를 위한 부분
    // 다음주 과제 생성 시에 삭제
    contaminateToken: (wrongToken: string) => {
      setToken(wrongToken);
      temporaryStorageRepository.saveToken(wrongToken);
    },
  };

  // 모달 창 닫아주는 함수를 context api를 사용하여 관리
  const closeModal = () => {
    setIsTokenError(false);
  };

  return (
    <QueryClientProvider key={token} client={queryClient}>
      <ServiceContext.Provider value={services}>
        <TokenManageContext.Provider value={manageToken}>
          <ModalManageContext.Provider
            value={{ isModalOpen: isTokenError, closeModal }}
          >
            {token !== null ? (
              <TokenAuthContext.Provider value={{ token }}>
                <RouterProvider router={SignInRouter} />
              </TokenAuthContext.Provider>
            ) : (
              <RouterProvider router={UnSignInRouter} />
            )}
            <Toaster position="bottom-center" />
          </ModalManageContext.Provider>
        </TokenManageContext.Provider>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
