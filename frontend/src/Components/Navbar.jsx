import { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">INFOKOS</div>

      <div className="menu-right">
        {!user ? (
          <button className="login-btn">Login</button>
        ) : (
          <ProfileMenu user={user} />
        )}
      </div>
    </nav>
  );
}
