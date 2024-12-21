import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Layout } from '@/components/common/Layout';
import { LoadingPage } from '@/components/Loading';
import { Navbar } from '@/components/Navbar';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TimetableContext } from '@/context/TimetableContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { Drawer } from '@/pages/Main/Drawer';
import { Header } from '@/pages/Main/Header';
import { TimeTableView } from '@/pages/Main/TimeTable';
import { showDialog } from '@/utils/showDialog';

import { useGetTimetableData } from '../Lecture/LectureList';

export const MainPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { toLectureList } = useRouteNavigation();
  const { timetableId, setTimetableId } = useGuardContext(TimetableContext);
  const { timeTableService } = useGuardContext(ServiceContext);
  const { timeTableListData } = useGetTimeTable();
  const { showErrorDialog } = showDialog();

  const currentTimetable = (() => {
    if (timeTableListData === undefined || timeTableListData.type === 'error') {
      return null;
    }
    return timetableId !== null
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

  const handleClickSetTimetableId = (selectedTimetableId: string | null) => {
    setTimetableId(selectedTimetableId);
    if (selectedTimetableId === null) {
      timeTableService.resetSelectedTimetableId();
      return;
    }
    timeTableService.storeSelectedTimetableId({
      selectedTimetableId,
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
          if (timetableId !== null) {
            toLectureList({ timetableId });
          }
        }}
        totalCredit={totalCredit}
        title={title}
      />
      <div className="w-full flex-1 overflow-hidden">
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          selectedTimetableId={currentTimetable?._id ?? null}
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
