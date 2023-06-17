import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import BuildingFormModal from "../table/BuildingFormModal";
import {
  BUILDING_TABLE_NAME,
  DEFAULT_BUILDING_FORM_DATA,
  ROOT_ROUTE,
} from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import { useFetchBuildings } from "../../hooks/useFetchBuildings";

const Navbar: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { refetchBuildings } = useFetchBuildings();
  const { pathname } = useLocation();

  const addBuilding = async (
    e: React.FormEvent,
    formData: FormData,
    setFormData: any
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from(BUILDING_TABLE_NAME)
      .insert([{ ...formData }]);

    if (error) {
      alert(error.message);
    }

    await refetchBuildings();

    setFormData(DEFAULT_BUILDING_FORM_DATA);
    setOpenModal(false);
  };

  const onLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="navbar bg-base-200 flex justify-between px-4">
      <Link to="/" className="btn btn-ghost normal-case text-xl">
        Data Hub - Project D
      </Link>
      <div className="flex gap-4">
        <Link to="/" className="link">
          Buildings
        </Link>
        <Link to="/address_search" className="link">
          Address search
        </Link>
        <Link to="/images" className="link">
          Images
        </Link>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setOpenModal(true)}
          className={`btn btn-primary btn-sm ${
            pathname !== ROOT_ROUTE && "invisible"
          }`}
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
