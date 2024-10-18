import { Navbar } from '../../components/Navbar';
import { Layout } from '../../components/styles/Layout';

export const MyPage = () => {
  return (
    <Layout>
      <div>마이페이지 입니다.</div>
      <Navbar selectedMenu="mypage" />
    </Layout>
  );
};
