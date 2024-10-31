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
  createTimeTable: async ({ token, semester, year, title }) => {
    const { status, data } = await snuttApi['POST /v1/tables']({
      token,
      body: { semester, year, title },
    });
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', errcode: data.errcode };
  },
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
  getTimeTableList: async ({ token }: { token: string }) => {
    const { status, data } = await snuttApi['GET /v1/tables']({ token });
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
  changeTimeTableName: async ({ token, timetableId, timetableName }) => {
    const { status, data } = await snuttApi['PUT /v1/tables/:timetableId']({
      token,
      params: { timetableId },
      body: { title: timetableName },
    });
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', errcode: data.errcode };
  },
  deleteTimeTableById: async ({ token, timetableId }) => {
    const { status, data } = await snuttApi['DELETE /v1/tables/:timetableId']({
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
