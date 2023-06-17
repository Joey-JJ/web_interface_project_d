import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import type { Building } from "../types/Building";
import { BUILDING_TABLE_NAME } from "../utils/constants";

type UseFetchBuildingsResult = {
  buildings: Building[];
  refetchBuildings: () => Promise<void>;
  loading: boolean;
};

export const useFetchBuildings = (): UseFetchBuildingsResult => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getBuildings = async () => {
    const { data, error } = await supabase
      .from(BUILDING_TABLE_NAME)
      .select("*");

    if (error) {
      console.log(error.message);
      return;
    }

    setBuildings(data as Building[]);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getBuildings();
    })();
  }, []);

  return { buildings, refetchBuildings: getBuildings, loading };
};
