import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Building } from "../../types/Building";
import {
  BUILDING_TABLE_NAME,
  DEFAULT_BUILDING_FORM_DATA,
} from "../../utils/constants";
import { supabase } from "../../utils/supabaseClient";

type BuildingFormModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (...args: any[]) => void;
  getBuildings?: () => void;
  selectedBuilding?: Building;
};

const BuildingFormModal: React.FC<BuildingFormModalProps> = ({
  openModal,
  setOpenModal,
  onSubmit,
  selectedBuilding,
  getBuildings,
}) => {
  const { formData, handleChange, setFormData } = useForm(
    DEFAULT_BUILDING_FORM_DATA
  );

  const onDelete = async () => {
    const { error } = await supabase
      .from(BUILDING_TABLE_NAME)
      .delete()
      .eq("id", selectedBuilding!.id);

    if (error) {
      alert(error.message);
      return;
    }

    setFormData(DEFAULT_BUILDING_FORM_DATA);
    getBuildings?.();
    setOpenModal(false);
  };

  const onCancel = () => {
    setFormData(selectedBuilding ?? DEFAULT_BUILDING_FORM_DATA);
    setOpenModal(false);
  };

  useEffect(() => {
    if (selectedBuilding) {
      setFormData({
        name: selectedBuilding.name,
        description: selectedBuilding.description,
        bagId: selectedBuilding.bagId,
        imageUrl: selectedBuilding.imageUrl,
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
              type="text"
              placeholder="Longitude"
              className="input input-sm input-primary"
              onChange={handleChange}
              name="lon"
              value={formData.bagId}
            />
            <input
              type="string"
              placeholder="Image URL"
              className="input input-sm input-primary"
              onChange={handleChange}
              name="imageUrl"
              value={formData.imageUrl}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            {selectedBuilding && (
              <button
                className="btn btn-error"
                type="button"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
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
