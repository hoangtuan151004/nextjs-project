"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "../redux/slices/cartslide";
import { useMemo } from "react";
import Link from "next/link";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  const dispatch = useDispatch();

  const total = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );
  return (
    <>
      <div class="cart">
        <div class="shopping-cart">
          <div class="shopping-left">
            <div class="cart-title">
              <h3>| Giỏ hàng của bạn</h3>
            </div>
            <div class="cart-content">
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Tạm tính</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          class="img-cart"
                          width="100px"
                          src={`http://localhost:3000/images/${item.img}`}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <input
                          class="quantity-cart"
                          min="1"
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateCartItemQuantity({
                                _id: item._id,
                                quantity: parseInt(e.target.value),
                              })
                            )
                          }
                        />
                      </td>
                      <td>{item.price.toLocaleString()}</td>
                      <td>
                        {(item.price * item.quantity).toLocaleString()}
                      </td>{" "}
                      <td>
                        <button
                          class="bnt-delete"
                          onClick={() => dispatch(removeFromCart(item._id))}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tr className="table-primary">
                  <td colSpan="3">Tổng cộng</td>
                  <td colSpan="3">
                    {total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
            <div class="button">
              <div class="bnt-cart">
                <Link href="/">
                  <button>Quay lại trang chủ</button>
                </Link>
              </div>
              <div class="bnt-cart">
                <Link href="/">
                  <button onClick={() => dispatch(clearCart())}>
                    Xóa tất cả
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div class="shopping-right">
            <table>
              <thead>
                <tr>
                  <th colspan="2">Thông tin đơn hàng</th>
                </tr>
              </thead>
            </table>
            <div class="right-text">
              <div class="cart-item">
                <div class="item-title">Tạm tính</div>
                <div class="item-price">
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
              <div class="cart-item">
                <div class="item-title">Giảm giá</div>
                <div class="item-price">Áp dụng tại trang thanh toán</div>
              </div>
              <div class="cart-item">
                <div class="item-title">Phí vân chuyển</div>
                <div class="item-price">Được tính tại trang thanh toán</div>
              </div>
              <div class="bnt-cart-right">
                <a href="./checkout.html">
                  <button>Thanh Toán</button>
                </a>
              </div>
              <div class="cart-checkou">
                <div class="checkou-title">
                  Hỗ trợ nhiều phương thức thanh toán
                </div>
                <div class="checkou-img">
                  <img src="images/money.png" alt />
                  <img src="images/momone.png" alt />
                  <img src="images/Logo-Napas.webp" alt />
                  <img src="images/visa.png" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
