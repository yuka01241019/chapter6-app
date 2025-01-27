import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-zinc-700 font-bold text-white py-7 px-5">
      <Link to="/" className="">
        Blog
      </Link>
      <Link to="/contact" className="float-right">
        お問い合わせ
      </Link>
    </header>
  );
};
