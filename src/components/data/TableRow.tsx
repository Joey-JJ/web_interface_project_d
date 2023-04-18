import React from "react";

type TableRowProps = {
  index: number;
  name: string;
  description: string;
  xCoordinate: number;
  yCoordinate: number;
};

const TableRow: React.FC<TableRowProps> = ({
  index,
  name,
  description,
  xCoordinate,
  yCoordinate,
}) => {
  return (
    <tr className="hover">
      <th>{index}</th>
      <td>{name}</td>
      <td className="max-w-xs overflow-x-hidden">{description}</td>
      <td>{xCoordinate}</td>
      <td>{yCoordinate}</td>
    </tr>
  );
};

export default TableRow;
