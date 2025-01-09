import React from "react"; // React のインポート
import { posts } from "./data/posts";
import { ArticlesCard } from "./layout/ArticlesCard";

const App = () => {
  return (
    <div>
      {posts.map((post) => (
        <ArticlesCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default App;
