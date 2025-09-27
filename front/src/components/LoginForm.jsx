"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function LoginForm() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");
      setError(null);

      const { ok, data } = await login(email, password);
      if (!ok) {
        // TODO: Add internationalization.
        if (data.message === "Invalid email or password format") {
          setError("Credenciales inválidas" || "Error desconocido");
        }
        return;
      }
      router.push("/dashboard/user");
    } catch (error) {
      console.error(error)
      setError(error.response?.data?.message || "Error en el registro");
    }
  };

  return (
    <div className="form grid place-items-center py-15 min-h-screen">
      <div className="w-[500px] shadow-lg p-4 mb-4 bg-gray-800 rounded-lg border-t-4 border-blue-500 text-center">
        <h1 className="text-2xl font-bold my-4">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="email" placeholder="Correo electrónico" name="email" />
          <input type="password" placeholder="Contraseña" name="password" />
          <button
            type="submit"
            className="bg-green-600 text-amber-50 font-bold cursor-pointer hover:bg-green-700 px-6 py-2 rounded-md"
          >
            Ingresar
          </button>
          {error && (
            <div className="text-red-500 text-sm py-1 px-3 mt-2">{error}</div>
          )}
          <Link
            href="../register"
            className="text-sm mt-3 text-right text-blue-500 hover:underline"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </form>
      </div>
    </div>
  );
}
