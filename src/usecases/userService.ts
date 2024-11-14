import { getErrorMessage } from '../entities/error';
import type { RepositoryResponse, UsecaseResponse } from '../entities/response';
import type { User } from '../entities/user';

type UserRepository = {
  getUserInfo(_: { token: string }): RepositoryResponse<User>;
  patchUserInfo(_: {
    token: string;
    nickname?: string;
  }): RepositoryResponse<User>;
};

export type UserService = {
  getUserInfo(args: { token: string }): UsecaseResponse<User>;
  patchUserInfo(args: {
    token: string;
    nickname: string;
  }): UsecaseResponse<User>;
};

export const getUserService = ({
  userRepository,
}: {
  userRepository: UserRepository;
}): UserService => ({
  getUserInfo: async ({ token }) => {
    const data = await userRepository.getUserInfo({ token });
    if (data.type === 'success') {
      const user = data.data;
      return { type: 'success', data: user };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },
  patchUserInfo: async ({ token, nickname }) => {
    const data = await userRepository.patchUserInfo({ token, nickname });

    if (data.type === 'success') {
      const user = data.data;
      return { type: 'success', data: user };
    }

    return { type: 'error', message: getErrorMessage(data) };
  },
});
