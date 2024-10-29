import type { impleSnuttApi } from '..';
import type { SuccessResponse } from '../response';
import type { Api, GetApiSpecsParameter } from '.';
import type {
  LocalLoginRequest,
  LocalLoginResponse,
  TimeTableResponse,
  UserResponse,
} from './schemas';

export const getSnuttApis = ({
  callWithToken,
  callWithoutToken,
}: GetApiSpecsParameter) =>
  ({
    // 로컬 로그인 api
    'POST /v1/auth/login_local': ({ body }: { body: LocalLoginRequest }) =>
      callWithoutToken<SuccessResponse<LocalLoginResponse>>({
        method: 'post',
        path: 'v1/auth/login_local',
        body,
      }),

    // 요청한 유저의 정보 전달 api
    'GET /v1/users/me': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<UserResponse>>({
        method: 'get',
        path: 'v1/users/me',
        token,
      }),
    //  최근 시간표 불러오는 api
    'GET /v1/tables/recent': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<TimeTableResponse>>({
        method: 'get',
        path: 'v1/tables/recent',
        token,
      }),
    'GET /v1/tables/:timetableId': ({
      token,
      params,
    }: {
      token: string;
      params: { timetableId: string };
    }) =>
      callWithToken<SuccessResponse<TimeTableResponse>>({
        method: 'get',
        path: `/v1/tables/${params.timetableId}`,
        token,
      }),
  }) satisfies Record<string, Api>;

export type SnuttApi = ReturnType<typeof impleSnuttApi>;
