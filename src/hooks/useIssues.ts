import { useCallback, useEffect, useState } from "react";
import { Issue, IssuesResponse } from "@/pages/api/issues";

export const useIssues = () => {
  const [repositoryId, setRepositoryId] = useState<string | undefined>();
  const [issues, setIssues] = useState<Issue[]>([]);

  const getIssues = useCallback(async (): Promise<IssuesResponse> => {
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
        repositoryId,
        title,
        body,
      }),
    });
    const newIssue: Issue = await res.json();
    setIssues([newIssue, ...issues]);
  }, [repositoryId, issues]);

  useEffect(() => {
    (async () => {
      const res = await getIssues();
      setRepositoryId(res.repository.id);
      setIssues(res.repository.issues.nodes);
    })();
  }, [getIssues]);

  return { issues, createIssue };
};
