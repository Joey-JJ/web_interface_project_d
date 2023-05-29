import React, { useState, useRef } from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import BuildingFormModal from "./BuildingFormModal";
import { supabase } from "../../utils/supabaseClient";
import type { FormData } from "../../hooks/useForm";
import type { Building } from "../../types/Building";
import { BuildingFormData } from "../../types/BuildingFormData";
import {
  BUILDING_TABLE_NAME,
  DEFAULT_BUILDING_FORM_DATA,
} from "../../utils/constants";

type TableProps = {
  buildings: Building[];
  refetchBuildings: () => void;
};

const fiterBuildings = (buildings: Building[], query: string) => {
  return buildings.filter(
    (building) =>
      building.name.toLowerCase().includes(query.toLowerCase()) ||
      building.description.toLowerCase().includes(query.toLowerCase())
  );
};

const Table: React.FC<TableProps> = ({ buildings, refetchBuildings }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const currentBuildingRef = useRef<Building | undefined>();

  const onSubmit = async (
    e: any,
    formData: FormData<BuildingFormData>,
    setFormData: React.Dispatch<
      React.SetStateAction<FormData<BuildingFormData>>
    >
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from(BUILDING_TABLE_NAME)
      .update(formData)
      .eq("id", currentBuildingRef.current!.id);

    if (error) {
      alert(error.message);
      return;
    }

    setFormData(DEFAULT_BUILDING_FORM_DATA);
    refetchBuildings();
    setOpenModal(false);
    setLoading(false);
  };

  const filteredBuildings = fiterBuildings(buildings, searchQuery);

  if (!loading && buildings.length === 0) {
    return <div>No buildings in the database</div>;
  }

  return (
    <div className="w-screen mx-24 xl:max-w-4xl">
      <input
        type="text"
        className="input input-primary mb-2"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="table w-full">
        <TableHeader />
        <tbody>
          {filteredBuildings.length > 0 ? (
            filteredBuildings.map((building: Building, index) => (
              <TableRow
                key={index}
                index={index + 1}
                buildingData={building}
                onClick={() => {
                  currentBuildingRef.current = building;
                  setOpenModal(true);
                }}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className=" text-center">
                No buildings found
              </td>
            </tr>
          )}
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
