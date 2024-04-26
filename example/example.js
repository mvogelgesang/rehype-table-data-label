import fs from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkResponsiveTable from "../index.js";

const doc = fs.readFileSync("example/example2.md");

const file = unified()
  .use(remarkParse) // Parse markdown.
  .use(remarkGfm) // Support GFM (tables, autolinks, tasklists, strikethrough).
  .use(remarkRehype) // Turn it into HTML.
  .use(rehypeStringify) // Serialize HTML.
  .use(remarkResponsiveTable) // Add responsive table.
  .processSync(doc);

console.log(String(file));
