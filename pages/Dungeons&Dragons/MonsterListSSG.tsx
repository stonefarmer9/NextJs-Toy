import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { dndClient } from "../../apollo-client";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps() {
  const { data } = await dndClient.query({
    query: gql`
      query Monsters {
        monsters {
          name
          challenge_rating
          index
        }
      }
    `,
  });
  return {
    props: {
      monsters: data.monsters,
    },
  };
}

export default function MonsterList({ monsters }) {
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
    </Layout>
  );
}
