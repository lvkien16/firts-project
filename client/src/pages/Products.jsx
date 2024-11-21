import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product/get-products-for-users");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="row flex flex-wrap px-5">
        {products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="col-4 border p-3"
          >
            <div className="card">
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
