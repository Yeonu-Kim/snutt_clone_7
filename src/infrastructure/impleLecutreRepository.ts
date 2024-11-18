import type { SnuttApi } from '@/api/apis/api';
import { getLecutureService } from '@/usecases/lectureService';

type LectureRepository = Parameters<
  typeof getLecutureService
>[0]['lectureRepository'];

export const implLectureRepository = ({
  snuttApi,
}: {
  snuttApi: SnuttApi;
}): LectureRepository => ({
  deleteLecture: async ({ token, timetableId, lectureId }) => {
    const { status, data } = await snuttApi[
      'DELETE /v1/tables/:timetableId/lecture/:lectureId'
    ]({ token, params: { timetableId, lectureId } });
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', errcode: data.errcode };
  },
  createCustomLecture: async ({ token, timetableId, lectureDetails }) => {
    const { status, data } = await snuttApi[
      'POST /v1/tables/:timetableId/lecture'
    ]({
      token,
      params: { timetableId },
      body: lectureDetails,
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
