import { NextApiRequest, NextApiResponse } from "next";

import { graphqlClient } from "@/utils/graphqlClient";

export type Issue = {
  title: string;
  number: string;
  createdAt: string;
};

type IssuesResponse = {
  repository: {
    issues: {
      nodes: Issue[];
    };
  };
};

const query = `
  query ($first: Int!) {
    repository(owner: "kthatoto", name: "message-boards") {
      issues(
        first: $first,
        orderBy: {field: CREATED_AT, direction: DESC},
        states: OPEN
      ) {
        nodes {
          title
          number
          createdAt
        }
      }
    }
  }
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const issuesResponse = await graphqlClient<IssuesResponse>(query, { first: 10 });
  return res.status(200).json({
    issues: issuesResponse.repository.issues.nodes,
  });
};
