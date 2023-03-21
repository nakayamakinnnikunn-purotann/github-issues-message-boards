import { useCallback, useEffect, useState } from "react";

import { Comment, Issue, IssueResponse } from "@/pages/api/issues/[issueNumber]";

export const useIssue = (issueNumber: string) => {
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState<Issue | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);

  const getIssue = useCallback(async (): Promise<IssueResponse | undefined> => {
    if (!issueNumber) return;
    const res = await fetch(`/api/issues/${issueNumber}`);
    return await res.json();
  }, [issueNumber]);

  const createComment = useCallback(
    async (body: string) => {
      const res = await fetch(`/api/issues/${issueNumber}/comments`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issueId: issue?.id,
          body,
        }),
      });
      const newComment: Comment = await res.json();
      setComments([...comments, newComment]);
    },
    [issueNumber, issue, comments]
  );

  useEffect(() => {
    (async () => {
      const res = await getIssue();
      if (!res) return;
      const { comments, ...issue } = res.repository.issue;
      setIssue(issue);
      setComments(comments.nodes);
      setLoading(false);
    })();
  }, [getIssue]);

  return { issue, comments, createComment, loading };
};
