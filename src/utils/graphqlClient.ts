import { graphql } from "@octokit/graphql";

export const graphqlClient = graphql.defaults({
  headers: {
    athorization: `Token ${process.env.GITHUB_TOKEN}`,
  },
});
