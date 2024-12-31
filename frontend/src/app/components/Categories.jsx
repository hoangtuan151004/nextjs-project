"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Mousse");

  useEffect(() => {
    const fetchProducts = async () => {
      let url;
      if (category !== "") {
        url = `http://localhost:3000/category/name/${category}`;
      } else {
        url = "http://localhost:3000";
      }
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, [category]); // dependency : khi cái category là này thay đổi thì nó sẽ fetch dữ liệu category mới về
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
      <div className="product">
        <div className="col-catalog">
          <div className="name-catalog">{category}</div>
        </div>
        <div className="your-product">
          <div className="list-products" id="showQuan">
            <ProductCard data={products} />
          </div>
        </div>
      </div>
    </>
  );
}
