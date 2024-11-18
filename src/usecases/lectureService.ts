import { getErrorMessage } from '@/entities/error';
import type { Lecture } from '@/entities/lecture';
import type { RepositoryResponse, UsecaseResponse } from '@/entities/response';

type LectureRepository = {
  deleteLecture(_: {
    token: string;
    timetableId: string;
    lectureId: string;
  }): RepositoryResponse<Lecture>;
  createCustomLecture(_: {
    token: string;
    timetableId: string;
  }): RepositoryResponse<Lecture>;
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
  }): UsecaseResponse<Lecture>;
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
  createCustomLecture: async ({ token, timetableId }) => {
    const data = await lectureRepository.createCustomLecture({
      token,
      timetableId,
    });
    if (data.type === 'success') {
      const lectureList = data.data;
      return { type: 'success', data: lectureList };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },
});
