import { SocialSignInIconContainer } from '@/components/common/IconContainer';
import { Button } from '@/components/styles/Button';
import { Layout } from '@/components/styles/Layout';
import { ICON_SRC } from '@/constants/fileSource';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';

export const LandingPage = () => {
  const { toSignIn, toSignUp } = useRouteNavigation();

  return (
    <Layout>
      <div id="container" className="h-full bg-white">
        <div
          id="wrapper-feature"
          className="flex h-full w-full flex-auto flex-col items-center justify-center"
        >
          <div className="imageWrapper flex flex-auto flex-col items-center justify-center gap-4">
            <img src={ICON_SRC.LOGO} alt="timetable" />
            <h1 className="title font-eng text-2xl font-extrabold">
              TimeTable
            </h1>
          </div>
          <div className="bottomWrapper flex-col">
            <div
              id="wrapper-button"
              className="mb-[40px] flex h-[72px] w-full flex-col items-center justify-center gap-[15px]"
            >
              <Button onClick={toSignIn}>로그인</Button>

              <button
                id="signup"
                className="h-[17px] w-[311px] transition-colors duration-300 hover:text-orange"
                onClick={toSignUp}
              >
                회원가입
              </button>
            </div>
            <div
              id="wrapper-SNS"
              className="mb-12 flex h-[85px] w-full flex-col items-center justify-center gap-[24px]"
            >
              <div className="flex w-[320px] items-center justify-center">
                <div className="mr-2 flex-grow border-t border-gray" />
                <p className="flex items-center text-sm text-gray">
                  SNS 계정으로 계속하기
                </p>
                <div className="ml-2 flex-grow border-t border-gray" />
              </div>
              <div
                id="SNS-icon"
                className="flex h-[44px] justify-center gap-[12px]"
              >
                <SocialSignInIconContainer
                  src="/landing/kakaotalkid.png"
                  alt="kakaotalk"
                />
                <SocialSignInIconContainer
                  src="/landing/googleid.png"
                  alt="google"
                />
                <SocialSignInIconContainer
                  src="/landing/facebookid.png"
                  alt="facebook"
                />
                <SocialSignInIconContainer
                  src="/landing/appleid.png"
                  alt="apple"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
