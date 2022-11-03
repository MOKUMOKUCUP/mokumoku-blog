import { getDatabase } from "../lib/notion";
import styles from "./index.module.css";
import Header from "../Component/Header";
import HeadContent from "../Component/HeadContent";
import BlogList from "../Component/BlogList";
import MemberList from "../Component/Member";
import Footer from "../Component/Footer";
import { useEffect, useState } from "react";



export const postDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;
export const memberDatabaseId = process.env.NOTION_MEMBER_DATABASE_ID;
let i = 0
export default function Home({ posts, members }) {
  useEffect(() => {
    i++
  }, [i])

  if (i === 0) {
    return (
      <div>
        <HeadContent title={'HOME'} />
        <Header isAnimation={true} />
        <main className={`${styles.container}`} >
          <BlogList posts={posts} isAnimation={true} />
          {/* <MemberList members={members} isAnimation={true} /> */}
        </main>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <HeadContent title={'HOME'} />
        <Header isAnimation={false} />
        <main className={`${styles.container}`} >
          <BlogList posts={posts} isAnimation={false} />
          <MemberList members={members} isAnimation={false} />
        </main>
        <Footer />
      </div>
    );
  }


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

