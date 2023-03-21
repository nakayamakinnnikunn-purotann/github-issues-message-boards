import { Anchor, Button, Card, LoadingOverlay, Stack, Text, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { useIssue } from "@/hooks/useIssue";

const IssueNumber = () => {
  const router = useRouter();
  const { issueNumber } = router.query;
  const { issue, comments, createComment, loading } = useIssue(issueNumber as string);

  const form = useForm({
    initialValues: { body: "" },
    validate: {
      body: (val) => (val ? null : "Required"),
    },
  });
  const submit = useCallback(
    async ({ body }: { body: string }) => {
      await createComment(body);
      form.reset();
    },
    [createComment, form]
  );

  return (
    <Stack spacing={12} sx={{ width: 400 }}>
      <Anchor component={Link} href="/">
        ＜ 戻る
      </Anchor>
      <Card withBorder shadow="sm" pos="relative" sx={{ minHeight: 80 }}>
        {loading && <LoadingOverlay visible={true} />}
        {issue && (
          <>
            <Text weight="bold">{issue.title}</Text>
            <Text size="sm">{issue.bodyText}</Text>
            <Text size="sm" align="right">
              {new Date(issue.createdAt).toLocaleString()}
            </Text>
          </>
        )}
      </Card>
      <Title order={2}>Comments</Title>
      {comments.map((comment) => (
        <Card key={comment.id} withBorder shadow="sm">
          <Text size="sm">{comment.bodyText}</Text>
          <Text size="sm" align="right">
            {new Date(comment.createdAt).toLocaleString()}
          </Text>
        </Card>
      ))}
      <form onSubmit={form.onSubmit((params) => submit(params))}>
        <Textarea
          withAsterisk
          label="Comment"
          placeholder="Content"
          {...form.getInputProps("body")}
        />
        <Button fullWidth mt={12} type="submit">
          Post comment
        </Button>
      </form>
    </Stack>
  );
};
export default IssueNumber;
