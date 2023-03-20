import { Badge, Button, Card, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useCallback } from "react";
import { useIssues } from "@/hooks/useIssues";

const Home = () => {
  const { issues, createIssue } = useIssues();

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
    validate: {
      title: (val) => val ? null : "Required",
    },
  });
  const submit = useCallback(async ({ title, body }: { title: string, body: string }) => {
    await createIssue(title, body ? body : undefined);
    form.reset();
  }, [createIssue, form]);

  return (
    <Stack spacing={12} sx={{ width: 400 }}>
      <form onSubmit={form.onSubmit((params) => submit(params))}>
        <div>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Title"
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Description"
            placeholder="Description"
            {...form.getInputProps("body")}
          />
        </div>
        <Button fullWidth mt={12} type="submit">New issue</Button>
      </form>
      {issues.map((issue) => (
        <Card
          component={Link}
          href={`/issues/${issue.number}`}
          key={issue.number}
          withBorder
          shadow="sm"
        >
          <Group position="apart">
            <Text weight="bold">{issue.title}</Text>
            <Badge
              size="lg"
              color={issue.comments.totalCount === 0 ? "gray" : undefined}
            >{issue.comments.totalCount}</Badge>
          </Group>
          <Text size="sm">{issue.bodyText}</Text>
          <Text size="sm" align="right">{new Date(issue.createdAt).toLocaleString()}</Text>
        </Card>
      ))}
    </Stack>
  );
};
export default Home;
