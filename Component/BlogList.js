import Link from "next/link";
import { Text } from "../pages/[id]";
import styles from "../pages/index.module.css";
import { useEffect, useState } from "react";

const BlogList = ({ posts, admin }) => {
  const [sortedPosts, setSoredPosts] = useState([]);

  useEffect(() => {
    const pinPosts = [];
    const normalPosts = [];
    posts.map((post) => {
      if (post.properties.pin.checkbox) {
        pinPosts.push(post);
      } else {
        normalPosts.push(post);
      }
    });
    pinPosts.sort((a, b) => {
      return a.properties.publishDate.date.start <
        b.properties.publishDate.date.start
        ? 1
        : -1;
    });
    normalPosts.sort((a, b) => {
      return a.properties.publishDate.date.start <
        b.properties.publishDate.date.start
        ? 1
        : -1;
    });
    setSoredPosts(pinPosts.concat(normalPosts));
  }, []);

  return (
    <>
      <h2 className={`${styles.heading}`}>NEWS</h2>
      <ol className={`${styles.posts}`}>
        {sortedPosts.map((post) => {
          const publish = post.properties.isPublish.checkbox;
          if (!admin) {
            if (!post.properties.isPublish.checkbox) {
              return;
            }
          }

          const date =
            new Date(post.properties.publishDate.date.start).toLocaleDateString(
              "ja-JP"
            ) || "";

          return (
            <li key={post.id} className={`${styles.post}`}>
              {post.properties.pin.checkbox ? (
                <span className={styles.check}>check!</span>
              ) : (
                <></>
              )}
              <h3 className={styles.postTitle}>
                <Link href={`/${post.id}`}>
                  <a>
                    <Text text={post.properties.Name.title} />
                  </a>
                </Link>
              </h3>
              <div className={styles.postDescription}>
                <p>{`Last Update: ${date}`}</p>
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
  );
};

export default BlogList;
