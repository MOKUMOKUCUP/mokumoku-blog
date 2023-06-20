export async function postDatabaseId() {
  if (process.env.DB === "TEST") {
    return process.env.TEST_DATABASE_ID;
  } else {
    return process.env.NOTION_BLOG_DATABASE_ID;
  }
}
