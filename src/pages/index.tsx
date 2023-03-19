import { useIssues } from "@/hooks/useIssues";

const Home = () => {
  const { issues } = useIssues();

  return (
    <>
      <h1>掲示板</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.number}>{issue.title}</li>
        ))}
      </ul>
    </>
  );
};
export default Home;
