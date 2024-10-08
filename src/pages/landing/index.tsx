import { useState } from 'react';

import { Login } from './landing-login';

export const Landing = () => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');

  return (
    <div
      className="p-[100px]"
      onClick={() => {
        setMode('SIGNUP');
      }}
    >
      <div id="container" className="relative w-[375px] h-[800px] bg-white">
        <div
          id="status-line"
          className="w-full h-11 bg-white flex items-center font-semibold pl-5"
        >
          9:41 AM
        </div>
        <div
          id="wrapper-feature"
          className="mt-[232px] mb-[90px] w-full h-[434px] bg-white flex flex-col items-center"
        >
          <img
            id="image-TimeTable"
            src={`/TimeTable.png`}
            className="w-[108px] h-[101px] mb-[136px]"
          ></img>
          <div
            id="wrapper-button"
            className="w-[311px] h-[72px] mb-[40px] gap-[15px] flex flex-col justify-center items-center"
          >
            <button
              id="login"
              className="w-[311px] h-[41px] bg-[#F58D3D] text-white"
            >
              로그인
            </button>
            <button id="signup" className="w-[311px] h-[17px]">
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

      <div>
        {
          {
            LOGIN: <Login />,
            SIGNUP: <div></div>,
          }[mode]
        }
      </div>
    </div>
  );
};
