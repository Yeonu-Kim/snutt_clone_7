import { HeaderContainer } from '@/components/common/HeaderContainer';
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
          <img
            src={ICON_SRC.HAMBURGER}
            className="dark:filter dark:brightness-0 dark:invert"
          />
        </button>
        <h1 className="text-base font-semibold">{title}</h1>
        <span className="text-xs text-gray-400">{`(${totalCredit} 학점)`}</span>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={onLectureListClick}>
          <img
            src={ICON_SRC.LIST_BULLET}
            className="dark:filter dark:brightness-0 dark:invert"
          />
        </button>
        <span>
          <img
            src={ICON_SRC.SHARE}
            className="dark:filter dark:brightness-0 dark:invert"
          />
        </span>
        <span>
          <img
            src={ICON_SRC.BELL}
            className="w-6 h-6
               dark:filter dark:brightness-0 dark:invert"
          />
        </span>
      </div>
    </HeaderContainer>
  );
};
