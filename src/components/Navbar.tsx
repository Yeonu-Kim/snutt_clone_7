import { useState } from 'react';
import toast from 'react-hot-toast';

import { ICON_SRC } from '../constants/fileSource';
import { PATH } from '../constants/route';

type Menu = 'timetable' | 'search' | 'ev' | 'friends' | 'mypage';

type NavMenu = {
  menu: Menu;
  offSrc: string;
  onSrc: string;
  to: string | null;
  alt: string;
};

export const Navbar = () => {
  const [menu, setMenu] = useState<Menu>('timetable');

  const handleClickMenu = (selectedMenu: Menu) => {
    setMenu(selectedMenu);
  };

  const onClickTBD = () => {
    toast('아직 없는 기능이에요.', {
      icon: '🔔',
    });
  };

  const navMenuList: NavMenu[] = [
    {
      menu: 'timetable',
      offSrc: ICON_SRC.TIMETABLE.OFF,
      onSrc: ICON_SRC.TIMETABLE.ON,
      to: PATH.INDEX,
      alt: '시간표',
    },
    {
      menu: 'search',
      offSrc: ICON_SRC.SEARCH.OFF,
      onSrc: ICON_SRC.SEARCH.ON,
      to: PATH.SEARCH,
      alt: '검색',
    },
    {
      menu: 'ev',
      offSrc: ICON_SRC.EV.OFF,
      onSrc: ICON_SRC.EV.ON,
      to: null,
      alt: '강의평',
    },
    {
      menu: 'friends',
      offSrc: ICON_SRC.FRIENDS.OFF,
      onSrc: ICON_SRC.FRIENDS.ON,
      to: null,
      alt: '친구',
    },
    {
      menu: 'mypage',
      offSrc: ICON_SRC.MYPAGE.OFF,
      onSrc: ICON_SRC.MYPAGE.ON,
      to: PATH.MYPAGE,
      alt: '마이페이지',
    },
  ];

  return (
    <div className="flex justify-between w-full px-[30px] py-[10px] mb-[34px]">
      {navMenuList.map((navMenu, index) => {
        return navMenu.to !== null ? (
          <div
            key={index}
            onClick={() => {
              handleClickMenu(navMenu.menu);
            }}
            className="flex justify-center align-center w-[30px] h-[30px]"
          >
            <img src={navMenu.offSrc} alt={navMenu.alt} />
          </div>
        ) : (
          <div
            key={index}
            onClick={onClickTBD}
            className="flex justify-center align-center w-[30px] h-[30px]"
          >
            <img src={navMenu.offSrc} alt={navMenu.alt} />
          </div>
        );
      })}
    </div>
  );
};

/*
          <div
            key={index}
            onClick={handleClickMenu}
            className="flex justify-center align-center w-[30px] h-[30px]"
          >
<img src={navMenu.offSrc} alt={navMenu.alt} />
*/
