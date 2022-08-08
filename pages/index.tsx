import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";
import { useSession, signOut } from "next-auth/react";
import LoginButton from "../components/login-button";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const { data: session } = useSession();
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {session ? (
        <>
          <nav>
            <button onClick={() => signOut()}>Sign Out</button>
            <p>Signed in as {session.user.email}</p>
            <p>User name: {session.user.name}</p>
          </nav>
          <section className={utilStyles.headingMd}>
            <p>Im a dude, playing a dude, disguised as another dude</p>
            <p>
              (This is a sample website - you’ll be building a site like this on{" "}
              <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
            </p>
          </section>
          <section
            className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
          >
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
              {allPostsData.map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </li>
              ))}
            </ul>
          </section>
          <section className={utilStyles.headingMd}>
            <h2>Dungeons & Dragons</h2>
            <Link href={"/Dungeons&Dragons/MonsterListSSG"}>
              Click here for some monster information
            </Link>
          </section>
          <section>
            <h2 className={utilStyles.headingLg}>HGEM GrapghQl Zone</h2>
            <Link href={"/HGEM/HgemLists"}>Hgem Stuff</Link>
          </section>
        </>
      ) : (
        <LoginButton />
      )}
    </Layout>
  );
}
