import { getErrorMessage } from '@/entities/error';
import type { Lecture } from '@/entities/lecture';
import type { RepositoryResponse, UsecaseResponse } from '@/entities/response';
import type { TimeTable, TimeTableBrief } from '@/entities/timetable';

type TimeTableRepository = {
  getTimeTable(_: { token: string }): RepositoryResponse<TimeTable>;
  getTimeTableList(_: { token: string }): RepositoryResponse<TimeTableBrief[]>;
  getTimeTableById: (_: {
    token: string;
    timetableId: string;
  }) => RepositoryResponse<TimeTable>;
  changeTimeTableName(_: {
    token: string;
    timetableId: string;
    timetableName: string;
  }): RepositoryResponse<TimeTableBrief[]>;
  deleteTimeTableById(_: {
    token: string;
    timetableId: string;
  }): RepositoryResponse<TimeTableBrief[]>;
};
type LectureTime = Lecture['class_time_json'][number];

export type TimeTableService = {
  getTimeTable(_: { token: string }): UsecaseResponse<TimeTable>;
  getTimeTableList(_: { token: string }): UsecaseResponse<TimeTableBrief[]>;
  getTimeTableById: (_: {
    token: string;
    timetableId: string;
  }) => UsecaseResponse<TimeTable>;
  getGridPos: (time: LectureTime) => {
    col: [number, number];
    row: [number, number];
  };
  changeTimeTableName(_: {
    token: string;
    timetableId: string;
    timetableName: string;
  }): UsecaseResponse<TimeTableBrief[]>;
  deleteTimeTableById(_: {
    token: string;
    timetableId: string;
  }): UsecaseResponse<TimeTableBrief[]>;
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

  getTimeTableList: async ({ token }) => {
    const data = await timeTableRepository.getTimeTableList({ token });
    if (data.type === 'success') {
      const timeTableList = data.data;
      return { type: 'success', data: timeTableList };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },

  getTimeTableById: async ({ token, timetableId }) => {
    const data = await timeTableRepository.getTimeTableById({
      token,
      timetableId,
    });
    if (data.type === 'success') {
      const timeTable = data.data;
      return { type: 'success', data: timeTable };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },

  getGridPos: (time) => {
    const startMinute = 540;

    // 요일
    const colStart = time.day + 2;
    const colEnd = colStart + 1;

    // 시간
    const rowStart = (() => {
      const offset = parseInt(time.startMinute) - startMinute;
      const row = offset / 5;
      return Math.floor(row) + 2;
    })();

    const rowEnd = (() => {
      const offset = parseInt(time.endMinute) - startMinute;
      const row = offset / 5;
      return Math.ceil(row) + 2;
    })();

    return { col: [colStart, colEnd], row: [rowStart, rowEnd] };
  },

  changeTimeTableName: async ({ token, timetableId, timetableName }) => {
    const data = await timeTableRepository.changeTimeTableName({
      token,
      timetableId,
      timetableName,
    });
    if (data.type === 'success') {
      const timeTable = data.data;
      return { type: 'success', data: timeTable };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },

  deleteTimeTableById: async ({ token, timetableId }) => {
    const data = await timeTableRepository.deleteTimeTableById({
      token,
      timetableId,
    });
    if (data.type === 'success') {
      const timeTable = data.data;
      return { type: 'success', data: timeTable };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },
});
