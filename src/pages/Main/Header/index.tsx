import { Icon } from '@/components/common/Icon';
import { HeaderContainer } from '@/components/header';
import { ICON_SRC } from '@/constants/fileSource';

export const Header = ({
  onMenuClick,
  onLectureListClick,
  totalCredit,
  title,
}: {
  onMenuClick: () => void;
  onLectureListClick: () => void;
  totalCredit: number;
  title: string;
}) => {
  return (
    <HeaderContainer>
      <div className="flex items-center gap-2">
        <button
          className="text-xl focus:outline-none"
          onClick={onMenuClick}
          aria-label="Open Menu"
        >
          <Icon
            src={ICON_SRC.HAMBURGER}
            alt="서랍 열기 버튼"
            className="dark:brightness-0 dark:invert dark:filter"
          />
        </button>
        <h1 className="text-base font-semibold">{title}</h1>
        <span className="text-xs text-gray-400">{`(${totalCredit} 학점)`}</span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onLectureListClick}>
          <Icon
            src={ICON_SRC.LIST_BULLET}
            alt="강의 목록 보기 버튼"
            className="dark:brightness-0 dark:invert dark:filter"
          />
        </button>
        <span>
          <Icon
            src={ICON_SRC.SHARE}
            alt="공유하기 버튼"
            className="dark:brightness-0 dark:invert dark:filter"
          />
        </span>
        <span>
          <Icon
            src={ICON_SRC.BELL}
            alt="알림 버튼"
            className="dark:brightness-0 dark:invert dark:filter"
          />
        </span>
      </div>
    </HeaderContainer>
  );
};
