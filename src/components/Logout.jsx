"use client";
import Link from "next/link";
import { useRouter } from "next/navigation.js";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", { method: "POST" });
      const info = await response.json();

      console.log(info);
    } catch (error) {
      console.error("Logout failed:", error);
    }
    router.push("/");
    router.refresh();
  };

  return (
    <Link className="sub" href="/" onClick={handleLogout}>
      Logout
    </Link>
  );
};

export default Logout;
