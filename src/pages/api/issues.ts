import { NextApiRequest, NextApiResponse } from "next";

import { graphqlClient } from "@/utils/graphqlClient";

const OWNER = "kthatoto";
const REPOSITORY = "message-boards";

export type Issue = {
  number: number;
  title: string;
  bodyText: string;
  createdAt: string;
  comments: {
    totalCount: number;
  };
};

export type IssuesResponse = {
  repository: {
    id: string;
    issues: {
      nodes: Issue[];
    };
  };
};

type CreateIssueResponse = {
  createIssue: {
    issue: Issue;
  };
};

const getRepositoryIssues = `
query ($owner: String!, $repository: String!, $first: Int!) {
  repository(owner: $owner, name: $repository) {
    id
    issues(
      first: $first
      orderBy: {field: CREATED_AT, direction: DESC}
      states: OPEN
    ) {
      nodes {
        number
        title
        bodyText
        createdAt
        comments {
          totalCount
        }
      }
    }
  }
}
`;

const createIssue = `
mutation ($repositoryId: ID!, $title: String!, $body: String) {
  createIssue(input: {
    repositoryId: $repositoryId,
    title: $title,
    body: $body,
  }) {
    issue {
      number
      title
      bodyText
      createdAt
      comments {
        totalCount
      }
    }
  }
}
`;

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const issuesResponse = await graphqlClient<IssuesResponse>(
    getRepositoryIssues,
    { owner: OWNER, repository: REPOSITORY, first: 50 }
  );
  return res.status(200).json(issuesResponse);
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { repositoryId, title, body } = req.body;
  if (!repositoryId || !title) {
    return res.status(400);
  }
  const createIssueResponse = await graphqlClient<CreateIssueResponse>(
    createIssue,
    { repositoryId, title, body }
  );
  return res.status(201).json(createIssueResponse.createIssue.issue);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await get(req, res);
  } else if (req.method === "POST") {
    await post(req, res);
  } else {
    throw new Error(`unsupported method: ${req.method}`)
  }
};
