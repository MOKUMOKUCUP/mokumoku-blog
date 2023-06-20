import styles from "src/styles/index.module.css";

import Header from "src/Component/Header";
import BlogList from "src/Component/BlogList";
import Footer from "src/Component/Footer";
import HeadContent from "src/Component/HeadContent";

import { getDatabase } from "src/lib/notion";
import { postDatabaseId } from "src/lib/ids";

export default function Home({ posts }) {

  return (
    <div>
      <HeadContent title="Top" />
      <Header />
      <main className={`${styles.container}`}>
        <BlogList posts={posts}/>
        {/*<ArchiveList posts={posts} />*/}
      </main>
      <Footer />
    </div>
  );
}

//ISRを追加:バックグラウンドでrevalidateに設定した秒数を超すとHTMLの再レンダリングを行なってくれるもの
// 動的ページ（このようなブログサイト）に有用
export const getStaticProps = async () => {
  const allPosts = await getDatabase(postDatabaseId);
  const publishposts = allPosts.filter((post) => {
    return post.properties.isPublish.checkbox === true;
  });
  return {
    props: {
      posts: publishposts,
    },
    // アクセスしたこの値の間は同じキャッシュを返す
    // この秒数を超すと新しいキャッシュを構築し直す
    revalidate: 30,
  };
};
