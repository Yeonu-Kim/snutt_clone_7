import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Drawer } from '@/app_pages/Main/Drawer';
import { Header } from '@/app_pages/Main/Header';
import { TimeTableView } from '@/app_pages/Main/TimeTable';
import { LoadingPage } from '@/components/Loading';
import { Navbar } from '@/components/Navbar';
import { Layout } from '@/components/styles/Layout';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TimetableContext } from '@/context/TimetableContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog';

import { useGetTimetableData } from '../Lecture/LectureList';

export const MainPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { toLectureList } = useRouteNavigation();
  const { timeTableService } = useGuardContext(ServiceContext);
  const { timeTableListData } = useGetTimeTable();
  const { timetableId, setTimetableId } = useGuardContext(TimetableContext);
  const { showErrorDialog } = showDialog();
  const currentTimetable = (() => {
    if (timeTableListData === undefined || timeTableListData.type === 'error') {
      return undefined;
    }
    return timetableId !== undefined
      ? timeTableListData.data.find((tt) => tt._id === timetableId)
      : timeTableListData.data[0];
  })();
  const { timetableData } = useGetTimetableData({
    timetableId: currentTimetable?._id,
  });

  if (timetableData === undefined) return <LoadingPage />;
  if (timetableData.type === 'error') {
    showErrorDialog(timetableData.message);
    return null;
  }

  const handleClickSetTimetableId = (
    selectedTimetableId: string | undefined,
  ) => {
    setTimetableId(selectedTimetableId);
    timeTableService.storeSelectedTimetableId({
      selectedTimetableId: selectedTimetableId,
    });
  };

  const totalCredit = timetableData.data.lecture_list.reduce(
    (acc, lecture) => acc + lecture.credit,
    0,
  );
  const title = timetableData.data.title;

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Layout>
      <Header
        onMenuClick={toggleDrawer}
        onLectureListClick={() => {
          if (timetableId !== undefined) {
            toLectureList({ timetableId });
          }
        }}
        totalCredit={totalCredit}
        title={title}
      />
      <div className="flex-1 w-full overflow-hidden">
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          selectedTimetableId={timetableId}
          handleClickSetTimetableId={handleClickSetTimetableId}
        />
        <TimeTableView currentTimetable={timetableData.data} />
      </div>
      <Navbar selectedMenu="timetable" />
    </Layout>
  );
};
export const useGetTimeTable = () => {
  const { token } = useGuardContext(TokenAuthContext);
  const { timeTableService } = useGuardContext(ServiceContext);

  const { data: timeTableListData } = useQuery({
    queryKey: ['TimeTableService', 'getTimeTableList', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 없습니다.');
      }
      return timeTableService.getTimeTableList({ token: t });
    },
    enabled: token !== null,
  });

  return { timeTableListData };
};
