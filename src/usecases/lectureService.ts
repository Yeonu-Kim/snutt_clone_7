import { getErrorMessage } from '@/entities/error';
import type { CustomLecture, Lecture } from '@/entities/lecture';
import type { RepositoryResponse, UsecaseResponse } from '@/entities/response';
import type { TimeTable } from '@/entities/timetable';

type LectureRepository = {
  deleteLecture(_: {
    token: string;
    timetableId: string;
    lectureId: string;
  }): RepositoryResponse<Lecture>;
  createCustomLecture(_: {
    token: string;
    timetableId: string;
    lectureDetails: CustomLecture;
  }): RepositoryResponse<TimeTable>;
};

export type LectureService = {
  deleteLecture(_: {
    token: string;
    timetableId: string;
    lectureId: string;
  }): UsecaseResponse<Lecture>;
  createCustomLecture(_: {
    token: string;
    timetableId: string;
    lectureDetails: CustomLecture;
  }): UsecaseResponse<TimeTable>;
};

export const getLecutureService = ({
  lectureRepository,
}: {
  lectureRepository: LectureRepository;
}): LectureService => ({
  deleteLecture: async ({ token, timetableId, lectureId }) => {
    const data = await lectureRepository.deleteLecture({
      token,
      timetableId,
      lectureId,
    });
    if (data.type === 'success') {
      const deletedLecture = data.data;
      return { type: 'success', data: deletedLecture };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },
  createCustomLecture: async ({ token, timetableId, lectureDetails }) => {
    const data = await lectureRepository.createCustomLecture({
      token,
      timetableId,
      lectureDetails,
    });
    if (data.type === 'success') {
      const lectureList = data.data;
      return { type: 'success', data: lectureList };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },
});
