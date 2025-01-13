import React from "react"; // React のインポート
import { posts } from "./data/posts";
import { Header } from "./layout/Header";
import { ArticlesCard } from "./layout/ArticlesCard";
import { Routes, Route} from "react-router-dom";
import { PageDetail } from "./articlepages/PageDetail";


const App = () => {
  return (
    <div>
    <Header />
      {/* ルーティング設定 */}
      <Routes>
        {/* 記事一覧 */}
        <Route
          path="/"
          element={
            <div>
              {posts.map((post) => (
                <ArticlesCard key={post.id} post={post} />
              ))}
            </div>
          }
        />
        {/* 記事詳細 */}
        <Route path="/posts/:id" element={<PageDetail />} />
      </Routes>
    </div>
  );
};

export default App;
