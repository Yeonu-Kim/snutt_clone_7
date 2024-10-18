import type { SnuttApi } from '@/api/apis/api';
import { type getUserService } from '@/usecases/userService';

type UserRepository = Parameters<typeof getUserService>[0]['userRepository'];

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
