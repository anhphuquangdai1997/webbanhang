import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

interface MenuBarProps {
  title: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center h-12 border-b border-gray-300 bg-white">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 text-xl text-black"
        aria-label="Quay lại"
      >
        <LuArrowLeft />
      </button>
      <h2 className="font-semibold text-black text-sm">{title}</h2>
    </div>
  );
};

export default MenuBar;