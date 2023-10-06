//notion Clientを追加
import { Client } from "@notionhq/client";

export const postDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

//getDatabaseを追加
export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const posts = response.results;

  // 非公開ページのフィルタリング
  const filterPosts = posts.filter((post) => {
    // @ts-ignore
    return post.properties?.isPublish.checkbox === true;
  });

  return filterPosts;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

/* eslint no-constant-condition: ["error",  {"checkLoops": false}] */
export const getBlocks = async (blockId) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};
