import { Link } from "react-router-dom";

export const ArticlesCard = ({ post, className }) => {
  // 日付表示を変更（YYYY/MM/DD形式）
  const date = new Date(post.createdAt).toLocaleDateString("ja-JP");
  // 先頭3行のみを表示する関数を作成
  const getFirstThreeLines = (content) => {
    // splitメソッドで<br/>タグがある位置で区切る
    const lines = content.split("<br/>");
    // sliceメソッドで配列の0番目～2番目（3つ分）の要素を取得する
    // joinメソッドで先頭3つの要素を再び<br/>で結合（改行の形を維持）
    // 条件演算子を使って配列の要素の数が3つを超える場合（true）は、最後に「...」を追加する。
    // 配列の要素数が3つ以下の場合（false）は、何も追加しない。
    return lines.slice(0,3).join("<br/>") + (lines.length > 3 ? "<br/>..." : "");
  };
  return (
    <Link
      to={`/posts/${post.id}`} //クリックするとid毎の詳細ページに飛ぶ
      className={`block border border-gray-400 my-8 mx-auto py-4 pl-6 pr-20 w-[800px] max-w-[800px] ${className} `}
    >
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
      <div
        className="pt-4"
        dangerouslySetInnerHTML={{ __html: getFirstThreeLines(post.content) }}
      ></div>
    </Link>
  );
};
