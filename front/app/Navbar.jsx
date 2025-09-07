import Link from "next/link";

export default function Navbar(){
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/register">Registrarse</Link>
            <Link href="/logIn">LogIn</Link>
        </nav>
    )
}