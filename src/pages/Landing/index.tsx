import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Layout } from '@/components/common/Layout';
import { ICON_SRC } from '@/constants/fileSource';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
export const LandingPage = () => {
  const { toSignIn, toSignUp } = useRouteNavigation();
  const socialLoginIcon = [
    {
      src: ICON_SRC.SOCIAL.KAKAO,
      alt: 'kakaotalk',
    },
    {
      src: ICON_SRC.SOCIAL.GOOGLE,
      alt: 'google',
    },
    {
      src: ICON_SRC.SOCIAL.FACEBOOK,
      alt: 'facebook',
    },
    {
      src: ICON_SRC.SOCIAL.APPLE,
      alt: 'apple',
    },
  ];

  return (
    <Layout>
      <div className="h-full bg-white">
        <div className="flex h-full w-full flex-auto flex-col items-center justify-center">
          <div className="flex flex-auto flex-col items-center justify-center gap-4">
            <img src={ICON_SRC.LOGO} alt="timetable" />
            <h1 className="title font-eng text-2xl font-extrabold">
              TimeTable
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Button onClick={toSignIn}>로그인</Button>
              <Button variant="white" onClick={toSignUp}>
                회원가입
              </Button>
            </div>
            <div className="mb-12 flex flex-col items-center justify-center gap-6">
              <div className="flex w-[320px] items-center justify-center">
                <div className="mr-2 flex-grow border-t border-gray" />
                <p className="flex items-center text-sm text-gray">
                  SNS 계정으로 계속하기
                </p>
                <div className="ml-2 flex-grow border-t border-gray" />
              </div>
              <div className="flex justify-center gap-3">
                {socialLoginIcon.map((item, index) => (
                  <Icon
                    key={`social-login-${index}`}
                    size="lg"
                    darkModeInvert="none"
                    src={item.src}
                    alt={item.alt}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
