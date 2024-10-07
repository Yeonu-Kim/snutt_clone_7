import type { LocalLoginRequest, LocalLoginResponse } from '../api';
import type { SnuttApi } from '../api/apis/api';
import type { RepositoryResponse } from '../entities/response';

export type AuthRepository = {
  signInWithIdPassword(
    args: LocalLoginRequest,
  ): RepositoryResponse<LocalLoginResponse>;
};

export const impleAuthRepository = ({
  snuttApi,
}: {
  snuttApi: SnuttApi;
}): AuthRepository => ({
  signInWithIdPassword: async (body) => {
    const { status, data } = await snuttApi['POST /v1/auth/login_local']({
      body,
    });
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', errcode: data.errcode };
  },
});
