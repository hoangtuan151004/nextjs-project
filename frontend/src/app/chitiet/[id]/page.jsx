"use client";
import Categories from "@/app/components/Categories";
import RelatedProducts from "@/app/components/ProductsRelated";
import useSWR from "swr";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartslide"; //import hàm addToCart trogn cartsilde
import { useState } from "react";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DetailPage({ params }) {
  //AddtoCart
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  //Chi tiết
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`http://localhost:3000/products/${params.id}`, fetcher, {
    refreshInterval: 6000,
  });

  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading) return <div>Đang tải</div>;

  return (
    <>
      <div class="small-container single-product">
        <div class="roww">
          <div class="col-22">
            <img src={`http://localhost:3000/images/${product.img}`} alt />

            <div class="small-img-row">
              <div class="small-img-col">
                <img
                  src={`http://localhost:3000/images/${product.img}`}
                  alt
                  width="100%"
                  class="small-img"
                />
              </div>
            </div>
          </div>
          <div class="col-22">
            <p id="category">Home / {product.name}</p>
            <h1 id="name">{product.name}</h1>
            <h4 id="price">
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </h4>

            <span>Số lượng: </span>
            <input
              class="quantity-cart"
              min="1"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div class="bnt-cart-right">
              <button
                onClick={() =>
                  dispatch(addToCart({ item: product, quantity: quantity }))
                }
              >
                Thêm vào giỏ hàng
              </button>
            </div>
            <h3>
              Mô tả sản phẩm: <i class="fa fa-indent"></i>
            </h3>

            <p>Còn : {product.quantity}</p>
            <p id="description">{product.description}</p>
          </div>
        </div>
      </div>
      <RelatedProducts productId={params.id}></RelatedProducts>
    </>
  );
}
