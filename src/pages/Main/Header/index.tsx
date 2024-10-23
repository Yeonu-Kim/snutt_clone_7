export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300">
      <button
        className="text-xl focus:outline-none"
        onClick={onMenuClick}
        aria-label="Open Menu"
      >
        ☰
      </button>
      <h1 className="text-lg font-semibold text-gray-700">Header Title</h1>
    </div>
  );
};
