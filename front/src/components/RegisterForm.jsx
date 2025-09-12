"use client";
import Link from "next/link";
import "./RegisterForm.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    const fullname = formData.get("fullname");
    const userType = formData.get("userType");

    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullname, userType }),
      });
      console.log(res);

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error en el registro");
        return;
      }
      router.push("/login");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Error en el registro");
    }
  };

  return (
    <div className="form grid place-items-center py-15 min-h-screen">
      <div className="w-[500px] shadow-lg p-4 mb-4 bg-gray-800 rounded-lg border-t-4 border-blue-500 text-center">
        <h1 className="text-2xl font-bold my-4">Registro</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" placeholder="Nombre completo" name="fullname" />
          <input type="email" placeholder="Correo electrónico" name="email" />
          <input type="password" placeholder="Contraseña" name="password" />
          <select name="userType">
            <option value="user">Usuario</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-amber-50 font-bold cursor-pointer hover:bg-green-700 px-6 py-2 rounded-md"
          >
            Registrar
          </button>
          {error && <div className="text-red-500 text-sm py-1 px-3 mt-2">{error}</div>}

          <Link
            href="../login"
            className="text-sm mt-3 text-right text-blue-500 hover:underline"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </form>
      </div>
    </div>
  );
}
