import type { ResponseNecessary } from '../response';
import { getSnuttApis } from './api';

export type Api = (_: {
  body: never;
  token: string;
  params: never;
  query: never;
}) => Promise<{ status: number; data: unknown }>;

type InternalClient = {
  call: <R extends ResponseNecessary>(_: {
    method: string;
    path: string;
    body?: Record<string, unknown>;
    token?: string;
  }) => Promise<R>;
};

export type GetApiSpecsParameter = {
  callWithToken: <R extends ResponseNecessary>(
    p: Parameters<InternalClient['call']>[0] & { token: string },
  ) => Promise<R>;
  callWithoutToken: <R extends ResponseNecessary>(
    p: Omit<Parameters<InternalClient['call']>[0], 'token'> & { token?: never },
  ) => Promise<R>;
};

export const apis = (client: InternalClient) => {
  const callWithToken = <R extends ResponseNecessary>(
    // @params p: call 함수의 매개변수로 들어온 내용물
    /* {
        method: string;
        path: string;
        body?: Record<string, unknown>;
        token?: string;
    } */
    p: Parameters<InternalClient['call']>[0] & { token: string },
  ) => client.call<R>(p);

  const callWithoutToken = <R extends ResponseNecessary>(
    p: Parameters<InternalClient['call']>[0] & { token?: never },
  ) => client.call<R>(p);

  const params = { callWithToken, callWithoutToken };

  // 나중에 다른 API가 추가될 경우 하나의 api 레포에서 관리 가능하도록 함.
  // {...api1(params), ...api2(params)}
  // 하나의 api를 사용하더라도 아예 getSnuttApis에서 다양한 api 정보를 담고 있어서
  // 해당 파일에서 통합해서 관리하면 파일이 너무 길어지고 복잡한 듯 -> 일단 분리
  return getSnuttApis(params);
};
