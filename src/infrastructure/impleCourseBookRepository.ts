import type { SnuttApi } from '@/api/apis/api';
import { getCourseBookService } from '@/usecases/courseBookService';

type TimeTableRepository = Parameters<
  typeof getCourseBookService
>[0]['courseBookRepository'];

export const implCourseBookRepository = ({
  snuttApi,
}: {
  snuttApi: SnuttApi;
}): TimeTableRepository => ({
  getCourseBookList: async ({ token }: { token: string }) => {
    const { status, data } = await snuttApi['GET /v1/course_books']({ token });
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', errcode: data.errcode };
  },
});
