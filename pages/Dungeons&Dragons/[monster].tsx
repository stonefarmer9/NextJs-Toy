import Head from "next/head";
import { dndClient } from "../../apollo-client";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { GET_MONSTER } from "../../GraphQlQueries";
import styles from "../../components/layout.module.css";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const { data } = await dndClient.query({
    query: GET_MONSTER,
    variables: { filter: { name: params.monster } },
  });
  return {
    props: {
      monster: data.monster,
    },
  };
}

export default function Monster({ monster }) {
  return (
    <Layout>
      <Head>
        <title>{monster.name}</title>
      </Head>
      <h2>{monster.name}</h2>
      <div>
        <table>
          <thead>
            <tr key="123">
              <th>Str</th>
              <th>Dex</th>
              <th>Con</th>
              <th>Wis</th>
              <th>Int</th>
              <th>Cha</th>
            </tr>
          </thead>
          <tbody>
            <tr key="456">
              <td>{monster.strength}</td>
              <td>{monster.dexterity}</td>
              <td>{monster.constitution}</td>
              <td>{monster.wisdom}</td>
              <td>{monster.intelligence}</td>
              <td>{monster.charisma}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {monster.actions.map((action, index) => {
          return (
            <div key={`${action.name} ${index}`}>
              <p>{action.name}</p>
              <p>{action.desc}</p>
              <p>{action.attack_bonus}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.backToHome}>
        <Link href={"/Dungeons&Dragons/MonsterListSSG"}>
          <a>← Back to Monster list</a>
        </Link>
      </div>
    </Layout>
  );
}
