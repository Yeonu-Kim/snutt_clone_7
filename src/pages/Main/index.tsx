// MainPage.js
import { useState } from 'react';

import { Navbar } from '@/components/Navbar';
import { Layout } from '@/components/styles/Layout';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { Drawer } from '@/pages/Main/Drawer';
import { Header } from '@/pages/Main/Header';

import { TimeTable } from './TimeTable';

export const MainPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [timetableId, setTimetableId] = useState<string | null>(null);
  const [totalCredit, setTotalCredit] = useState(0);
  const [title, setTitle] = useState('');
  const { toLectureList } = useRouteNavigation();

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
          setTimetableId={setTimetableId}
        />
        <TimeTable
          timetableId={timetableId}
          setTotalCredit={setTotalCredit}
          setTitle={setTitle}
          setTimetableId={setTimetableId}
        />
      </div>
      <Navbar selectedMenu="timetable" />
    </Layout>
  );
};
