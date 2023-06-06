import React from "react";
import useSession from "./hooks/useSession";
import SignIn from "./components/auth/SignIn";
import Navbar from "./components/layout/Navbar";
import { Outlet } from "react-router-dom";
import { fetchAddress } from "./utils/fetchAddress";

function App() {
  const { session, loading } = useSession();

  if (loading)
    return (
      <div className="h-screen w-screen text-2xl flex items-center justify-center">
        Loading...
      </div>
    );

  if (!session) return <SignIn />;

  return (
    <>
      <Navbar />
      <Outlet />
      <button
        onClick={() =>
          fetchAddress({
            postalCode: "3082ec",
            houseNumber: 30,
          })
        }
      >
        Click
      </button>
    </>
  );
}

export default App;
