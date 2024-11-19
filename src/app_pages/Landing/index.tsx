import Image from 'next/image';

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
          className="flex flex-auto w-full h-full flex-col items-center justify-center"
        >
          <div className="imageWrapper flex flex-col flex-auto justify-center items-center gap-4">
            <Image src={ICON_SRC.LOGO} alt="timetable" width={60} height={60} />
            <h1 className="title font-eng font-extrabold  text-2xl">
              TimeTable
            </h1>
          </div>
          <div className="bottomWrapper flex-col">
            <div
              id="wrapper-button"
              className="w-full h-[72px] mb-[40px] gap-[15px] flex flex-col justify-center items-center"
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
              className="w-full h-[85px] flex flex-col justify-center items-center gap-[24px] mb-12"
            >
              <div className="flex justify-center items-center w-[320px]">
                <div className="flex-grow border-t border-gray mr-2" />
                <p className="text-gray text-sm flex items-center">
                  SNS 계정으로 계속하기
                </p>
                <div className="flex-grow border-t border-gray ml-2" />
              </div>
              <div
                id="SNS-icon"
                className="h-[44px] gap-[12px] flex justify-center"
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
