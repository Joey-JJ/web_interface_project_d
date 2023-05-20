import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import type { Building } from "../types/Building";


type UseFetchBuildingsResult = {
  buildings: Building[];
  refetchBuildings: () => void;
};

export const useFetchBuildings = (): UseFetchBuildingsResult => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  const getBuildings = async () => {
    const { data, error } = await supabase.from("buildings").select("*");

    if (error) {
      alert(error.message);
      return;
    }

    setBuildings(data as Building[]);
  };

  useEffect(() => {
    getBuildings();
  }, []);

  const refetchBuildings = () => {
    getBuildings();
  };

  return { buildings, refetchBuildings };
};