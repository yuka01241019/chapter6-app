import React from "react";
// import { Header } from "../layout/Header";
import { useParams } from "react-router-dom";
import { posts } from "../data/posts";

import { ArticlesCardDetail } from "../layout/ArticlesCardDetail";

export const PageDetail = () => {
  const { id } = useParams(); // URLからidを取得する
  const post = posts.find((post) => post.id === Number(id));
  return (
    <div>
      <div class="flex items-center justify-center">
        <img alt="" className="mt-12" src="https://placehold.jp/800x400.png" />
      </div>
      <ArticlesCardDetail post={post} className="border-none" /> 
    </div>
  );
};
