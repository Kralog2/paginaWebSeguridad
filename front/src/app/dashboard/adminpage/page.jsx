"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    if (res.status === 401 || res.status === 403) {
      setError("Unauthorized");
      router.push("/logIn");
      return;
    }
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [router]);

  const handleDelete = async (id, fullname, userType) => {
    if (userType === "admin") {
      alert("No puedes eliminar a un administrador.");
      return;
    }

    const confirm1 = window.confirm(
      `¿Estás seguro de que deseas eliminar a ${fullname}? Esta acción no se puede deshacer.`
    );
    if (!confirm1) return;
    const confirm2 = window.prompt(
      `Para confirmar, escribe "ELIMINAR ${fullname.toUpperCase()}" (sin comillas):`
    );
    if (confirm2 !== `ELIMINAR ${fullname.toUpperCase()}`) {
      alert("Confirmación incorrecta. No se eliminó el usuario.");
      return;
    }

    const res = await fetch(`/api/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setUser((prev) => prev.filter((u) => u._id !== id));
    } else {
      const data = await res.json();
      setError(data.message);
      alert("Error al eliminar el usuario: " + data.message);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-2xl font-bold mx-auto text-center">
        Lista de Usuarios
      </h1>
      <table className="w-2/4 mx-auto bg-gray-800 rounded-lg border-t-4 border-blue-500 mt-10 mb-10">
        <thead>
          <tr>
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Email</th>
            <th className="py-2 px-4 text-center">Role</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {user.map((u) => (
            <tr key={u._id}>
              <td className="py-2 px-4 text-left">{u.fullname}</td>
              <td className="py-2 px-4 text-left">{u.email}</td>
              <td className="py-2 px-4 text-left">{u.userType}</td>
              <td className="py-2 px-4 text-center">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                  onClick={() => handleDelete(u._id, u.fullname, u.userType)}
                  disabled={u.userType === "admin"}
                  title={
                    u.userType === "admin"
                      ? "No puedes eliminar administradores"
                      : ""
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
