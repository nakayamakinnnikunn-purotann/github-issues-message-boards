import { useCallback, useEffect, useState } from "react";
import { Comment, IssueResponse } from "@/pages/api/issues/[id]";

export const useIssue = (issueNumber: number) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const getIssue = useCallback(async (): Promise<IssueResponse> => {
    const res = await fetch(`/api/issues/${issueNumber}`);
    return await res.json();
  }, [issueNumber]);

  useEffect(() => {
    (async () => {
      const res = await getIssue();
      setComments(res.repository.issue.comments.nodes);
    })();
  }, [getIssue]);

  return { comments };
};
