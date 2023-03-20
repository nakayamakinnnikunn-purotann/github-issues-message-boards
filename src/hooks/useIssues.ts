import { useCallback, useEffect, useState } from "react";
import { Issue } from "@/pages/api/issues";

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const getIssues = useCallback(async (): Promise<Issue[]> => {
    const res = await fetch("/api/issues");
    return await res.json();
  }, []);

  const createIssue = useCallback(async (title: string, body?: string) => {
    const res = await fetch("/api/issues", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    const newIssue: Issue = await res.json();
    setIssues([newIssue, ...issues]);
  }, [issues]);

  useEffect(() => {
    (async () => {
      setIssues(await getIssues());
    })();
  }, [getIssues]);

  return { issues, createIssue };
};
