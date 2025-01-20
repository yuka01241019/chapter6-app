import React from "react"; // React のインポート
// import { posts } from "./data/posts"; Posts.jsxを作成し移動
import { Header } from "./layout/Header";
// import { ArticlesCard } from "./layout/ArticlesCard";　Posts.jsxを作成し移動
import { Routes, Route } from "react-router-dom";
import { PageDetail } from "./articlePages/PageDetail";
import { Posts } from "./Posts"; // Postsコンポーネントをインポート

const App = () => {
  return (
    <div>
      <Header />
      {/* ルーティング設定 */}
      <Routes>
        {/* 記事一覧 */}
        <Route path="/" element={<Posts />} />
        {/* 記事詳細 */}
        <Route path="/posts/:id" element={<PageDetail />} />
      </Routes>
    </div>
  );
};

export default App;
