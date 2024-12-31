"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Products({ params }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [productSearch, setProductSearch] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(params.name || ""); // params lấy name trên url
  const [sortOption, setSortOption] = useState("asc");

  // sắp xếp tăng dần giảm dần
  const handleSort = (products) => {
    return [...products].sort((a, b) => {
      if (sortOption === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    const fetchSearchProducts = async () => {
      if (searchKeyword) {
        const res = await fetch(
          `http://localhost:3000/products/search/name/${searchKeyword}`
        );
        const data = await res.json();
        setProductSearch(data);
      }
    };

    fetchSearchProducts();
  }, [searchKeyword]);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "http://localhost:3000";
      if (category !== "all") {
        url = `http://localhost:3000/category/name/${category}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <div className="catalog-list">
        <div className="col-catalog" onClick={() => setCategory("Mousse")}>
          <div className="img-catalog">
            <img src="images/mousse.png" alt="Mousse" />
          </div>
          <div className="name-catalog">Mousse</div>
        </div>
        <div className="col-catalog" onClick={() => setCategory("Macarons")}>
          <div className="img-catalog">
            <img src="images/macaron.png" alt="Macaron" />
          </div>
          <div className="name-catalog">Macaron</div>
        </div>
        <div className="col-catalog" onClick={() => setCategory("Bánh ngọt")}>
          <div className="img-catalog">
            <img src="images/croi-png.png" alt="Bánh ngọt" />
          </div>
          <div className="name-catalog">Bánh ngọt</div>
        </div>
        <div className="col-catalog" onClick={() => setCategory("Cupcakes")}>
          <div className="img-catalog">
            <img src="images/cup-icon.png" alt="Cupcakes" />
          </div>
          <div className="name-catalog">Cupcakes</div>
        </div>
      </div>

      <div className="list-product__main">
        <div className="list-product__left">
          <div className="list-product__left-aside">Danh mục sản phẩm</div>
          <ul className="navbar-aside">
            <li>
              <a className="navbar-link" onClick={() => setCategory("all")}>
                Tất cả
              </a>
            </li>
            <li className="navbar-list">
              <a className="navbar-link" onClick={() => setCategory("Mousse")}>
                Mousse
              </a>
            </li>
            <li className="navbar-list">
              <a
                className="navbar-link"
                onClick={() => setCategory("Bánh ngọt")}
              >
                Bánh ngọt
              </a>
            </li>
            <li className="navbar-list">
              <a
                className="navbar-link"
                onClick={() => setCategory("Macarons")}
              >
                Macarons
              </a>
            </li>
            <li className="navbar-list">
              <a
                className="navbar-link"
                onClick={() => setCategory("Cupcakes")}
              >
                Cupcakes
              </a>
            </li>
          </ul>

          <div className="list-product__left-aside">Tìm kiếm sản phẩm</div>
          <form className="search-form" action="/timkiem">
            <input
              className="search-input"
              name="keyword"
              placeholder="Nhập tên sản phẩm"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="search-button" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>

        <div className="list-product__right">
          <div className="sort-options">
            <label htmlFor="sort">Sắp xếp theo:</label>
            <select onChange={handleSortChange}>
              <option value="asc">Giá tăng dần</option>
              <option value="des">Giá giảm dần</option>
            </select>
          </div>

          <div className="list-products">
            {searchKeyword ? (
              <ProductCard data={handleSort(productSearch)} />
            ) : (
              <ProductCard data={handleSort(products)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
