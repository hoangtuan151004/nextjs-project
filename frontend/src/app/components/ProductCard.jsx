"use client";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartslide";
import { useState } from "react";

function ProductCard(props) {
  //AddtoCart
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  return (
    <>
      {props.data.map((product) => {
        const { _id, name, img, price } = product;
        return (
          <>
            <div className="col-4" key={_id}>
              <Link href={`/chitiet/${_id}`}>
                <div className="img-product">
                  <img src={`http://localhost:3000/images/${img}`} />
                  <img
                    src={`http://localhost:3000/images/${img}`}
                    className="hover-image"
                    alt=""
                  />
                </div>
              </Link>
              <div className="text">
                <Link href={`/chitiet/${_id}`} className="view">
                  <div className="name-product">{name}</div>
                </Link>
                <div className="price-product">
                  {price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>

              <div className="btn-product">
                <Link href={`/chitiet/${_id}`} className="view">
                  Mua ngay
                </Link>

                <button
                  onClick={() =>
                    dispatch(addToCart({ item: product, quantity: quantity }))
                  }
                >
                  Thêm
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default ProductCard;
