import axios from "axios";
import { useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;
const baseApiPath = import.meta.env.VITE_API_PATH;


export default function LoginPage() {
    const [isAuth, setIsAuth] = useState(false);

  const [tempProduct, setTempProduct] = useState({});
  //還沒有撈API資料，先設定一個
  const [products, setProducts] = useState([]);

  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const handlnInputChange = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.name);
    //解構出來
    const { value, name } = e.target;

    setAccount({
      ...account,
      [name]: value,
    });
  };

  //表單submit
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(account);
    // console.log(import.meta.env.VITE_BASE_URL);
    // console.log(import.meta.env.VITE_API_PATH);
    axios
      .post(`${baseUrl}/v2/admin/signin`, account)
      .then((res) => {
        const { token, expired } = res.data;
        // console.log(token, expired);
        document.cookie = `emmaToken=${token}; expires=F${new Date(expired)}`;

        axios.defaults.headers.common["Authorization"] = token;

        axios
          .get(`${baseUrl}/v2/api/${baseApiPath}/admin/products`)
          .then((res) => {
            setProducts(res.data.products);
          })
          .catch((error) => console.error(error));
        setIsAuth(true);
      })
      .catch((error) => alert("登入失敗"));
  };
  
  const checkUserLogin = () => {
    axios
      .post(`${baseUrl}/v2/api/user/check`)
      .then((res) => {
        alert("使用者已登入");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {isAuth ? (
        <div className="container py-5">
          <div className="row">
            <div className="col-6">
              <button
                onClick={checkUserLogin}
                type="button"
                className="btn btn-success mb-5"
              >
                檢查使用者是否登入
              </button>
              <h2>產品列表</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">產品名稱</th>
                    <th scope="col">原價</th>
                    <th scope="col">售價</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col">查看細節</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <th scope="row">{product.title}</th>
                      <td>{product.origin_price}</td>
                      <td>{product.price}</td>
                      <td>{product.is_enabled}</td>
                      <td>
                        <button
                          onClick={() => setTempProduct(product)}
                          className="btn btn-primary"
                          type="button"
                        >
                          查看細節
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-6">
              <h2>單一產品細節</h2>
              {tempProduct.title ? (
                <div className="card">
                  <img
                    src={tempProduct.imageUrl}
                    className="card-img-top img-fluid"
                    alt={tempProduct.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {tempProduct.title}
                      <span className="badge text-bg-primary">
                        {tempProduct.category}
                      </span>
                    </h5>
                    <p className="card-text">
                      商品描述：{tempProduct.description}
                    </p>
                    <p className="card-text">商品內容：{tempProduct.content}</p>
                    <p className="card-text">
                      <del>{tempProduct.origin_price} 元</del> /{" "}
                      {tempProduct.price} 元
                    </p>
                    <h5 className="card-title">更多圖片：</h5>
                    {tempProduct.imagesUrl?.map(
                      (image) =>
                        image && (
                          <img key={image} src={image} className="img-fluid" />
                        )
                    )}
                  </div>
                </div>
              ) : (
                <p>請選擇一個商品查看</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 className="mb-5">請先登入</h1>
          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
            <div className="form-floating mb-3">
              <input
                name="username"
                value={account.username}
                onChange={handlnInputChange}
                type="email"
                className="form-control"
                id="username"
                placeholder="name@example.com"
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                name="password"
                value={account.password}
                onChange={handlnInputChange}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn btn-primary">登入</button>
          </form>
          <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        </div>
      )}
    </>
  );
}
