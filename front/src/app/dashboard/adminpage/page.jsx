"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/users");
      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        router.push("/login");
        return;
      }

      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [router]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-2xl font-bold mx-auto text-center">Lista de Usuarios</h1>
      <table className="w-2/4 mx-auto bg-gray-800 rounded-lg border-t-4 border-blue-500 mt-10 mb-10">
        <thead>
          <tr>
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Email</th>
            <th className="py-2 px-4 text-center">Role</th>
          </tr>
        </thead>
        <tbody>
          {user.map((u) => (
            <tr key={u.id}>
              <td className="py-2 px-4 text-center">{u.fullname}</td>
              <td className="py-2 px-4 text-center">{u.email}</td>
              <td className="py-2 px-4 text-center">{u.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
