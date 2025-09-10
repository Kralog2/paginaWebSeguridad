import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar py-5 shadow-lg p-4 mb-4 bg-gray-800 border-t-4 border-blue-500">
      <Link href="/">
        <h1 className="text-3xl font-bold">Cesar's Guide</h1>
      </Link>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/register">Registrarse</Link>
        </li>
        <li>
          <Link href="/logIn">LogIn</Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}
