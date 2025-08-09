import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const LogoutButton = ({ onClick }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="bg-red-500 text-white font-medium px-3 py-1 rounded hover:bg-red-600 cursor-pointer z-50 relative flex items-center gap-2"
    >
      Cerrar Sesión
      <LogOut size={24} />
    </button>
  );
};
