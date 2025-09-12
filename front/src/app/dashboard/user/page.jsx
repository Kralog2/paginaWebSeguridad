"use client";

import Userinfo from "../../../components/Userinfo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/auth/me");
      if (response.status === 401) {
        router.push("/login");
        return;
      }
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };
    fetchUserData();
  }, [router]);

  if (loading) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return <Userinfo user={user} />;
}
