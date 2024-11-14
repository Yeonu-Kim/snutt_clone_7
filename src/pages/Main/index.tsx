// MainPage.js
import { useState } from 'react';

import { Navbar } from '@/components/Navbar';
import { Layout } from '@/components/styles/Layout';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TimetableContext } from '@/context/TimetableContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { Drawer } from '@/pages/Main/Drawer';
import { Header } from '@/pages/Main/Header';

import { TimeTable } from './TimeTable';

export const MainPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [totalCredit, setTotalCredit] = useState(0);
  const [title, setTitle] = useState('');
  const { toLectureList } = useRouteNavigation();
  const { timetableId, setTimetableId } = useGuardContext(TimetableContext);
  const { timeTableService } = useGuardContext(ServiceContext);

  const handleClickSetTimetableId = (selectedTimetableId: string | null) => {
    setTimetableId(selectedTimetableId);
    timeTableService.storeSelectedTimetableId({
      selectedTimetableId: selectedTimetableId,
    });
  };

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
      <div className="flex-1 w-full overflow-hidden">
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          selectedTimetableId={timetableId}
          handleClickSetTimetableId={handleClickSetTimetableId}
        />
        <TimeTable
          timetableId={timetableId}
          setTotalCredit={setTotalCredit}
          setTitle={setTitle}
          handleClickSetTimetableId={handleClickSetTimetableId}
        />
      </div>
      <Navbar selectedMenu="timetable" />
    </Layout>
  );
};
