export function postDatabaseId() {
  console.log("process.env.DB", process.env.DB);
  if (process.env.DB === "TEST") {
    return process.env.TEST_DATABASE_ID;
  } else {
    return process.env.NOTION_BLOG_DATABASE_ID;
  }
}
