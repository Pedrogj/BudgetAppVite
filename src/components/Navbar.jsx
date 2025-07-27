import { useState } from "react";
import { Link } from "react-router-dom";

import { LogoutButton } from "./layout/LogoutButton";
import { Menu, X, CircleDollarSign } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md sticky top-0">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-violet-800 flex items-center"
        >
          <CircleDollarSign size={24} />
          MyApp
        </Link>
        {/* Button Burger Mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-violet-800">
            Inicio
          </Link>
          <Link to="/historial" className="hover:text-violet-800">
            Historial
          </Link>
          <LogoutButton />
        </div>
      </div>
      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden px-4 space-y-3 bg-white border-t pb-1.5 pt-1.5 z-50 relative">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-violet-800"
          >
            Inicio
          </Link>
          <Link
            to="/historial"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-violet-800"
          >
            Historial
          </Link>
          <LogoutButton />
        </div>
      )}
    </header>
  );
};
