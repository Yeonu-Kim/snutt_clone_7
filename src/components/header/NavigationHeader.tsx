import { Icon } from '@/components/common/Icon';
import { ICON_SRC } from '@/constants/fileSource';

type NavigationHeaderProps = {
  darkModeInvert?: 'default' | 'none';
  title: string;
  moveTo(): void;
};

export const NavigationHeader = ({
  darkModeInvert = 'default',
  title,
  moveTo,
}: NavigationHeaderProps) => {
  return (
    <div className="relative mt-4 flex w-full pb-6">
      <div className="absolute left-0 top-0.5 flex cursor-pointer items-center">
        <Icon
          src={ICON_SRC.ARROW.DOWN}
          darkModeInvert={darkModeInvert}
          className="rotate-90"
          alt="뒤로가기"
        />
        <span className="text-gray-500 hover:text-orange" onClick={moveTo}>
          뒤로
        </span>
      </div>
      <h1 className="w-full text-center text-xl font-semibold">{title}</h1>
    </div>
  );
};
