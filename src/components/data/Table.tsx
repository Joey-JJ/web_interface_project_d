import React, { useState } from "react";
import { DUMMY_DATA } from "../../utils/constants";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { Building } from "../../types/Building";
import BuildingFormModal from "./BuildingFormModal";

const Table = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <TableHeader />
        <tbody>
          {DUMMY_DATA.map((building: Building, index) => (
            <TableRow
              key={index}
              index={index + 1}
              buildingData={building}
              onClick={() => {
                setOpenModal(true);
              }}
            />
          ))}
        </tbody>
      </table>
      <BuildingFormModal
        name=""
        onSubmit={async () => {
          return;
        }}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default Table;
