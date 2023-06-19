import React from "react";
import { supabase } from "../../utils/supabaseClient";
import { BUILDING_IMAGE_BUCKET } from "../../utils/constants";
import useSession from "../../hooks/useSession";
import useFetchImageData from "../../hooks/useFetchImageData";
import { copyToClipboard } from "../../utils/copyToClipboard";

const ImageGrid: React.FC = () => {
  const { session } = useSession();
  const { imageUrls, fetchImageData, loading, error } = useFetchImageData();

  const deleteHandler = async (imageName: string) => {
    const { error } = await supabase.storage
      .from(BUILDING_IMAGE_BUCKET)
      .remove([`${session?.user.id}/${imageName}`]);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchImageData();
  };

  if (loading) return <div>Loading...</div>;
  if (!imageUrls && !loading) return <div>No images available</div>;
  if (error && !loading) return <div>There was an error</div>;

  return (
    <div className="grid grid-cols-3 gap-3">
      {imageUrls.map((imageData) => {
        return (
          <div
            key={imageData.name}
            className="flex flex-col items-center justify-center gap-4 border-2 border-base-100 pb-6 rounded-sm"
          >
            <img
              src={imageData.url}
              alt="Building"
              className="w-60 h-60 object-cover"
            />
            <div className="flex gap-4">
              <button
                onClick={() => copyToClipboard(imageData.url)}
                className="btn btn-primary btn-xs"
              >
                Copy URL
              </button>
              <button
                onClick={() => deleteHandler(imageData.name)}
                className="btn btn-warning btn-xs"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
