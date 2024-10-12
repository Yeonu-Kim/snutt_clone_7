import type { impleSnuttApi } from '..';
import type { ErrorResponse, SuccessResponse } from '../response';
import type { Api, GetApiSpecsParameter } from '.';
import type {
  LocalLoginRequest,
  LocalLoginResponse,
  UserResponse,
} from './schemas';

export const getSnuttApis = ({
  callWithToken,
  callWithoutToken,
}: GetApiSpecsParameter) =>
  ({
    // 로컬 로그인 api
    'POST /v1/auth/login_local': ({ body }: { body: LocalLoginRequest }) =>
      callWithoutToken<
        SuccessResponse<LocalLoginResponse> | ErrorResponse<403, 8197>
      >({
        method: 'post',
        path: 'v1/auth/login_local',
        body,
      }),

    // 요청한 유저의 정보 전달 api
    'GET /v1/users/me': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<UserResponse> | ErrorResponse<403, 8194>>({
        method: 'get',
        path: 'v1/users/me',
        token,
      }),
  }) satisfies Record<string, Api>;

export type SnuttApi = ReturnType<typeof impleSnuttApi>;
