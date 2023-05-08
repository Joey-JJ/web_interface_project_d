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
  const { name, description, xCoordinate, yCoordinate } = buildingData;

  return (
    <tr className="hover hover:cursor-pointer" onClick={onClick}>
      <th>{index}</th>
      <td>{name}</td>
      <td className="max-w-xs overflow-x-hidden whitespace-break-spaces">
        {description}
      </td>
      <td>{xCoordinate}</td>
      <td>{yCoordinate}</td>
    </tr>
  );
};

export default TableRow;
