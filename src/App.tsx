import React from "react";
import useSession from "./hooks/useSession";
import SignIn from "./components/auth/SignIn";
import Navbar from "./components/layout/Navbar";
import Table from "./components/data/Table";
import { useFetchBuildings } from "./hooks/useFetchBuildings";

const App: React.FC = () => {
  const { session, loading } = useSession();
  const { buildings, refetchBuildings } = useFetchBuildings();

  if (loading)
    return (
      <div className="h-screen w-screen text-2xl flex items-center justify-center">
        Loading...
      </div>
    );

  if (!session) return <SignIn />;

  return (
    <>
      <Navbar refetchBuildings={refetchBuildings} />
      <main className="App h-[calc(100vh-64px)] flex items-center justify-center bg-base-300">
        <Table buildings={buildings} refetchBuildings={refetchBuildings} />
      </main>
    </>
  );
};

export default App;
