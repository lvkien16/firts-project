import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../components/product/Category";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category/get-categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === "") return;
    const fetchSearchProducts = async () => {
      try {
        const res = await fetch(
          `/api/product/search-product-for-users/${search}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchProducts();
  }, [search]);

  useEffect(() => {
    if (search !== "") return;
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
  }, [search]);

  return (
    <div>
      <h1>Products</h1>
      <form action="">
        <input
          onChange={handleChangeSearch}
          type="text"
          placeholder="Search"
          className="w-full border p-2"
        />
        <button className="button">Search</button>
      </form>
      <div className="flex gap-3">
        {categories.map((category) => (
          <div className="" key={category._id}>
            <Category category={category} setProducts={setProducts} products={products} />
          </div>
        ))}
      </div>
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
