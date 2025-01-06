import React from "react"; // React のインポート
import { posts } from "./data/posts";
import { ArticlesCard } from "./layout/ArticlesCard";

const App = () => {
  return (
    <div>
      {posts.map((post) => (
          <ArticlesCard
            key={post.id}
            title={post.title}
            thumbnailUrl={post.thumbnailUrl}
            createdAt={post.createdAt}
            categories={post.categories}
            content={post.content}
          />
        )
      )}
    </div>
  );
};

export default App;
