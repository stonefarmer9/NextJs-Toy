import "../styles/global.css";
import { SessionProvider } from "next-auth/react";
import { useDnDApollo } from "../apollo-client";
import { ApolloClient, ApolloProvider } from "@apollo/client";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const dndProvier = useDnDApollo(pageProps);
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={dndProvier}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
