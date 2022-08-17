import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import isEqual from "lodash/isEqual";
import merge from "deepmerge";
import { useMemo } from "react";

//https:developers.wpengine.com/blog/apollo-client-cache-rehydration-in-next-js - link to client cache rehydration

export const APOLLO_STATE_PROP_NAME = "__Apollo_STATE__";
let dndApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const dndCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        monsters: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const dndClient = new ApolloClient({
  cache: dndCache,
  connectToDevTools: true,
  ssrMode: true,
  link: new HttpLink({
    uri: "https://www.dnd5eapi.co/graphql",
    credentials: "same-origin",
  }),
});

function createDnDApolloClient() {
  return dndClient;
}

export function initializeDndApolloClient(
  initialState: NormalizedCacheObject | null = null
) {
  const _dndApolloClient = dndApolloClient ?? createDnDApolloClient();

  if (initialState) {
    const existingDndCache = _dndApolloClient.extract();

    const data = merge(initialState, existingDndCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _dndApolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") return _dndApolloClient;

  if (!dndApolloClient) dndApolloClient = _dndApolloClient;

  return _dndApolloClient;
}

export function addDndApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
}

export function useDnDApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeDndApolloClient(state), [state]);
  return store;
}

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
  connectToDevTools: false,
});

export { dndClient, hgemClient };
