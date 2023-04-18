import React from "react";
import useSession from "./hooks/useSession";
import SignIn from "./components/auth/SignIn";
import Navbar from "./components/layout/Navbar";
import Table from "./components/data/Table";

const App: React.FC = () => {
  const { session } = useSession();

  if (!session) return <SignIn />;

  return (
    <>
      <Navbar />
      <main className="App h-[calc(100vh-64px)] flex items-center justify-center">
        <Table />
      </main>
    </>
  );
};

export default App;
