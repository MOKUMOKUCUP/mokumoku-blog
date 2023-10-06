import { getDatabase, postDatabaseId } from "@/lib/notion";
import styles from "@/pages/index.module.css";
import Header from "@/Component/Header/Header";
import BlogList from "@/Component/BlogList/BlogList";
import Footer from "@/Component/Footer/Footer";
import HeadContent from "@/Component/HeadContent";

export default function Home({ posts }) {
  return (
    <div>
      <HeadContent title="Top" />
      <Header />
      <main className={`${styles.container}`}>
        <BlogList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}

//ISRを追加:バックグラウンドでrevalidateに設定した秒数を超すとHTMLの再レンダリングを行なってくれるもの
// 動的ページ（このようなブログサイト）に有用
export const getStaticProps = async () => {
  const posts = await getDatabase(postDatabaseId);

  return {
    props: {
      posts: posts,
    },
    // アクセスしたこの値の間は同じキャッシュを返す
    // この秒数を超すと新しいキャッシュを構築し直す
    revalidate: 30,
  };
};
