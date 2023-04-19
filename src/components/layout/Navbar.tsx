import React from "react";
import { supabase } from "../../utils/supabaseClient";

const Navbar = () => {
  const onLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="navbar bg-base-200 flex justify-between px-4">
      <a href="/" className="btn btn-ghost normal-case text-xl">
        Data Hub - Project D
      </a>

      <button onClick={onLogout} className="btn btn-primary btn-sm">
        Log out
      </button>
    </div>
  );
};

export default Navbar;
