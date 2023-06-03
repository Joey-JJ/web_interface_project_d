import { useCallback, useEffect, useState } from "react";
import useSession from "./useSession";
import { BUILDING_IMAGE_BUCKET } from "../utils/constants";
import { supabase } from "../utils/supabaseClient";
import { ImageData } from "../types/ImageData";

const useFetchImageData = () => {
  const { session } = useSession();
  const [imageUrls, setImageUrls] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchImageData = useCallback(async () => {
    if (!session?.user.id) return;

    const { data: imageData, error } = await supabase.storage
      .from(BUILDING_IMAGE_BUCKET)
      .list(session?.user.id, {
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

  return {
    imageUrls,
    fetchImageData,
    loading,
    error,
  };
};

export default useFetchImageData;
