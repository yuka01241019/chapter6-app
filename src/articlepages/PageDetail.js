import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticlesCardDetail } from "../layout/ArticlesCardDetail";

export const PageDetail = () => {
  const { id } = useParams(); // URLからidを取得する
  const [post, setPost] = useState(null); // nullを用いて初期値は「まだデータがない」と表現
  useEffect(() => {
    const fetchPageDetail = async () => {
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
      ); // idを埋め込む
      const data = await res.json();
      console.log(data); // データが正しく取得できているか確認
      setPost(data.post); // postプロパティに格納されている取得したデータを状態に設定
    };
    fetchPageDetail();
  }, [id]);
  // ロードされていない場合の処理
  if (!post ) {
    return <div>読み込み中…</div>;
  }
  return (
    <div>
      <div class="flex items-center justify-center">
        <img alt={post.title} className="mt-12" src={post.thumbnailUrl} />
      </div>
      <ArticlesCardDetail post={post} className="border-none" />
    </div>
  );
};
