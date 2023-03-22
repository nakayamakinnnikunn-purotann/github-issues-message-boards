import { graphql } from "@octokit/graphql";

export const graphqlClient = graphql.defaults({
  headers: {
    authorization: `Token ${process.env.GITHUB_TOKEN}`,
  },
});
