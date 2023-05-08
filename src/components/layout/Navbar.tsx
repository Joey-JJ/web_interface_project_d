import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import BuildingFormModal from "../data/BuildingFormModal";

const Navbar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const addBuilding = async (e: any, formData: any, setFormData: any) => {
    e.preventDefault();

    const { error } = await supabase
      .from("buildings")
      .insert([{ ...formData }]);

    if (error) {
      alert(error.message);
    }

    setFormData({
      name: "",
      description: "",
      xCoordinate: 0,
      yCoordinate: 0,
    });
  };

  const onLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="navbar bg-base-200 flex justify-between px-4">
      <a href="/" className="btn btn-ghost normal-case text-xl">
        Data Hub - Project D
      </a>

      <div className="flex gap-2">
        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-primary btn-sm"
        >
          Add building
        </button>
        <button onClick={onLogout} className="btn btn-secondary btn-sm">
          Log out
        </button>
      </div>

      <BuildingFormModal
        name="New building"
        onSubmit={addBuilding}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default Navbar;
