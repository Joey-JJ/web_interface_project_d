import React from "react";
import useSession from "./hooks/useSession";
import SignIn from "./components/auth/SignIn";
import Navbar from "./components/layout/Navbar";

const App: React.FC = () => {
  const { session } = useSession();

  if (!session) return <SignIn />;

  return (
    <>
      <Navbar />
      <div className="App">
        <button className="btn btn-primary">Button</button>
      </div>
    </>
  );
};

export default App;
