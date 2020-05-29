import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.takeshape.io/project/4d20d2d6-bc63-4bda-b917-ae53c257d932/graphql",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 21778c9d3b7948df8402ccc72f28baf2`
    }
  }),

  cache: new InMemoryCache()
});

export default client;
