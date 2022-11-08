import { Fragment } from "react";
import { getDatabase, getPage, getBlocks } from "../lib/notion";
import Link from "next/link";
import { postDatabaseId } from "./index.js";
import styles from "./post.module.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Image from "next/image";
import HeadContent from "../Component/HeadContent";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"


export const Text = ({ text }) => {
  if (!text) {
    return null;
  }

  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    if (text.content === '\n') {
      return (<br />)
    }
    return (
      <span
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderNestedList = (block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item'

  if (isNumberedList) {
    return (
      <ol>
        {value.children.map((block) => renderBlock(block))}
      </ol>
    )
  }
  return (
    <ul>
      {value.children.map((block) => renderBlock(block))}
    </ul>
  )
}

const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        < p className={`${styles.paragraph}`
        }>
          <Text text={value.text} />
        </p >
      );
    case "heading_1":
      return (
        <h1 className={`${styles.heading} ${styles.headDesign}`}>
          <Text text={value.text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className={`${styles.heading} ${styles.headDesign}`}>
          <Text text={value.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className={styles.heading}>
          <Text text={value.text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <div style={{ margin: '15px 20px' }}>
          <li >
            <Text text={value.text} />
            {!!value.children && renderNestedList(block)}
          </li>
        </div>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption || "";
      return (
        <figure className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={src}
            alt={caption}
            layout="fill"
            objectFit="contain"
          />

          {caption && <figcaption className={styles.figcaption}><Text text={caption} /></figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return <blockquote style={{ margin: '20px 15px' }} key={id}>{value.text[0].plain_text}</blockquote>;
    case "code":
      return (
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
            {value.text[0].plain_text}
          </code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className={styles.file}>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url
      return (
        <a href={href} target="_brank" className={styles.bookmark}>
          {href}
        </a>
      );
    case "table":
      const columList = []
      const tableList = []
      value.children.map((item) => {
        columList.push(item)
      })

      for (let i = 0; i < columList.length; i++) {
        const item = columList[i].table_row.cells
        const itemList = []
        for (let j = 0; j < item.length; j++) {
          itemList.push(item[j][0])
        }
        tableList.push(itemList)
      }

      return (
        < div >
          <table>
            <tbody>
              {tableList.slice().map((item, index) => {
                return (
                  <tr key={index}>
                    {item.map((i) => {
                      const text = [i]
                      return <td className={styles.tableContent}><Text text={text} /></td>
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div >
      );
    case 'callout':
      const emoji = block.callout.icon.emoji
      const text = block.callout.text
      const backGroundColor = block.callout.color
      const backGroundColorDict = [
        { name: 'gray_background', code: 'rgb(241, 241, 239)' },
        { name: 'brown_background', code: 'rgb(244, 238, 238)' },
        { name: 'orange_background', code: 'rgb(251, 236, 221)' },
        { name: 'yellow_background', code: 'rgb(251, 243, 219)' },
        { name: 'green_background', code: 'rgb(237, 243, 236) ' },
        { name: 'blue_background', code: 'rgb(231, 243, 248)' },
        { name: 'purple_background', code: 'rgba(244, 240, 247, 0.8)' },
        { name: 'pink_background', code: 'rgba(249, 238, 243, 0.8)' },
        { name: 'red_background', code: 'rgb(253, 235, 236)' }
      ]

      var calloutStyle = {
        backgroundColor: 'rgb(255, 255, 255)',
        border: '1px solid rgba(0,0,0,.2)'
      }

      backGroundColorDict.forEach(element => {
        if (element.name == backGroundColor) {
          calloutStyle = { backgroundColor: element.code }
        }
      });

      if (block.callout.text[0].annotations.bold) {
        calloutStyle.fontWeight = 'bold'
      }

      return (
        <div className={styles.callout} style={calloutStyle}>
          <span className={styles.calloutEmoji}>{emoji}</span>
          <p><Text text={text} /></p>
        </div>
      )
    case 'video':
      const videoUrl = value.external.url
      return (
        <>
          <div className={styles.video}>
            <iframe src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </>
      )
    case 'unsupported':
      return
    default:
      return `❌ Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type
        })`;
  }
};

export default function Post({ page, blocks }) {
  const hashTag = page && page.properties.HashTag.rich_text[0] ? page.properties.HashTag.rich_text[0].plain_text : ' '
  const title = page && page.properties.Name.title[0] ? page.properties.Name.title[0].plain_text : ''
  const publishedDate = page ? new Date(page.created_time).toLocaleDateString('ja-JP') : ''
  const editedDate = page ? new Date(page.last_edited_time).toLocaleDateString('ja-JP') : ''
  const authers = []
  const router = useRouter();

  const shareUrl = hashTag
    ? `https://twitter.com/share?url=https://mokumoku-blog.vercel.app${router.asPath}&text=${title}&hashtags=${hashTag}`
    : `https://twitter.com/share?url=https://mokumoku-blog.vercel.app${router.asPath}&text=${title}`

  if (page) {
    page.properties.Auther.multi_select.map((auther) => {
      authers.push(auther.name)
    })
  }

  if (!page || !blocks) {
    return <div />;
  }
  return (
    <div>
      <HeadContent title={title} />
      <Header />
      <article className={styles.container}>
        <h1 className={styles.name}>
          <Text text={page.properties.Name.title} />
        </h1>
        <div className={styles.articleExp}>
          <div className={styles.date}>
            <p>edited: {editedDate}</p>
            <p>published: {publishedDate}</p>
          </div>
          <p>{`auther: `}
            {authers.map((auther, index) => (
              <span key={index} style={{ margin: '0 5px' }}>{auther}</span>
            ))}
          </p>
        </div>

        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}

          <a
            href={shareUrl}
            rel="nofollow"
            target="_blank"
            className={styles.share}
          >
            <FontAwesomeIcon className={styles.icon} icon={faTwitter} />
            <span>TwitterでShare！</span>
          </a>

          <Link href="/">
            <a className={styles.back}>← Go home</a>
          </Link>
        </section>
      </article>
      <Footer />
    </div>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(postDatabaseId);
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1, //ISR...前回から何秒以内のアクセスを無視するか指定します。
  };
};
