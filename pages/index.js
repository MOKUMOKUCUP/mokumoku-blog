import styles from "styles/index.module.css";

import Header from "Component/Header";
import BlogList from "Component/BlogList";
import Footer from "Component/Footer";
import HeadContent from "Component/HeadContent";

import { getDatabase } from "lib/notion";
import { postDatabaseId } from "lib/ids";

export default function Home({ posts = null }) {
  return (
    <div>
      <HeadContent title="Top" />
      <Header />
      <main className={`${styles.container}`}>
        <BlogList posts={posts} />
        {/*<ArchiveList posts={posts} />*/}
      </main>
      <Footer />
    </div>
  );
}

//ISRを追加:バックグラウンドでrevalidateに設定した秒数を超すとHTMLの再レンダリングを行なってくれるもの
// 動的ページ（このようなブログサイト）に有用
export const getStaticProps = async () => {
  const databaseId = await postDatabaseId();
  const allPosts = await getDatabase(databaseId);
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
