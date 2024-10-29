import type { impleSnuttApi } from '..';
import type { ErrorResponse, SuccessResponse } from '../response';
import type { Api, GetApiSpecsParameter } from '.';
import type {
  ChangeNicknameRequest,
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
        method: 'POST',
        path: 'v1/auth/login_local',
        body,
      }),

    // 요청한 유저의 정보 전달 api
    'GET /v1/users/me': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<UserResponse>>({
        method: 'GET',
        path: 'v1/users/me',
        token,
      }),

    'PATCH /v1/users/me': ({
      token,
      body,
    }: {
      token: string;
      body: ChangeNicknameRequest;
    }) =>
      callWithToken<SuccessResponse<UserResponse>>({
        method: 'PATCH',
        path: 'v1/users/me',
        token,
        body,
      }),
  }) satisfies Record<string, Api>;

export type SnuttApi = ReturnType<typeof impleSnuttApi>;
