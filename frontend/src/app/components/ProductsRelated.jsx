// components/RelatedProducts.js
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function RelatedProducts({ productId }) {
  const {
    data: relatedProducts,
    error,
    isLoading,
  } = useSWR(
    `http://localhost:3000/products/related/${productId}/related`,
    fetcher,
    {
      refreshInterval: 6000,
    }
  );

  if (error) return <div>Lỗi load dữ liệu sản phẩm liên quan.</div>;
  if (isLoading) return <div>Đang tải sản phẩm liên quan...</div>;

  return (
    <div className="product">
      <div className="col-catalog-product">
        <div className="img-catalogg">
          <img
            src="http://localhost:3000/images/bake.png"
            alt="Related Products"
          />
        </div>
        <div className="name-catalog">Sản phẩm liên quan</div>
      </div>
      <div className="your-product">
        <div className="list-productss" id="showSpView">
          {relatedProducts.map((relatedProduct) => (
            <div className="col-4" key={relatedProduct.id}>
              <Link href={`/chitiet/${relatedProduct._id}`}>
                <div className="img-product">
                  <img
                    src={`http://localhost:3000/images/${relatedProduct.img}`}
                    alt={relatedProduct.name}
                  />
                  <img
                    src={`http://localhost:3000/images/${relatedProduct.img}`}
                    alt={relatedProduct.name}
                    className="hover-image"
                  />
                </div>
              </Link>
              <div className="text">
                <Link href={`/chitiet/${relatedProduct._id}`} className="view">
                  <div className="name-product">{relatedProduct.name}</div>
                </Link>
                <div className="price-product">
                  {relatedProduct.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
              <div className="btn-product">
                <Link href={`/chitiet/${relatedProduct._id}`} className="view">
                  Mua ngay
                </Link>
                <a href="#" className="add">
                  Thêm
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
