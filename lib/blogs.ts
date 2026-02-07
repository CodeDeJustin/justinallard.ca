import "server-only";
import glob from "fast-glob";
import { readFile } from "fs/promises";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

type JsonObject = Record<string, unknown>;
type ContentType = "blogs";

export type BlogMetadata = JsonObject & {
  title: string;
  date: string;
  description: string;
  image?: string;
  author?: string;
  canonicalUrl?: string;
};

export type BlogSummary = BlogMetadata & {
  slug: string;
};

export type BlogFrontMatter = BlogSummary & {
  wordCount: number;
  readingTime: ReturnType<typeof readingTime>;
};

type FileBySlugResult = {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: BlogFrontMatter;
};

type FrontMatterEntry = JsonObject & {
  slug: string;
};

const isRecord = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseMetadata = (raw: string, context: string): BlogMetadata => {
  const parsed: unknown = JSON.parse(raw);
  if (!isRecord(parsed)) {
    throw new Error(`${context}: metadata.json must be a JSON object`);
  }

  if (
    typeof parsed.title !== "string" ||
    typeof parsed.date !== "string" ||
    typeof parsed.description !== "string"
  ) {
    throw new Error(
      `${context}: metadata.json must include string fields 'title', 'date', and 'description'`,
    );
  }

  return parsed as BlogMetadata;
};

async function importBlog(blogFileNames: string): Promise<BlogSummary> {
  const isIndex = /\/index\.mdx$/.test(blogFileNames);
  const relativeDir = isIndex
    ? path.dirname(blogFileNames)
    : blogFileNames.replace(/\.mdx$/, "");
  const absoluteDir = path.join(process.cwd(), "content/blogs", relativeDir);
  const metadataPath = path.join(absoluteDir, "metadata.json");
  const context = `Failed to load metadata.json for blog '${relativeDir}'`;

  let meta: BlogMetadata;
  try {
    const raw = await readFile(metadataPath, "utf8");
    meta = parseMetadata(raw, context);
  } catch (err) {
    throw new Error(`${context}: ${(err as Error).message}`);
  }

  return {
    slug: blogFileNames.replace(/(\/index)?\.mdx$/, ""),
    ...meta,
  };
}

export async function getAllBlogs(): Promise<BlogSummary[]> {
  const blogFileNames = await glob(["*.mdx", "*/index.mdx"], {
    cwd: path.join(process.cwd(), "content/blogs"),
  });

  const blogs = await Promise.all(blogFileNames.map(importBlog));

  return blogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

const root = process.cwd();

export async function getFiles(type: string): Promise<string[]> {
  return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(
  type: ContentType,
  slug: string,
): Promise<FileBySlugResult> {
  if (type !== "blogs") {
    throw new Error(`Unsupported type: ${type}`);
  }

  const absoluteDir = path.join(root, "content", "blogs", slug);
  const mdxPath = path.join(absoluteDir, "index.mdx");
  const metadataPath = path.join(absoluteDir, "metadata.json");

  if (!fs.existsSync(mdxPath)) {
    throw new Error(`MDX not found for slug '${slug}' at ${mdxPath}`);
  }

  const source = fs.readFileSync(mdxPath, "utf8");
  const { content } = matter(source);
  const mdxSource = await serialize(content);

  if (!fs.existsSync(metadataPath)) {
    throw new Error(`metadata.json not found for slug '${slug}' at ${metadataPath}`);
  }

  let meta: BlogMetadata;
  const context = `Invalid metadata.json for slug '${slug}'`;
  try {
    const raw = await readFile(metadataPath, "utf8");
    meta = parseMetadata(raw, context);
  } catch (err) {
    throw new Error(`${context}: ${(err as Error).message}`);
  }

  return {
    mdxSource,
    frontMatter: {
      ...meta,
      slug,
      wordCount: content.split(/\s+/g).length,
      readingTime: readingTime(content),
    },
  };
}

export async function getAllFilesFrontMatter(
  type: string,
): Promise<FrontMatterEntry[]> {
  console.log(
    'fs.readdirSync(path.join(root, "data", type));',
    fs.readdirSync(path.join(root, "data", type)),
  );
  const files = fs.readdirSync(path.join(root, "data", type));

  return files.reduce<FrontMatterEntry[]>((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, "data", type, postSlug),
      "utf8",
    );
    const { data } = matter(source);
    const frontMatter = isRecord(data) ? data : {};

    return [
      {
        ...frontMatter,
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, []);
}
