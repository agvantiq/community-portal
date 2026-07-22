import { FORUM_POSTS } from "@/lib/sample-data";
import { ForumThreadClient } from "./forum-thread-client";

export function generateStaticParams() {
  return FORUM_POSTS.map((post) => ({ id: post.id }));
}

export default async function ForumThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = FORUM_POSTS.find((p) => p.id === id) ?? FORUM_POSTS[0];

  return <ForumThreadClient post={post} />;
}
