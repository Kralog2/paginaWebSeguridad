import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Cesar's mods guide - Home",
  description: "Guia basica para modear juegos en los que tengo experiencia como Skyrim, Fallout, Resident Evil y mas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
