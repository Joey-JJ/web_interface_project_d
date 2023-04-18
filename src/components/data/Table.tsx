import React from "react";
import { DUMMY_DATA } from "../../utils/constants";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

const Table = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <TableHeader />
        <tbody>
          {DUMMY_DATA.map((data, index) => (
            <TableRow
              key={index}
              index={index}
              name={data.name}
              description={data.description}
              xCoordinate={data.xCoordinate}
              yCoordinate={data.yCoordinate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
