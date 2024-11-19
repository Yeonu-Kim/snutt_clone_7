import { HeaderContainer } from '@/components/common/HeaderContainer';
import { IconContainer } from '@/components/common/IconContainer';
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
      <div className="flex gap-2 items-center">
        <button
          className="text-xl focus:outline-none"
          onClick={onMenuClick}
          aria-label="Open Menu"
        >
          <IconContainer
            src={ICON_SRC.HAMBURGER}
            alt="서랍 열기 버튼"
            className="dark:filter dark:brightness-0 dark:invert"
          />
        </button>
        <h1 className="text-base font-semibold">{title}</h1>
        <span className="text-xs text-gray-400">{`(${totalCredit} 학점)`}</span>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={onLectureListClick}>
          <IconContainer
            src={ICON_SRC.LIST_BULLET}
            alt="강의 목록 보기 버튼"
            className="dark:filter dark:brightness-0 dark:invert"
          />
        </button>
        <span>
          <IconContainer
            src={ICON_SRC.SHARE}
            alt="공유하기 버튼"
            className="dark:filter dark:brightness-0 dark:invert"
          />
        </span>
        <span>
          <IconContainer
            src={ICON_SRC.BELL}
            alt="알림 버튼"
            className="dark:filter dark:brightness-0 dark:invert"
          />
        </span>
      </div>
    </HeaderContainer>
  );
};
