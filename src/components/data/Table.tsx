import React, { useState, useRef } from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import BuildingFormModal from "./BuildingFormModal";
import { supabase } from "../../utils/supabaseClient";
import type { FormData } from "../../hooks/useForm";
import type { Building } from "../../types/Building";
import { BuildingFormData } from "../../types/BuildingFormData";
import { DEFAULT_BUILDING_FORM_DATA } from "../../utils/constants";
import { useFetchBuildings } from "../../hooks/useFetchBuildings";

const Table: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const currentBuildingRef = useRef<Building | undefined>();
  const { buildings, refetchBuildings } = useFetchBuildings();

  const onSubmit = async (
    e: any,
    formData: FormData<BuildingFormData>,
    setFormData: React.Dispatch<
      React.SetStateAction<FormData<BuildingFormData>>
    >
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from("buildings")
      .update(formData)
      .eq("id", currentBuildingRef.current!.id);

    if (error) {
      alert(error.message);
      return;
    }

    setFormData(DEFAULT_BUILDING_FORM_DATA);
    setOpenModal(false);
  };

  if (buildings.length === 0) {
    return <div>No buildings in the database</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <TableHeader />
        <tbody>
          {buildings.map((building: Building, index) => (
            <TableRow
              key={index}
              index={index + 1}
              buildingData={building}
              onClick={() => {
                currentBuildingRef.current = building;
                setOpenModal(true);
              }}
            />
          ))}
        </tbody>
      </table>
      <BuildingFormModal
        onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        getBuildings={refetchBuildings}
        selectedBuilding={currentBuildingRef.current}
      />
    </div>
  );
};

export default Table;
