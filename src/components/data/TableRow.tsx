import React, { FormEvent } from "react";

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
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setOpenModal(false);
  };

  return (
    <>
      <tr
        className="hover hover:cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <th>{index}</th>
        <td>{name}</td>
        <td className="max-w-xs overflow-x-hidden whitespace-break-spaces">
          {description}
        </td>
        <td>{xCoordinate}</td>
        <td>{yCoordinate}</td>
      </tr>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={openModal}
      />
      <div className="modal">
        <form className="modal-box">
          <h3 className="font-bold text-lg">You are now editing: {name}</h3>
          <div className="py-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="name"
              className="input input-sm input-primary"
            />
            <input
              type="text"
              placeholder="description"
              className="input input-sm input-primary"
            />
            <input
              type="text"
              placeholder="x-coordinate"
              className="input input-sm input-primary"
            />
            <input
              type="text"
              placeholder="y-coordinate"
              className="input input-sm input-primary"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={submitHandler}
              type="submit"
            >
              Submit
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TableRow;
