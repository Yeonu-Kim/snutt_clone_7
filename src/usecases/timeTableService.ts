import type { CourseBook } from '@/entities/courseBook';
import { getErrorMessage } from '@/entities/error';
import type { Lecture } from '@/entities/lecture';
import type { RepositoryResponse, UsecaseResponse } from '@/entities/response';
import type { TimeTable, TimeTableBrief } from '@/entities/timetable';

type TimeTableRepository = {
  createTimeTable(_: {
    token: string;
    year: number;
    semester: number;
    title: string;
  }): RepositoryResponse<TimeTableBrief[]>;
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

type TimetableStorageRepository = {
  getStorageTimetableId: () => string | undefined;
  saveStorageTimetableId: (id: string) => void;
  clearStorageTimetableId: () => void;
};

export type TimeTableService = {
  createTimeTable(_: {
    token: string;
    year: number;
    semester: number;
    title: string;
  }): UsecaseResponse<TimeTableBrief[]>;
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
  groupTimeTableByCourseBook(_: {
    timetableItems: TimeTableBrief[];
    coursebookItems: CourseBook[];
  }): Record<
    string,
    {
      year: number;
      semester: 1 | 2 | 3 | 4;
      items: TimeTableBrief[];
    }
  >;
  storeSelectedTimetableId(_: {
    selectedTimetableId: string | undefined;
  }): void;
};

export const getTimeTableService = ({
  timeTableRepository,
  timetableStorageRepository,
}: {
  timeTableRepository: TimeTableRepository;
  timetableStorageRepository: TimetableStorageRepository;
}): TimeTableService => ({
  createTimeTable: async ({ token, semester, year, title }) => {
    const data = await timeTableRepository.createTimeTable({
      token,
      semester,
      year,
      title,
    });
    if (data.type === 'success') {
      const timeTableList = data.data;
      return { type: 'success', data: timeTableList };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },
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
      const offset = time.startMinute - startMinute;
      const row = offset / 5;
      return Math.floor(row) + 2;
    })();

    const rowEnd = (() => {
      const offset = time.endMinute - startMinute;
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

  groupTimeTableByCourseBook: ({
    timetableItems,
    coursebookItems,
  }: {
    timetableItems: TimeTableBrief[];
    coursebookItems: CourseBook[];
  }) => {
    const sortedTimetableItems = [...timetableItems].sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      if (a.semester !== b.semester) {
        return b.semester - a.semester;
      }
      return a.isPrimary ? -1 : 0;
    });

    const recentCourse = coursebookItems.find((_, index) => index === 0);

    const initialGroupedTimeTables =
      recentCourse !== undefined
        ? {
            [`${recentCourse.year}-${recentCourse.semester}`]: {
              year: recentCourse.year,
              semester: Number(recentCourse.semester) as 1 | 2 | 3 | 4, // courseBook의 semester는 string이라 다음과 같이 수정함.
              items: [],
            },
          }
        : {};

    const groupedTimetables = sortedTimetableItems.reduce<
      Record<
        string,
        { year: number; semester: 1 | 2 | 3 | 4; items: TimeTableBrief[] }
      >
    >((acc, timetable) => {
      const key = `${timetable.year}-${timetable.semester}`;
      if (acc[key] === undefined) {
        acc[key] = {
          year: timetable.year,
          semester: timetable.semester,
          items: [],
        };
      }
      acc[key].items.push(timetable);
      return acc;
    }, initialGroupedTimeTables);

    return groupedTimetables;
  },

  storeSelectedTimetableId: ({
    selectedTimetableId,
  }: {
    selectedTimetableId: string | undefined;
  }) => {
    if (selectedTimetableId !== undefined) {
      timetableStorageRepository.saveStorageTimetableId(selectedTimetableId);
    } else {
      timetableStorageRepository.clearStorageTimetableId();
    }
  },
});
