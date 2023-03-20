import { Anchor, Card, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIssue } from "@/hooks/useIssue";

const IssueNumber = () => {
  const router = useRouter();
  const { issueNumber } = router.query;
  const { issue, comments } = useIssue(issueNumber as string);

  return (
    <Stack spacing={12} sx={{ width: 400 }}>
      <Anchor component={Link} href="/">＜ 戻る</Anchor>
      {issue && (
        <Card
          withBorder
          shadow="sm"
        >
          <Text weight="bold">{issue.title}</Text>
          <Text size="sm">{issue.bodyText}</Text>
          <Text size="sm" align="right">{new Date(issue.createdAt).toLocaleString()}</Text>
        </Card>
      )}
      <Title order={2}>Comments</Title>
      {comments.map((comment) => (
        <Card
          key={comment.id}
          withBorder
          shadow="sm"
        >
          <Text size="sm">{comment.bodyText}</Text>
          <Text size="sm" align="right">{new Date(comment.createdAt).toLocaleString()}</Text>
        </Card>
      ))}
    </Stack>
  );
};
export default IssueNumber;
