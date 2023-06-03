import { useRef } from "react";
import useSession from "../../hooks/useSession";
import { supabase } from "../../utils/supabaseClient";
import { BUILDING_IMAGE_BUCKET } from "../../utils/constants";

const ImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { session } = useSession();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !fileInputRef.current!.files ||
      fileInputRef.current!.files?.length === 0
    )
      return;
    const file = fileInputRef.current!.files[0];
    console.log(file);

    const { error } = await supabase.storage
      .from(BUILDING_IMAGE_BUCKET)
      .upload(`${session?.user.id}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from(BUILDING_IMAGE_BUCKET)
      .getPublicUrl(`${session?.user.id}/${file.name}`);

    window.open(data.publicUrl);
  };

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <input
        type="file"
        className="file-input w-full max-w-xs"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
      />
      <button type="submit" className="btn btn-primary">
        Upload
      </button>
    </form>
  );
};

export default ImageUpload;
