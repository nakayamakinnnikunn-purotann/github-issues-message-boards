import { Issue } from "@/pages/api/issues";

export const useIssues = () => {
  const getIssues = async (): Promise<Issue[]> => {
    const res = await fetch(`/api/issues`);
    return await res.json();
  };

  return { getIssues };
};
