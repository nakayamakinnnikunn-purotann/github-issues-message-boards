import { graphql } from "@octokit/graphql";

export const graphqlClient = graphql.defaults({
  headers: {
    authorization: `Token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});
