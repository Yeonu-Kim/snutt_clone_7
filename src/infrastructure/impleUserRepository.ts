import type { UserResponse } from '../api';
import type { SnuttApi } from '../api/apis/api';
import type { RepositoryResponse } from '../entities/response';

export type UserRepository = {
  getUserInfo(_: { token: string }): RepositoryResponse<UserResponse>;
};

export const impleUserRepository = ({
  snuttApi,
}: {
  snuttApi: SnuttApi;
}): UserRepository => ({
  getUserInfo: async ({ token }: { token: string }) => {
    const { status, data } = await snuttApi['GET /v1/users/me']({ token });
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', errcode: data.errcode };
  },
});
