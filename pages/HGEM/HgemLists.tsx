import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { hgemClient } from "../../apollo-client";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps() {
  const { data } = await hgemClient.query({
    query: gql`
      query ActiveManagersByClientId {
        activeManagersByClientId(clientId: 91622) {
          name
          id
        }
      }
    `,
  });
  return {
    props: {
      managers: data.activeManagersByClientId,
    },
  };
}

export default function HgemLisits({ managers }) {
  return (
    <Layout>
      <Head>
        <title>Hgem Managers list</title>
      </Head>
      <div className={utilStyles.flexGrid}>
        {managers.map((manager) => {
          return (
            <Link key={manager.id} href={`/HGEM/${manager.id}`}>
              <div className={utilStyles.card}>
                <p className={utilStyles.cardTitle}>{manager.name}</p>
                <p className={utilStyles.cardContent}>{manager.id}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}
