import { getDatabase } from "../lib/notion";
import styles from "./index.module.css";
import Header from "../Component/Header";
import BlogList from "../Component/BlogList";
import Footer from "../Component/Footer";

export const postDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;
export const memberDatabaseId = process.env.NOTION_MEMBER_DATABASE_ID;

export default function Home({ posts, members }) {
  return (
    <div>
      <Header />
      <main className={`${styles.container}`} >
        <BlogList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}

//ISRを追加:バックグラウンドでrevalidateに設定した秒数を超すとHTMLの再レンダリングを行なってくれるもの
// 動的ページ（このようなブログサイト）に有用
export const getStaticProps = async () => {
  const postsDatabase = await getDatabase(postDatabaseId)
  const memberDatabase = await getDatabase(memberDatabaseId)
  return {
    props: {
      posts: postsDatabase,
      members: memberDatabase,
    },
    // アクセスしたこの値の間は同じキャッシュを返す
    // この秒数を超すと新しいキャッシュを構築し直す
    revalidate: 1
  }
};

