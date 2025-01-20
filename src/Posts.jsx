import { useEffect, useState } from "react";
import { ArticlesCard } from "./layout/ArticlesCard";


export const Posts = () => {
  const [posts, setPosts] = useState([]); // [] は状態の初期値。「空の配列」として状態を初期化している。
  // API呼び出しを行う関数
  useEffect(() => {
  const getApi = async () => {
    const res = await fetch(
      "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
    );
    const data = await res.json();
    console.log(data);  // データが正しく取得できているか確認
    setPosts(data.posts); // 記事データを設定
  };
    getApi();
  }, []);
  
  // 記事一覧データのAPIデータがない場合
  if(posts.length===0){
  return <div>記事一覧はありません</div>;
  }
  return (
    <div>
      {posts.map((post) => (
        <ArticlesCard key={post.id} post={post} />
      ))}
    </div>
  );
};
