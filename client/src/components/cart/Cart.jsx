import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CartDetail({ product: p, isUpdated, setIsUpdated }) {
  const [product, setProduct] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `/api/product/get-product-by-id/${p.productId}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [p.productId]);

  const handlePlus = async () => {
    if (p.quantity >= product.quantity) {
      alert("Out of stock");
      return;
    }
    try {
      const res = await fetch("/api/cart/plus-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          productId: p.productId,
        }),
      });
      const data = await res.json();
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMinus = async () => {
    if (p.quantity <= 1) {
      alert("Out of stock");
      return;
    }
    try {
      const res = await fetch("/api/cart/minus-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          productId: p.productId,
        }),
      });
      const data = await res.json();
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const res = await fetch("/api/cart/remove-from-cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          productId: p.productId,
        }),
      });
      const data = await res.json();
      setIsUpdated(!isUpdated);
      alert("Product removed from cart");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {product && (
        <div className="flex gap-4">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-20 h-20"
          />
          <h3>{product.name}</h3>
          <p>{product.price * p.quantity}</p>
          <div className="flex gap-4 items-center">
            <button onClick={handleMinus}>-</button>
            <p>{p.quantity}</p>
            <button onClick={handlePlus}>+</button>
          </div>
          <button onClick={handleRemoveFromCart}>Delete</button>
        </div>
      )}
    </div>
  );
}
