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
  const { name, description, bagId, imageUrl } = buildingData;

  return (
    <tr onClick={onClick} className="hover hover:cursor-pointer">
      <th>{index}</th>
      <td>{name}</td>
      <td className="max-w-xs overflow-x-hidden whitespace-break-spaces">
        {description}
      </td>
      <td>{bagId}</td>
      <td>
        <a
          rel="noopener noreferrer"
          className="link link-primary"
          target="_blank"
          href={imageUrl}
          onClick={(e) => e.stopPropagation()}
        >
          Image
        </a>
      </td>
    </tr>
  );
};

export default TableRow;
