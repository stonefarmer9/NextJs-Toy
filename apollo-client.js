import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const dndClient = new ApolloClient({
  uri: "https://www.dnd5eapi.co/graphql",
  cache: new InMemoryCache(),
});

const httpLink = createHttpLink({
  uri: "https://dev-gateways.hgem.com/hive-gateway/graph/clients/graphql/",
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_GRAPHQL_AUTH_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const hgemClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { dndClient, hgemClient };
