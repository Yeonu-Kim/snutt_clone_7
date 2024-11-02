import { ICON_SRC } from '@/constants/fileSource';

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <div className="flex w-full justify-between pt-2 pb-1.5 pl-4 p-3 border-b-[1px] border-solid  border-b-lineLight">
      <div className="flex gap-2 items-center">
        <button
          className="text-xl focus:outline-none"
          onClick={onMenuClick}
          aria-label="Open Menu"
        >
          <img src={ICON_SRC.HAMBURGER} />
        </button>
        <h1 className="text-lg font-semibold">24-2</h1>
        <span className="text-sm text-gray-400">9 학점</span>
      </div>
      <div className="flex gap-2 items-center">
        <span>목록</span>
        <span>공유</span>
        <span>알림</span>
      </div>
    </div>
  );
};
