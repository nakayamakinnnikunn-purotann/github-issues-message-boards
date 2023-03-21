import { NextApiRequest, NextApiResponse } from "next";

import { OWNER, REPOSITORY } from "@/constants";
import { graphqlClient } from "@/utils/graphqlClient";

export type Comment = {
  id: string;
  bodyText: string;
  createdAt: string;
};

export type Issue = {
  id: string;
  title: string;
  bodyText: string;
  createdAt: string;
};

export type IssueResponse = {
  repository: {
    issue: Issue & {
      comments: {
        nodes: Comment[];
      };
    };
  };
};

const getIssueCommentsQuery = `
query ($owner: String!, $repository: String!, $issueNumber: Int!, $commentCount: Int!) {
  repository(owner: $owner, name: $repository) {
    issue(number: $issueNumber) {
      id
      title
      bodyText
      createdAt
      comments(first: $commentCount, orderBy: {field: UPDATED_AT, direction: ASC}) {
        nodes {
          id
          bodyText
          createdAt
        }
      }
    }
  }
}
`;

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { issueNumber } = req.query;
  const commentsResponse = await graphqlClient<IssueResponse>(getIssueCommentsQuery, {
    owner: OWNER,
    repository: REPOSITORY,
    issueNumber: Number(issueNumber),
    commentCount: 50,
  });
  return res.status(200).json(commentsResponse);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await get(req, res);
  } else {
    return res.status(405).end();
  }
}
