import React, { useEffect, useState } from "react";

export default function Category({ category, setProducts, products }) {
  const [childrenCategories, setChildrenCategories] = useState([]);
  const [isShowChildrenCategories, setIsShowChildrenCategories] =
    useState(false);

  const handleShowChildrenCategories = () => {
    setIsShowChildrenCategories(!isShowChildrenCategories);
  };

  useEffect(() => {
    const fetchChildrenCategories = async () => {
      try {
        const res = await fetch(
          `/api/category/get-children-categories/${category._id}`
        );
        const data = await res.json();
        setChildrenCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChildrenCategories();
  }, [category._id]);

  const fetchProductByCategory = async (id) => {
    try {
      const res = await fetch(`/api/product/get-products-by-category/${id}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <div onClick={handleShowChildrenCategories}>{category.name}</div>
        {isShowChildrenCategories && (
            <div>
            {childrenCategories.map((child) => (
                <div onClick={() => fetchProductByCategory(child._id)} key={child._id}>{child.name}</div>
            ))}
            </div>
        )}
    </>
  );
}
