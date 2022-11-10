import { getDatabase } from "../lib/notion";
import styles from "./index.module.css";
import Header from "../Component/Header";
import BlogList from "../Component/BlogList";
import Footer from "../Component/Footer";
import HeadContent from "../Component/HeadContent"
import { useState } from "react";

export const postDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;
export const memberDatabaseId = process.env.NOTION_MEMBER_DATABASE_ID;

export default function Home({ posts, members }) {
    const [isAuth, setIsAuth] = useState();
    const [password, setPassword] = useState(false);

    const handleNameChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitHandler = () => {
        if (password === process.env.NEXT_PUBLIC_PASSWORD) {
            setIsAuth(true)
        }
    }

    return (
        <>
            {isAuth ?
                <div>
                    <HeadContent title='Top' />
                    <Header />
                    <main className={`${styles.container}`} >
                        <BlogList posts={posts} admin={true} />
                    </main>
                    <Footer />
                </div>
                :
                <form className={styles.adminForm} >
                    <div>
                        <input type="password" onChange={handleNameChange} />
                        <button onClick={onSubmitHandler}>Auth</button>
                    </div>
                </form>}
        </>
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

