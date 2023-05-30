import React from "react";
import useSession from "./hooks/useSession";
import SignIn from "./components/auth/SignIn";
import Navbar from "./components/layout/Navbar";
import Table from "./components/table";
import { useFetchBuildings } from "./hooks/useFetchBuildings";
import AddressForm from "./components/addressForm";
import { supabase } from "./utils/supabaseClient";
import { BUILDING_IMAGE_BUCKET } from "./utils/constants";

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
      <main className="App h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-base-300">
        <AddressForm
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
          }}
        />
        <Test />
        <Table buildings={buildings} refetchBuildings={refetchBuildings} />
      </main>
    </>
  );
};

export default App;

function Test() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { session } = useSession();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !fileInputRef.current!.files ||
      fileInputRef.current!.files?.length === 0
    )
      return;
    const file = fileInputRef.current!.files[0];
    console.log(file);

    const { error } = await supabase.storage
      .from(BUILDING_IMAGE_BUCKET)
      .upload(`${session?.user.id}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log(error);
      return;
    }

    const { data } = await supabase.storage
      .from(BUILDING_IMAGE_BUCKET)
      .getPublicUrl(`${session?.user.id}/${file.name}`);

    window.open(data.publicUrl);
  };

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <input
        type="file"
        className="file-input w-full max-w-xs"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
      />
      <button type="submit" className="btn btn-primary">
        Upload
      </button>
    </form>
  );
}
