import Link from "next/link";
import { Text } from "../pages/[id]";
import styles from "../pages/index.module.css";

const BlogList = ({ posts, admin }) => {
    return (
        <>
            <h2 className={`${styles.heading}`}>NEWS</h2>
            <ol className={`${styles.posts}`} >
                {posts.sort((a,b) => {
                        return (a.last_edited_time < b.last_edited_time ? 1 : -1);
                    }).sort((a,b)=>{
                        a.properties.pin.checkbox ? 1 : -1
                    }).map((post) => {
                    const publish = post.properties.isPublish.checkbox
                    if (!admin) { if (!post.properties.isPublish.checkbox) { return; } }

                    const date = new Date(post.last_edited_time).toLocaleDateString('ja-JP') || ''
                    const authers = []
                    post.properties.Auther.multi_select.map((auther) => {
                        authers.push(auther.name)
                    })

                    return (
                        <li key={post.id} className={`${styles.post}`} >
                            {post.properties.pin.checkbox ? <span className={styles.check}>check!</span> :<></>}
                            <h3 className={styles.postTitle}>
                                <Link href={`/${post.id}`} >
                                    <a>
                                        <Text text={post.properties.Name.title} />
                                    </a>
                                </Link>
                            </h3>
                            <div className={styles.postDescription}>
                                <p >{`Last Update: ${date}`}</p>
                                <p>{`auther: `}
                                    {authers.map((auther, index) => (
                                        <span key={index} style={{ margin: '0 5px' }}>{auther}</span>
                                    ))}
                                </p>
                                {admin ? <p>{`publish: ${publish}`}</p> : <></>}
                            </div>
                            <Link href={`/${post.id}`}>
                                <a className={styles.blogLink}> 記事を読む →</a>
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </>
    )
}

export default BlogList