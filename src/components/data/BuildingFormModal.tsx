import React from "react";
import { useForm } from "../../hooks/useForm";
import { Building } from "../../types/Building";

type BuildingFormModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (...args: any[]) => void;
  selectedBuilding?: Building;
};

const BuildingFormModal: React.FC<BuildingFormModalProps> = ({
  openModal,
  setOpenModal,
  onSubmit,
  selectedBuilding,
}) => {
  const initialFormdata = selectedBuilding ?? {
    name: "",
    description: "",
    lon: 0,
    lat: 0,
  };

  const { formData, handleChange, setFormData } = useForm(initialFormdata);

  return (
    <>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={openModal}
        onChange={(e) => setOpenModal(e.target.checked)}
      />
      <div className="modal">
        <form
          className="modal-box"
          onSubmit={(e) => onSubmit(e, formData, setFormData)}
        >
          <h3 className="font-bold text-lg">
            You are now editing: {selectedBuilding?.name ?? "New building"}
          </h3>
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
              placeholder="Longitude"
              className="input input-sm input-primary"
              onChange={handleChange}
              name="Longitude"
              value={formData.lon}
            />
            <input
              type="number"
              placeholder="Latitude"
              className="input input-sm input-primary"
              onChange={handleChange}
              name="Latitude"
              value={formData.lat}
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
