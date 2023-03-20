import { Card, Stack } from "@mantine/core";
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
          {issue.title}
        </Card>
      ))}
    </Stack>
  );
};
export default Home;
