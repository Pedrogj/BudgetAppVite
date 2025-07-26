import { AuthForm } from "../components/AuthForm";

export const LoginPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <AuthForm />
    </div>
  );
};
