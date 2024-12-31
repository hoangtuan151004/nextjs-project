import React from "react";
import ProductCard from "../components/ProductCard";

export default async function search(params) {
  console.log(params);
  const res = await fetch(
    `http://localhost:3000/products/search/name/` + params.searchParams.name
  );
  const productSearch = await res.json();
  return (
    <>
      <div className="container">
        <div className="catalog-list">
          <h3>Kết quả tìm kiếm cho từ khóa: {params.searchParams.name}</h3>
        </div>
        <div className="row">
          <div className="list-products">
            <ProductCard data={productSearch} />
          </div>
        </div>
      </div>
    </>
  );
}
