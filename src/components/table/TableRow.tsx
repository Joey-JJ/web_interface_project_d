import React from "react";
import { Building } from "../../types/Building";

type TableRowProps = {
  index: number;
  buildingData: Building;
  onClick: () => void;
};

const TableRow: React.FC<TableRowProps> = ({
  index,
  buildingData,
  onClick,
}) => {
  const { name, description, lon, lat } = buildingData;

  return (
    <tr className="hover hover:cursor-pointer" onClick={onClick}>
      <th>{index}</th>
      <td>{name}</td>
      <td className="max-w-xs overflow-x-hidden whitespace-break-spaces">
        {description}
      </td>
      <td>{lon}</td>
      <td>{lat}</td>
    </tr>
  );
};

export default TableRow;
