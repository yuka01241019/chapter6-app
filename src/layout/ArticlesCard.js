export const ArticlesCard = ({post}) => {
// 日付表示を変更（YYYY/MM/DD形式）
  const date = new Date(post.createdAt).toLocaleDateString("ja-JP");
  return (
    <div className="border border-gray-400 my-8 mx-80 py-4 pl-3 pr-40 ">
      <div className="text-sm float-left">{date}</div>
      <div className="float-right">
        {post.categories.map((category, index) => (
          <button
            key={index}
            className="px-2 py-0 mx-1 text-blue-500 border border-blue-500  rounded"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="clear-both text-left pt-4">{post.title}</div>
      <div className="pt-4" dangerouslySetInnerHTML={{__html: post.content}}></div>
    </div>
  );
};

