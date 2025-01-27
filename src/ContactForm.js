import { useState } from "react";

export const ContactForm = () => {
  //初期値は空文字列のオブジェクト。
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // isLoadingの初期状態をfalse(送信中ではない)に設定

  const handleChange = (e) => {
    const name = e.target.name; //e.targetからnameを取得
    const value = e.target.value; //e.targetからvalueを取得
    setFormData({ ...formData, [name]: value }); //スプレッド構文で既存のオブジェクトに更新できるようにする
  };

  const validate = () => {
    const newErrors = {}; //エラーメッセ―ジを格納する入れ子の役割

    //名前：入力必須＆30文字以内
    if (!formData.name) {
      newErrors.name = "お名前は必須です。";
    } else if (formData.name.length > 30) {
      newErrors.name = "お名前は30文字以内で入力してください。";
    }

    //メールアドレス：入力必須＆メールアドレスの形式になっていること
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //正規表現を変数として定義
    if (!formData.email) {
      newErrors.email = "メールアドレスは必須です。";
    } else if (!emailRegex.test(formData.email)) {
      //testメソッドを使い正規表現（emailRegex）にマッチしない場合はtrueとなる→エラーメッセージを表示する
      newErrors.email = "メールアドレスの形式が正しくありません。";
    }

    //本文：入力必須 & 500字以内
    if (!formData.message) {
      newErrors.message = "本文は必須です。";
    } else if (formData.message.length > 500) {
      newErrors.message = "本文は500文字以内で入力してください。";
    }
    return newErrors; //すべてのフィールドを検証した後、エラーがあればnewErrorsオブジェクトを返す。
  };
  //フォーム送信時に実行される関数を定義
  const handleSubmit = async (e) => {
    e.preventDefault(); //このメソッドは記述がないとフォームの送信時にページがリロードされてしまいエラーメッセージの表示や他の処理が適切に動作しない可能性があるので必須
    const validationErrors = validate(); //validate() を実行して、その結果（エラー情報）を validationErrors という変数に保存
    //オブジェクトのプロパティを配列して取得、配列が空でなければエラーであると判断
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); //フォームのエラー状態を更新しユーザーにエラーメッセージを表示する
      return; //エラーが出たときに処理を中止する
    }
    //成功した場合の処理
    setErrors({}); //// エラーがなければ（送信成功やリセット）エラー状態をクリアにする
    setIsLoading(true); //送信が始まるときにtrueにする
    try {
      const response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", //「送信するデータはJSON形式」とサーバーに教えるための情報
          },
          body: JSON.stringify(formData), //送信するデータの本体（リクエストボディ）を指定する
        }
      );
      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      alert("送信しました。"); //// フォーム送信成功メッセージ
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      //エラーが発生した場合にエラーをキャッチして処理
      alert(error.message);
    } finally {
      setIsLoading(false); //送信が終わったら（成功でも失敗でも）falseに戻す
    }
  };
  //フォームの入力値をクリアするための関数
  const handleClear = () => {
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  space-y-4 mx-auto w-[800px] max-w-[800px]"
    >
      <h1 className="text-lg font-bold mb-4 mt-6">問い合わせフォーム</h1>
      <div className="space-y-6">
        <div className="flex items-center space-x-4 ">
          <label htmlFor="name" className="  w-40 ">
            お名前
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            disabled={isLoading}
            className=" border border-stone-300 rounded-lg p-3 w-[600px] h-[60px]"
          />
        </div>
        {/* エラーメッセージ用コード */}
        {errors.name && (
          <p className="text-red-500 text-sm  ml-44 ">{errors.name}</p>
        )}
        <div className="flex items-center space-x-4">
          <label htmlFor="email" className="  w-40">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            disabled={isLoading}
            className=" border rounded-lg p-3 border-stone-300 w-[600px] h-[60px]"
          />
        </div>
        {/* エラーメッセージ用コード */}
        {errors.email && (
          <p className="text-red-500 text-sm ml-44">{errors.email}</p>
        )}
        <div className="flex items-center space-x-4">
          <label htmlFor="message" className=" w-40">
            本文
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
            className=" border rounded-md p-3  border-stone-300 w-[600px] h-[250px]"
          ></textarea>
        </div>
        {/* エラーメッセージ用コード */}
        {errors.message && (
          <p className="text-red-500 text-sm ml-44">{errors.message}</p>
        )}

        <div className="flex space-x-4 justify-center font-bold">
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 px-4 border block rounded-lg  text-white bg-gray-800"
          >
            送信
          </button>

          <button
            type="reset"
            onClick={handleClear}
            disabled={isLoading}
            className="py-2 px-4 border rounded-md bg-slate-200"
          >
            クリア
          </button>
        </div>
      </div>
    </form>
  );
};
