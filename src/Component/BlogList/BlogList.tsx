import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "@/Component/BlogList/BlogList.module.css";

import { Text } from "@/pages/[id]";
import Heading from "@/Component/Heading/Heading";

const BlogList = ({ posts }) => {
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
      <Heading text="NEWS" />
      <ol className={`${styles.posts}`}>
        {sortedPosts.map((post) => {
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
                  <Text text={post.properties.Name.title} />
                </Link>
              </h3>
              <div className={styles.postDescription}>
                <p>{`Last Update: ${date}`}</p>
              </div>
              <Link href={`/${post.id}`} className={styles.blogLink}>
                記事を読む →
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default BlogList;
