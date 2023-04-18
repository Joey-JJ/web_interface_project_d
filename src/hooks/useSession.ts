import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session: Session | null) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return { session, loading };
};

export default useSession;
