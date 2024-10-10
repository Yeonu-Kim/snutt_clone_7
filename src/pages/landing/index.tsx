import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  return (
    <div className="p-[100px]">
      <LandingMain />
    </div>
  );
};

const LandingMain = () => {
  const navigate = useNavigate();

  const navigateOnClick = (path: string) => {
    navigate(path);
  };

  return (
    <div id="container" className="relative w-[375px] h-[800px] bg-white">
      <div
        id="status-line"
        className="w-full h-11 bg-white flex justify-between items-center font-semibold pl-5"
      >
        <p>9:41 AM</p>
        <img src="/status-icon.png" alt="status-icon" className="h-[44px]" />
      </div>
      <div
        id="wrapper-feature"
        className="mt-[232px] mb-[90px] w-full h-[434px] bg-white flex flex-col items-center"
      >
        <img
          id="image-TimeTable"
          src={`/TimeTable.png`}
          alt="timetable"
          className="w-[108px] h-[101px] mb-[136px]"
        ></img>
        <div
          id="wrapper-button"
          className="w-[311px] h-[72px] mb-[40px] gap-[15px] flex flex-col justify-center items-center"
        >
          <button
            id="login"
            className="w-[311px] h-[41px] bg-[#F58D3D] text-white"
            onClick={() => {
              navigateOnClick('/login');
            }}
          >
            로그인
          </button>
          <button
            id="signup"
            className="w-[311px] h-[17px]"
            onClick={() => {
              navigateOnClick('/signup');
            }}
          >
            회원가입
          </button>
        </div>
        <div
          id="wrapper-SNS"
          className="w-full h-[85px] flex flex-col justify-center items-center gap-[24px]"
        >
          <p>SNS 계정으로 계속하기</p>
          <div
            id="SNS-icon"
            className="h-[44px] gap-[12px] flex justify-center"
          >
            <img src="/kakaotalkid.png" alt="kakaotalk" />
            <img src="/googleid.png" alt="google" />
            <img src="/facebookid.png" alt="facebook" />
            <img src="/appleid.png" alt="apple" />
          </div>
        </div>
      </div>
    </div>
  );
};
