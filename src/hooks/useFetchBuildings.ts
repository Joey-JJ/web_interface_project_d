import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import type { Building } from "../types/Building";
import { BUILDING_TABLE_NAME } from "../utils/constants";

type UseFetchBuildingsResult = {
  buildings: Building[];
  refetchBuildings: () => void;
};

export const useFetchBuildings = (): UseFetchBuildingsResult => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  const getBuildings = async () => {
    const { data, error } = await supabase
      .from(BUILDING_TABLE_NAME)
      .select("*");

    if (error) {
      alert(error.message);
      return;
    }

    setBuildings(data as Building[]);
  };

  useEffect(() => {
    getBuildings();
  }, []);

  const refetchBuildings = async () => {
    await getBuildings();
  };

  return { buildings, refetchBuildings };
};
