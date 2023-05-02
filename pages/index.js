import { getDatabase } from "../lib/notion";
import styles from "./index.module.css";
import Header from "../Component/Header";
import BlogList from "../Component/BlogList";
import Footer from "../Component/Footer";
import HeadContent from "../Component/HeadContent";
import ArchiveList from "../Component/AchiveList";

export const postDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <HeadContent title="Top" />
      <Header />
      <main className={`${styles.container}`}>
        <BlogList posts={posts} admin={false} />
        <ArchiveList />
      </main>
      <Footer />
    </div>
  );
}

//ISRを追加:バックグラウンドでrevalidateに設定した秒数を超すとHTMLの再レンダリングを行なってくれるもの
// 動的ページ（このようなブログサイト）に有用
export const getStaticProps = async () => {
  const postsDatabase = await getDatabase(postDatabaseId);
  return {
    props: {
      posts: postsDatabase,
    },
    // アクセスしたこの値の間は同じキャッシュを返す
    // この秒数を超すと新しいキャッシュを構築し直す
    revalidate: 10,
  };
};
