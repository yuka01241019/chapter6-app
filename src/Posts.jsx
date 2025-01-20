import { useEffect, useState } from "react";
import { ArticlesCard } from "./layout/ArticlesCard";

export const Posts = () => {
  const [posts, setPosts] = useState([]); // [] は状態の初期値。「空の配列」として状態を初期化している。
  const [isLoading, setisLoading] = useState(true); // isLoadingの初期状態をtrueに設定
  // API呼び出しを行う関数
  useEffect(() => {
    const getApi = async () => {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      );
      const data = await res.json();
      console.log(data); // データが正しく取得できているか確認
      setPosts(data.posts); // 記事データを設定
      setisLoading(false); // データ取得後に読み込み中の状態を終了する
    };
    getApi();
  }, []);
  //ローディング中
  if (isLoading) {
    return <div>読み込み中…</div>;
  }
  // 記事一覧データのAPIデータがない場合
  if (posts.length === 0) {
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
