import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { useIssues } from "@/hooks/useIssues";
import Link from "next/link";

const Home = () => {
  const { issues } = useIssues();

  return (
    <Stack spacing={12} sx={{ width: 400 }}>
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
