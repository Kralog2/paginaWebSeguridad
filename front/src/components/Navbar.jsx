"use client";
import Link from "next/link";
import "./Navbar.css";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="navbar py-5 shadow-lg p-4 mb-4 bg-gray-800 border-t-4 border-blue-500">
      <Link href="/">
        <h1 className="text-3xl font-bold">Cesar's Guide</h1>
      </Link>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!user && (
          <>
            <li>
              <Link href="/register">Registrarse</Link>
            </li>
            <li>
              <Link href="/login">LogIn</Link>
            </li>
          </>
        )}
        {user && (
          <>
            {user.userType === "admin" && (
              <li>
                <Link href="/dashboard/adminpage">Admin</Link>
              </li>
            )}
            <li>
              <Link href="/dashboard/user">Perfil</Link>
            </li>
            <li>
              <button className="text-red-400 hover:underline" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
