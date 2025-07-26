import { useAuth } from "../../context/AuthContext";

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Cerrar sesión
    </button>
  );
};
