import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import {
  addDndApolloState,
  dndClient,
  initializeDndApolloClient,
  useDnDApollo,
} from "../../apollo-client";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

const GET_MONSTERS = gql`
  query Query($skip: Int, $limit: Int) {
    monsters(skip: $skip, limit: $limit) {
      name
      challenge_rating
      index
    }
  }
`;
export async function getServerSideProps() {
  const dndApolloClient = initializeDndApolloClient();
  await dndApolloClient.query({
    query: GET_MONSTERS,
    variables: {
      skip: 0,
      limit: 500,
    },
  });
  return addDndApolloState(dndApolloClient, {
    props: {},
  });
}

export default function MonsterList() {
  const fetchMoarMonstas = () => {
    fetchMore({
      variables: {
        skip: monsters.length,
      },
    });
  };
  const bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            fetchMoarMonstas();
          }
        });
      }).observe(node);
    },
    [fetchMoarMonstas]
  );
  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);
  const { fetchMore, loading, error, data } = useQuery(GET_MONSTERS, {
    client: dndClient,
    variables: {
      limit: 500,
    },
  });
  const infinityStyles = {
    height: "1em",
  };
  const monsters = data?.monsters;
  return (
    <Layout>
      <Head>
        <title>D&D MonsterList</title>
      </Head>
      <div className={utilStyles.flexGrid}>
        {monsters.map((monster) => {
          return (
            <Link
              key={monster.index}
              href={`/Dungeons&Dragons/${monster.index}`}
            >
              <div className={utilStyles.card}>
                <p className={utilStyles.cardTitle}>{monster.name}</p>
                <p className={utilStyles.cardContent}>
                  Challenge Rating: {monster.challenge_rating}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      {loading && <p>The monsters are coming.....</p>}
      <div style={infinityStyles} ref={bottomBoundaryRef}></div>
    </Layout>
  );
}
