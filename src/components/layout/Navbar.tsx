import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import BuildingFormModal from "../table/BuildingFormModal";
import {
  BUILDING_TABLE_NAME,
  DEFAULT_BUILDING_FORM_DATA,
} from "../../utils/constants";

type NavbarProps = {
  refetchBuildings: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ refetchBuildings }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const addBuilding = async (e: any, formData: any, setFormData: any) => {
    e.preventDefault();

    const { error } = await supabase
      .from(BUILDING_TABLE_NAME)
      .insert([{ ...formData }]);

    if (error) {
      alert(error.message);
    }

    refetchBuildings();

    setFormData(DEFAULT_BUILDING_FORM_DATA);
    setOpenModal(false);
  };

  const onLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="navbar bg-base-200 flex justify-between px-4">
      <a href="/" className="btn btn-ghost normal-case text-xl">
        Data Hub - Project D
      </a>
      <a href="/" className="link">
        Address search
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
        onSubmit={addBuilding}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default Navbar;
