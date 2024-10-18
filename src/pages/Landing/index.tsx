import { Button } from '../../components/styles/Button';
import { Layout } from '../../components/styles/Layout';
import { useNavigation } from '../../hooks/useNavigation';

export const LandingPage = () => {
  const { toSignIn, toSignUp } = useNavigation();

  return (
    <Layout>
      <div id="container" className="h-full bg-white">
        <div
          id="wrapper-feature"
          className="flex flex-auto w-full h-full flex-col items-center justify-center"
        >
          <div className="imageWrapper flex flex-col flex-auto justify-center items-center gap-8">
            <img
              id="image-TimeTable"
              src="/logo/snutt_logo.svg"
              alt="timetable"
              className="w-60 h-60"
            ></img>
            <h1 className="title font-eng font-extrabold text-2xl">
              TimeTable
            </h1>
          </div>
          <div className="bottomWrapper flex-col">
            <div
              id="wrapper-button"
              className="w-full h-72 mb-40 gap-15 flex flex-col justify-center items-center"
            >
              <Button onClick={toSignIn}>로그인</Button>

              <button
                id="signup"
                className="w-[311px] h-[17px] hover:text-orange transition-colors duration-300"
                onClick={toSignUp}
              >
                회원가입
              </button>
            </div>
            <div
              id="wrapper-SNS"
              className="w-full h-85 flex flex-col justify-center items-center gap-24 mb-48"
            >
              <div className="flex justify-center items-center w-[32rem]">
                <div className="flex-grow border-t border-gray mr-8" />
                <p className="text-gray text-sm flex items-center">
                  SNS 계정으로 계속하기
                </p>
                <div className="flex-grow border-t border-gray ml-8" />
              </div>
              <div id="SNS-icon" className="h-44 gap-12 flex justify-center">
                <img src="/landing/kakaotalkid.png" alt="kakaotalk" />
                <img src="/landing/googleid.png" alt="google" />
                <img src="/landing/facebookid.png" alt="facebook" />
                <img src="/landing/appleid.png" alt="apple" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
