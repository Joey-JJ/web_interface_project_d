import React from "react";
import { useForm } from "../../hooks/useForm";

type BuildingFormModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: any; // TODO: FIX ANY
  name: string;
};

const BuildingFormModal: React.FC<BuildingFormModalProps> = ({
  openModal,
  setOpenModal,
  onSubmit,
  name,
}) => {
  const { formData, handleChange, setFormData } = useForm({
    name: "",
    description: "",
    xCoordinate: 0,
    yCoordinate: 0,
  });

  return (
    <>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={openModal}
      />
      <div className="modal">
        <form
          className="modal-box"
          onSubmit={(e) => onSubmit(e, formData, setFormData)}
        >
          <h3 className="font-bold text-lg">You are now editing: {name}</h3>
          <div className="py-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="input input-sm input-primary"
              onChange={handleChange}
              name="name"
              value={formData.name}
            />
            <input
              type="text"
              placeholder="Description"
              className="input input-sm input-primary"
              onChange={handleChange}
              name="description"
              value={formData.description}
            />
            <input
              type="number"
              placeholder="X-coordinate"
              className="input input-sm input-primary"
              onChange={handleChange}
              name="xCoordinate"
              value={formData.xCoordinate}
            />
            <input
              type="number"
              placeholder="Y-coordinate"
              className="input input-sm input-primary"
              onChange={handleChange}
              name="yCoordinate"
              value={formData.yCoordinate}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button
              className="btn btn-ghost"
              type="button"
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

export default BuildingFormModal;
