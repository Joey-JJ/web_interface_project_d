import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event: any, session: Session | null) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return { session, loading };
};

export default useSession;
