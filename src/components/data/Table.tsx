import React, { useEffect, useState, useRef } from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { Building } from "../../types/Building";
import BuildingFormModal from "./BuildingFormModal";
import { supabase } from "../../utils/supabaseClient";

const Table: React.FC = () => {
  const [buildings, setBuildings] = useState([] as Building[]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const currentBuildingRef = useRef<Building | undefined>();

  useEffect(() => {
    const getBuildings = async () => {
      const { data, error } = await supabase.from("buildings").select("*");

      if (error) {
        alert(error.message);
        return;
      }

      setBuildings(data as Building[]);
    };

    getBuildings();
  }, []);

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
        onSubmit={async () => {
          return;
        }}
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedBuilding={currentBuildingRef.current}
      />
    </div>
  );
};

export default Table;
