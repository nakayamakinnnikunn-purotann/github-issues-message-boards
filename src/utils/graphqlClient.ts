import { graphql } from "@octokit/graphql";

export const graphqlClient = graphql.defaults({
  headers: {
    athorization: `Token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});
