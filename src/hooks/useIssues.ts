import { useCallback, useEffect, useState } from "react";
import { Issue } from "@/pages/api/issues";

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const getIssues = useCallback(async (): Promise<Issue[]> => {
    const res = await fetch(`/api/issues`);
    return await res.json();
  }, []);

  useEffect(() => {
    (async () => {
      setIssues(await getIssues());
    })();
  }, [getIssues]);

  return { issues };
};
