import { useCallback, useEffect, useState } from "react";
import { Comment, Issue, IssueResponse } from "@/pages/api/issues/[issueNumber]";

export const useIssue = (issueNumber: string) => {
  const [issue, setIssue] = useState<Issue | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);

  const getIssue = useCallback(async (): Promise<IssueResponse> => {
    const res = await fetch(`/api/issues/${issueNumber}`);
    return await res.json();
  }, [issueNumber]);

  const createComment = useCallback(async (body: string) => {
    const res = await fetch(`/api/issues/${issueNumber}/comments`, {
      method: "POST",
      body: JSON.stringify({
        issueId: issue?.id,
        body,
      }),
    });
    const newComment: Comment = await res.json();
    setComments([...comments, newComment]);
  }, [issue, comments]);

  useEffect(() => {
    (async () => {
      const res = await getIssue();
      const { comments, ...issue } = res.repository.issue;
      setIssue(issue);
      setComments(comments.nodes);
    })();
  }, [getIssue]);

  return { issue, comments, createComment };
};
