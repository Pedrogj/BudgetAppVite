import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

export const AuthForm = () => {
  const { login, signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await login(email, password);
        if (error) throw error;
        toast.success("¡Inicio de Sesión exitoso!");
        resetForm();
      } else {
        const { error } = await signup(email, password);
        if (error) throw error;
        toast.success("¡Registro exitoso!");
        resetForm();
      }
    } catch (error) {
      toast.error(error.message || "Error al autenticar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">
          Correo electrónico
        </label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          placeholder="example@correo.com"
        />
      </div>
      <div className="relative">
        <label className="block mb-1 text-sm font-medium">Contraseña</label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          placeholder="123456"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 mt-2 cursor-pointer text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
        </button>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Procesando..." : isLogin ? "Iniciar sesión" : "Registrarse"}
      </button>
      <p className="text-sm text-center">
        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <button
          type="button"
          onClick={() => setLogin(!isLogin)}
          className="text-blue-600 underline"
        >
          {isLogin ? "Regístrate" : "Inicia sesión"}
        </button>
      </p>
    </form>
  );
};
