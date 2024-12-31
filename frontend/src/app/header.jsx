"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce(
    (count, item) => count + Number(item.quantity),
    0
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isdAdmin, setIdAdmin] = useState(0);
  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div class="header">
      <div class="header-top">
        <div class="logo-header">
          <img src="images/logo_becky.png" alt="logo" />
        </div>
        <div class="row-header">
          <form className="search-form" action="/timkiem">
            <input
              className="search-input"
              name="name"
              placeholder="Nhập tên sản phẩm"
            />
            <button className="search-button" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div class="title-rigth">
          <li>
            <a href="#" class>
              <i class="fa-solid fa-phone"></i>
              <span>0880 2308</span>
            </a>
          </li>
        </div>
        <div class="title-rigth">
          <li>
            <a href="#" class>
              <i class="fa-solid fa-headphones"></i>
              <span>Tư vấn miễn phí</span>
            </a>
          </li>
        </div>
        <div class="title-rigth">
          <li>
            <a href="#" class>
              <i class="fa-solid fa-location-dot"></i>
              <span>Tìm kiếm cửa hàng</span>
            </a>
          </li>
        </div>
      </div>
      <div class="menu-header">
        <div class="row-menu-header">
          <div class="menu-left">
            <li>
              <Link href="/">
                <i class="fa-solid fa-house"></i>Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/sanpham">Sản phẩm</Link>
            </li>
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Bài viết</a>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
          </div>
          <div class="content-header">
            <li>
              <Link
                href={isLoggedIn ? "/taikhoan" : "/dangnhap"}
                class="nav-link"
              >
                <span>
                  <i
                    class={isLoggedIn ? "fa-solid fa-user" : "fa-solid fa-user"}
                  ></i>
                </span>
              </Link>
            </li>
            <li class="cart-container">
              <span id="amount-cart" class="count">
                {cartCount}
              </span>
              <Link href="/giohang" class="nav-link">
                <i class="fa-solid fa-bag-shopping"></i>
              </Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}
