// MainPage.js
import { useState } from 'react';

import { Navbar } from '@/components/Navbar';
import { Layout } from '@/components/styles/Layout';
import { Drawer } from '@/pages/Main/Drawer';
import { Header } from '@/pages/Main/Header';

import { TimeTable } from './TimeTable';

export const MainPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [timetableId, setTimetableId] = useState<string | null>(null);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Layout>
      <Header onMenuClick={toggleDrawer} />
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        setTimetableId={setTimetableId}
      />
      <p>메인페이지입니다.</p>
      <TimeTable timetableId={timetableId} />
      <Navbar selectedMenu="timetable" />
    </Layout>
  );
};
