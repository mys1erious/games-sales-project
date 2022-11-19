import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/layout';
import Date from '../../components/date';
import {getAllPostIds, getPostData} from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';


// fetches necessary data for the post with id
export const getStaticProps: GetStaticProps = async({params}) => {
    const postData = await getPostData(params?.id as string);
    return {
        props: {
            postData,
        },
    };
}

// returns an array of possible values for id
export const getStaticPaths: GetStaticPaths = async() => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}


// Catch-all Routes:
// pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.
// export async function getStaticPaths() {
//     const paths = getAllPostIds();
//     return [
//         {
//             params: {
//                 // Statically Generates /posts/a/b/c
//                 id: ['a', 'b', 'c'],
//             },
//         },
//         //...
//     ];
// }
// export async function getStaticProps({ params }) {
//   // params.id will be like ['a', 'b', 'c']
// }

export default function Post({
    postData
}: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date}/>
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </Layout>
    );
}
