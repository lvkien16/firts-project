import React, { useEffect, useState } from "react";

export default function Home() {
  const [productsFetured, setProductsFeatured] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product/get-products-featured");
        const data = await res.json();
        setProductsFeatured(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <div>
        <img
          src="https://images.vexels.com/media/users/3/194700/list/aa5b7c80ff2c80f764e2cabf5492a701-buy-online-slider-template.jpg"
          alt=""
          className="w-full"
        />
      </div>
      <div className="">
        <h1>Product featured</h1>
        <div className="flex">
          {productsFetured.map((product, index) => (
            <div key={index}>
              <h3>{product.name}</h3>
              <img src={product.thumbnail} alt="" />
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
