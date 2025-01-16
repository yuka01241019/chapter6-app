import React from "react";
import { ArticlesCard } from "./layout/ArticlesCard";
import { posts } from "./data/posts";

export const Posts = () => {
  return (
    <div>
      {posts.map((post) => (
        <ArticlesCard key={post.id} post={post} />
      ))}
    </div>
  );
};
