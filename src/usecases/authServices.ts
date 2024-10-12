import type { SignInResponse } from '../entities/auth';
import { getErrorMessage } from '../entities/error';
import type { UsecaseResponse } from '../entities/response';
import { type RepositoryResponse } from '../entities/response';

type TokenRepository = {
  getToken: () => string | null;
  saveToken: (token: string) => void;
  clearToken: () => void;
};

type AuthRepository = {
  signInWithIdPassword(args: {
    id: string;
    password: string;
  }): RepositoryResponse<{
    user_id: string;
    token: string;
    message: string;
  }>;
};

export type AuthService = {
  isValidPassword(password: string): boolean;
  signIn(args: {
    id: string;
    password: string;
  }): UsecaseResponse<SignInResponse>;
  logout(): void;
};

export const getAuthService = ({
  authRepository,
  tokenRepository,
}: {
  authRepository: AuthRepository;
  tokenRepository: TokenRepository;
}): AuthService => ({
  // 입력한 비밀번호가 유효한지 확인
  isValidPassword: (password) =>
    password.split('').some((item) => /[0-9]+/.test(item)) &&
    password.split('').some((item) => /[a-zA-Z]+/.test(item)) &&
    password.length >= 6 &&
    password.length <= 20,

  // 로그인하기 (일단 로컬 로그인만 처리)
  signIn: async (params) => {
    const data = await authRepository.signInWithIdPassword({
      id: params.id,
      password: params.password,
    });

    if (data.type === 'success') {
      tokenRepository.saveToken(data.data.token);
      return { type: 'success', data: data.data };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },

  logout: () => {
    tokenRepository.clearToken();
  },
});
