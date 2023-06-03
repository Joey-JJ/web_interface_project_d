import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { BUILDING_IMAGE_BUCKET } from "../../utils/constants";
import useSession from "../../hooks/useSession";

type imageData = {
  name: string;
  url: string;
};

const ImageGrid: React.FC = () => {
  const { session } = useSession();
  const [imageUrls, setImageUrls] = useState<imageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchImageData = useCallback(async () => {
    if (!session?.user.id) return;

    const { data: imageData, error } = await supabase.storage
      .from(BUILDING_IMAGE_BUCKET)
      .list(session?.user.id, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      alert(error.message);
      setError(true);
      return;
    }

    const urlData = imageData.map((image) => {
      const { data: url } = supabase.storage
        .from(BUILDING_IMAGE_BUCKET)
        .getPublicUrl(`${session?.user.id}/${image.name}`);

      return { name: image.name, url: url.publicUrl };
    });

    setImageUrls(urlData);
    setLoading(false);
  }, [session?.user.id]);

  useEffect(() => {
    fetchImageData();
  }, [session?.user.id, fetchImageData]);

  const copyHandler = async (url: string) => {
    await navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  const deleteHandler = async (imageName: string) => {
    const { error } = await supabase.storage
      .from(BUILDING_IMAGE_BUCKET)
      .remove([`${session?.user.id}/${imageName}`]);

    if (error) {
      alert(error.message);
      return;
    }

    fetchImageData();
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
            className="flex flex-col items-center justify-center gap-4 border-2 border-base-100 pb-6 rounded-sm overflow-x-scroll"
          >
            <img
              src={imageData.url}
              alt="Building"
              className="w-60 h-60 object-cover"
            />
            <div className="flex gap-4">
              <button
                onClick={() => copyHandler(imageData.url)}
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
