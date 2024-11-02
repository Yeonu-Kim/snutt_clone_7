import type { CourseBook } from '@/entities/courseBook';
import { getErrorMessage } from '@/entities/error';
import type { RepositoryResponse, UsecaseResponse } from '@/entities/response';

type CourseBookRepository = {
  getCourseBookList(_: { token: string }): RepositoryResponse<CourseBook[]>;
};

export type CourseBookService = {
  getCourseBookList(_: { token: string }): UsecaseResponse<CourseBook[]>;
};

export const getCourseBookService = ({
  courseBookRepository,
}: {
  courseBookRepository: CourseBookRepository;
}): CourseBookService => ({
  getCourseBookList: async ({ token }) => {
    const data = await courseBookRepository.getCourseBookList({ token });
    if (data.type === 'success') {
      const courseBook = data.data;
      return { type: 'success', data: courseBook };
    }
    return { type: 'error', message: getErrorMessage(data) };
  },
});
