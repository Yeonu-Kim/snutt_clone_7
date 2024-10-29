import type { SnuttApi } from '@/api/apis/api';
import type { getTimeTableService } from '@/usecases/timeTableService';

type TimeTableRepository = Parameters<
  typeof getTimeTableService
>[0]['timeTableRepository'];

export const impleTimeTableRepository = ({
  snuttApi,
}: {
  snuttApi: SnuttApi;
}): TimeTableRepository => ({
  getTimeTable: async ({ token }: { token: string }) => {
    const { status, data } = await snuttApi['GET /v1/tables/recent']({ token });
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', errcode: data.errcode };
  },
  getTimeTableById: async ({
    token,
    timetableId,
  }: {
    token: string;
    timetableId: string;
  }) => {
    const { status, data } = await snuttApi['GET /v1/tables/:timetableId']({
      token,
      params: { timetableId },
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
