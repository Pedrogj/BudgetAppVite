import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";

export const LayoutAuthenticated = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-md overflow-hidden bg-white md:max-w-2xl p-4">
        <Outlet />
      </div>
    </>
  );
};
