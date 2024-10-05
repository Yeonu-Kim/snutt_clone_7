import type { SignInResponse } from '../entities/auth';
import { getErrorMessage } from '../entities/error';
import type { UsecaseResponse } from '../entities/response';
import type { AuthRepository } from '../infrastructure/impleAuthRepository';

export type AuthService = {
  isValidPassword(password: string): boolean;
  signIn(args: {
    id: string;
    password: string;
  }): UsecaseResponse<SignInResponse>;
};

export const getAuthService = ({
  authRepository,
}: {
  authRepository: AuthRepository;
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

    if (data.type === 'success') return { type: 'success', data: data.data };
    return { type: 'error', message: getErrorMessage(data) };
  },
});
