import { postDatabaseId } from "./index";
import { getDatabase } from "../lib/notion";
import HeadContent from "../Component/HeadContent";


export default function Archive({ posts, title }) {
  console.log(posts)
  return (
    <div>
      <HeadContent title="archive" />
      <Header />
      <main className={`${styles.container}`}>
        <BlogList posts={posts} admin={false} />
      </main>
      <Footer />
    </div>
  );
}

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
