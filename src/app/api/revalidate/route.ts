import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { Env } from "@/libs/Env";

const ALL_TAGS = [
  "blogs",
  "blog",
  "sitemap-blogs",
  "categories",
  "properties",
  "property",
  "property-categories",
  "sitemap-properties",
  "jobs",
  "jobs-featured",
  "job-detail",
  "departments",
];

const TAGS_BY_TYPE: Record<string, string[]> = {
  relocationBlogPost: ["blogs", "blog", "sitemap-blogs"],
  relocationBlogCategory: ["categories", "blogs", "blog"],
  relocationAuthor: ["blogs", "blog"],
  relocationJobPost: ["jobs", "jobs-featured", "job-detail"],
  relocationJobDepartment: ["departments", "jobs"],
  property: ["properties", "property", "sitemap-properties"],
  propertyCategory: ["property-categories", "properties"],
  propertyAgent: ["property"],
};

const readDocumentType = async (request: Request): Promise<string | null> => {
  try {
    const payload = await request.json();
    const type = payload?._type ?? payload?.type;

    return typeof type === "string" ? type : null;
  } catch {
    return null;
  }
};

export async function POST(request: Request) {
  if (request.headers.get("x-revalidate-secret") !== Env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const type = await readDocumentType(request);
  const tags = (type && TAGS_BY_TYPE[type]) || ALL_TAGS;

  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: tags, type });
}
