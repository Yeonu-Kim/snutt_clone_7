import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { LoadingPage } from '@/components/Loading.tsx';
import { Layout } from '@/components/styles/Layout.tsx';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { showDialog } from '@/utils/showDialog.ts';

export const LectureListPage = () => {
  const { timetableId } = useParams();
  const { showErrorDialog } = showDialog();

  const { timetableData } = useGetTimetableData({ timetableId });

  if (timetableData === undefined) return <LoadingPage />;

  if (timetableData.type === 'error') {
    showErrorDialog(timetableData.message);
    return null;
  }

  return (
    <>
      <Layout>
        lectures!
      </Layout>
    </>
  )
}

const useGetTimetableData = ({
                               timetableId,
                             }: {
  timetableId: string | undefined;
}) => {
  const { token } = useGuardContext(TokenAuthContext);
  const { timeTableService } = useGuardContext(ServiceContext);

  const { data: timetableData } = useQuery({
    queryKey: [
      'TimeTableService',
      'getTimeTableById',
      token,
      timetableId,
    ] as const,
    queryFn: ({ queryKey: [, , t, ttId] }) => {
      if (t === null || ttId === undefined) {
        throw new Error('잘못된 요청입니다.');
      }
      return timeTableService.getTimeTableById({ token: t, timetableId: ttId });
    },
    enabled: token !== null && timetableId !== undefined,
  });

  return { timetableData };
};