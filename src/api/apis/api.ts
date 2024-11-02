import type { impleSnuttApi } from '..';
import type { SuccessResponse } from '../response';
import type { Api, GetApiSpecsParameter } from '.';
import type {
  ChangeNicknameRequest,
  CourseBookResponse,
  LocalLoginRequest,
  LocalLoginResponse,
  TimeTableBriefResponse,
  TimeTableIdParams,
  TimeTableRequest,
  TimeTableResponse,
  TimeTableTitleRequest,
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
        method: 'POST',
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
      params: TimeTableIdParams;
    }) =>
      callWithToken<SuccessResponse<TimeTableResponse>>({
        method: 'get',
        path: `v1/tables/${params.timetableId}`,
        token,
      }),
    'GET /v1/tables': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<TimeTableBriefResponse[]>>({
        method: 'get',
        path: 'v1/tables',
        token,
      }),
    'GET /v1/course_books': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<CourseBookResponse[]>>({
        method: 'get',
        path: 'v1/course_books',
        token,
      }),
    'PUT /v1/tables/:timetableId': ({
      token,
      params,
      body,
    }: {
      token: string;
      params: TimeTableIdParams;
      body: TimeTableTitleRequest;
    }) =>
      callWithToken<SuccessResponse<TimeTableBriefResponse[]>>({
        method: 'PUT',
        path: `v1/tables/${params.timetableId}`,
        token,
        body,
      }),
    'DELETE /v1/tables/:timetableId': ({
      token,
      params,
    }: {
      token: string;
      params: TimeTableIdParams;
    }) =>
      callWithToken<SuccessResponse<TimeTableBriefResponse[]>>({
        method: 'DELETE',
        path: `v1/tables/${params.timetableId}`,
        token,
      }),
    'POST /v1/tables': ({
      token,
      body,
    }: {
      token: string;
      body: TimeTableRequest;
    }) =>
      callWithToken<SuccessResponse<TimeTableBriefResponse[]>>({
        method: 'POST',
        path: `v1/tables`,
        token,
        body,
      }),
  }) satisfies Record<string, Api>;

export type SnuttApi = ReturnType<typeof impleSnuttApi>;
