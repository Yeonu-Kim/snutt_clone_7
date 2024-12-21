import toast from 'react-hot-toast';

import { Icon } from '@/components/common/Icon';
import { ICON_SRC } from '@/constants/fileSource';
import { PATH } from '@/constants/route';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';

type Menu = 'timetable' | 'search' | 'ev' | 'friends' | 'mypage';

type NavMenu = {
  menu: Menu;
  offSrc: string;
  onSrc: string;
  to: string | null;
  alt: string;
};

export const Navbar = ({ selectedMenu }: { selectedMenu: Menu }) => {
  const { toMain, toMypage } = useRouteNavigation();

  const handleClickMenu = (nextMenu: Menu) => {
    switch (nextMenu) {
      case 'timetable':
        toMain();
        break;
      case 'mypage':
        toMypage();
        break;
    }
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
      to: null,
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
    <div className="border-t-0.5 flex w-full justify-between border-solid border-t-lineLight px-3.5 py-2.5 pb-5 dark:border-t-gray-800 dark:bg-gray-800 dark:text-gray-200">
      {navMenuList.map((navMenu, index) => {
        return navMenu.to !== null ? (
          <div
            key={index}
            onClick={() => {
              handleClickMenu(navMenu.menu);
            }}
            className="align-center flex h-8 w-8 justify-center p-1"
          >
            <Icon
              className=""
              src={
                navMenu.menu === selectedMenu ? navMenu.onSrc : navMenu.offSrc
              }
              alt={navMenu.alt}
            />
          </div>
        ) : (
          <div
            key={index}
            onClick={onClickTBD}
            className="align-center flex h-8 w-8 justify-center p-1"
          >
            <Icon
              src={
                navMenu.menu === selectedMenu ? navMenu.onSrc : navMenu.offSrc
              }
              alt={navMenu.alt}
              className="dark:brightness-0 dark:invert dark:filter"
            />
          </div>
        );
      })}
    </div>
  );
};
