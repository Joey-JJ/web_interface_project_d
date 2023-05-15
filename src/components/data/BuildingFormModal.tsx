import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Building } from "../../types/Building";
import { DEFAULT_FORM_DATA } from "../../utils/constants";

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
  const { formData, handleChange, setFormData } = useForm(DEFAULT_FORM_DATA);
  const onCancel = () => {
    setFormData(selectedBuilding ?? DEFAULT_FORM_DATA);
    setOpenModal(false);
  };

  useEffect(() => {
    if (selectedBuilding) {
      setFormData({
        name: selectedBuilding.name,
        description: selectedBuilding.description,
        lon: selectedBuilding.lon,
        lat: selectedBuilding.lat,
      });
    }
  }, [selectedBuilding, setFormData]);

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
              name="lon"
              value={formData.lon}
            />
            <input
              type="number"
              placeholder="Latitude"
              className="input input-sm input-primary"
              onChange={handleChange}
              name="lat"
              value={formData.lat}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="btn btn-ghost" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BuildingFormModal;
