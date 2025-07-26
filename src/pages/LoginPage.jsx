import { Toaster } from "react-hot-toast";
import { AuthForm } from "../components/AuthForm";

export const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Iniciar Sesión</h1>
      <AuthForm />
    </div>
  );
};
