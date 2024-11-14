import { apis } from './apis';
import type { ResponseNecessary } from './response';

export type CallParams = {
  method: string;
  path: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
};

// api key가 현재는 필요 없어서 삭제
export const impleSnuttApi = ({
  httpClient,
}: {
  httpClient: {
    call: (_: CallParams) => Promise<ResponseNecessary>;
  };
}) =>
  // 요청한 응답에 대한 response 전달
  apis({
    call: async <R extends ResponseNecessary>(content: {
      method: string;
      path: string;
      body?: Record<string, unknown>;
      token?: string;
    }) => {
      const response = await httpClient.call({
        method: content.method,
        path: content.path,
        body: content.body,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          ...(content.token !== undefined
            ? { 'x-access-token': content.token }
            : {}),
        },
      });

      return response as R;
    },
  });
