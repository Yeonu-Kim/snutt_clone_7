import { getErrorMessage } from '../entities/error';
import type { RepositoryResponse, UsecaseResponse } from '../entities/response';
import type { User } from '../entities/user';

type UserRepository = {
  getUserInfo(_: { token: string }): RepositoryResponse<{
    id: string;
    isAdmin: boolean;
    regDate: string;
    notificationCheckedAt: string;
    email?: string;
    local_id: string;
    fbName?: string;
    nickname: {
      nickname: string;
      tag: string;
    };
  }>;
};

export type UserService = {
  getUserInfo(args: { token: string }): UsecaseResponse<User>;
};

export const getUserService = ({
  userRepository,
}: {
  userRepository: UserRepository;
}): UserService => ({
  getUserInfo: async ({ token }) => {
    const data = await userRepository.getUserInfo({ token });
    if (data.type === 'success') {
      const user = {
        ...data.data,
        email: data.data.email ?? null,
      };
      return { type: 'success', data: user };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },
});
