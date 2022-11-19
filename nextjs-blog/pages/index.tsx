import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Layout, {siteTitle} from "../components/layout";
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from "../lib/posts";
import Date from '../components/date';


// Static Generation
// getStaticProps only allowed in a Page
export const getStaticProps: GetStaticProps = async() => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}


// Server-side Rendering:
// To use Server-side Rendering, you need to export
//  getServerSideProps instead of getStaticProps from your page.
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }


// Client-side Rendering:
// 1. Statically generate (pre-render) parts of the page that do not require external data.
// 2. When the page loads, fetch external data from the client
//    using JavaScript and populate the remaining parts.
//
// import useSWR from 'swr';
// function Profile() {
//   const { data, error } = useSWR('/api/user', fetch);
//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;
//   return <div>hello {data.name}!</div>;
// }


export default function Home({
    allPostsData
}: {
    allPostsData: {
        date: string
        title: string
        id: string
    }[]
}) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Yep, some info about me that I am not going to write, ne ny a sho?</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({id, date, title}) => (
                        <li className={utilStyles.listItem} key={id}>
                          <Link href={`/posts/${id}`}>{title}</Link>
                          <br />
                          <small className={utilStyles.lightText}>
                            <Date dateString={date} />
                          </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}
