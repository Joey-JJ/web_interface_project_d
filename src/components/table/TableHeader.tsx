import React from "react";

const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Description</th>
        <th>Longitude</th>
        <th>Latitude</th>
        <th>Image URL</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
