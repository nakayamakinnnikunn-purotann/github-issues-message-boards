import { NextApiRequest, NextApiResponse } from "next";

import { graphqlClient } from "@/utils/graphqlClient";

import { OWNER, REPOSITORY } from "@/constants";

export type Comment = {
  bodyText: string;
  createdAt: string;
};

export type IssueResponse = {
  repository: {
    issue: {
      id: string;
      title: string;
      bodyText: string;
      comments: {
        nodes: Comment[];
      };
    };
  };
};

type CreateCommentResponse = {
};

const getIssueCommentsQuery = `
query ($owner: String!, $repository: String!, $issueNumber: Int!, $commentCount: Int!) {
  repository(owner: $owner, name: $repository) {
    issue(number: $issueId) {
      id
      title
      bodyText
      comments(first: $commentCount, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          bodyText
          createdAt
        }
      }
    }
  }
}
`;

const createCommentMutation = `
`;

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const commentsResponse = await graphqlClient<IssueResponse>(
    getIssueCommentsQuery,
    {
      owner: OWNER,
      repository: REPOSITORY,
      issueNumber: id,
      commentCount: 50,
    }
  );
  return res.status(200).json(commentsResponse);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await get(req, res);
  } else {
    throw new Error(`unsupported method: ${req.method}`)
  }
}
