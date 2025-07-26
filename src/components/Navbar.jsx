import { LogoutButton } from "./layout/LogoutButton";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 mb-6 rounded-xl flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">ADM App</h1>
      <LogoutButton />
    </nav>
  );
};
