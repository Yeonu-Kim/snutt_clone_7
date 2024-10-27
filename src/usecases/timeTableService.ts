import { getErrorMessage } from '@/entities/error';
import type { RepositoryResponse, UsecaseResponse } from '@/entities/response';
import type { TimeTable } from '@/entities/timetable';

type TimeTableRepository = {
  getTimeTable(_: { token: string }): RepositoryResponse<TimeTable>;
};

export type TimeTableService = {
  getTimeTable(_: { token: string }): UsecaseResponse<TimeTable>;
};

export const getTimeTableService = ({
  timeTableRepository,
}: {
  timeTableRepository: TimeTableRepository;
}): TimeTableService => ({
  getTimeTable: async ({ token }) => {
    const data = await timeTableRepository.getTimeTable({ token });
    if (data.type === 'success') {
      const timeTable = data.data;
      return { type: 'success', data: timeTable };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },
});
