import Head from "next/head";
import { hgemClient } from "../../apollo-client";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { GET_BRANCHES } from "../../GraphQlQueries";
import styles from "../../components/layout.module.css";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const managerId = Number(params.manager);

  const { data } = await hgemClient.query({
    query: GET_BRANCHES,
    variables: {
      where: {
        manager: {
          id: {
            eq: managerId,
          },
        },
      },
    },
  });
  return {
    props: {
      branches: data,
    },
  };
}

export default function Monster({ branches }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Branches for a manager</title>
        </Head>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {branches.queryForBranchManager.map((branchAndManager) => {
                const { branch } = branchAndManager;
                return (
                  <tr key={branch.id}>
                    <td>{branch.name}</td>
                    <td>{branch.location}</td>
                    <td>
                      <a
                        target="_blank"
                        href={`https://${branch.websiteUrl}`}
                        rel="noopener noreferrer"
                      >
                        {branch.websiteUrl}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={styles.backToHome}>
          <Link href={"/HGEM/HgemLists"}>
            <a>← Back to Managers list</a>
          </Link>
        </div>
      </Layout>
    </>
  );
}
