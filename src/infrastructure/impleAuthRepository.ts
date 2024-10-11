import type { SnuttApi } from '../api/apis/api';
import { getAuthService } from '../usecases/authServices';

type AuthRepository = Parameters<typeof getAuthService>[0]['authRepository'];

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
