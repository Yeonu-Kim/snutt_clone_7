import { Navbar } from '@/components/Navbar';
import { Layout } from '@/components/styles/Layout';

import { Drawer } from './drawer';
import { TimeTable } from './timeTable';

export const MainPage = () => {
  // todo: 현재 시간표 id 저장하기 (기본값 recent)
  // todo: drawer에 의해 현재 시간표 id가 변경될 수 있도록 하기
  // todo: timetable component는 id를 props로 받아서 렌더링하기

  return (
    <Layout>
      <p>메인페이지입니다.</p>
      <TimeTable />
      <Drawer />
      <Navbar selectedMenu="timetable" />
    </Layout>
  );
};
