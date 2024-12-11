import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Rate from "../components/rate/Rate";

export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [currentShow, setCurrentShow] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { currentUser } = useSelector((state) => state.user);
    const [rates, setRates] = useState([]);

    const router = useNavigate();

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlus = () => {
        if (quantity < product.quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleChangeShow = (image) => {
        setCurrentShow(image);
    };

    const { id } = useParams();

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const res = await fetch(`/api/rate/get-rates/${id}`);
                const data = await res.json();
                setRates(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRates();
    }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/get-product-by-id/${id}`);
                const data = await res.json();
                setProduct(data);
                setCurrentShow(data.thumbnail);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!currentUser) {
            alert("Please login to add to cart");
            localStorage.setItem("redirect-cart", `/product/${id}`);
            router("/login");
            return;
        }
        try {
            const res = await fetch("/api/cart/add-to-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    productId: product._id,
                    quantity,
                    price: product.price * quantity,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Add to cart successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuyNow = () => {
        if (!currentUser) {
            alert("Please login to buy now");
            localStorage.setItem("redirect-cart", `/product/${id}`);
            router("/login");
            return;
        }
        localStorage.setItem(
            "cartToCheckout",
            JSON.stringify([
                {
                    price: product.price * quantity, // Tổng giá sản phẩm (nếu mua nhiều)
                    quantity, // Số lượng
                    productId: product._id, // ID sản phẩm
                    _id: product._id, // ID sản phẩm
                },
            ])
        );

        router("/checkout");
    };

    return (
        <div className="container mx-auto p-4">
            {product && (
                <>
                    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            className="w-full h-64 object-cover"
                            src={currentShow}
                            alt={product.name}
                        />
                        <div className="flex gap-4">
                            <img
                                onClick={() =>
                                    handleChangeShow(product.thumbnail)
                                }
                                className="w-[100px] h-[100px] object-cover hover:cursor-pointer"
                                src={product.thumbnail}
                                alt={product.name}
                            />
                            {product.images.length > 0 &&
                                product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        onClick={() => handleChangeShow(image)}
                                        className="w-[100px] h-[100px] object-cover hover:cursor-pointer"
                                        src={image}
                                        alt={product.name}
                                    />
                                ))}
                        </div>
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-2">
                                tên sản phẩm: {product.name}
                            </h1>
                            <p className="text-xl text-gray-700 mb-4">
                                {" "}
                                giá: ${product.price}
                            </p>
                            <p className="text-gray-600">
                                số lượng: {product.quantity}
                            </p>
                        </div>
                        <div className="flex">
                            <button onClick={handleMinus}>-</button>
                            <div>{quantity}</div>
                            <button onClick={handlePlus}>+</button>
                        </div>
                        <div>Ước tính: ${product.price * quantity}</div>
                        <div className="flex gap-5">
                            <button
                                onClick={handleBuyNow}
                                className="px-3 py-1 border bg-blue-400"
                            >
                                Buy now
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="px-3 py-1 border bg-blue-400"
                            >
                                Add to cart
                            </button>
                        </div>
                        {rates && rates.length > 0 && (
                            <div>
                                <h2>Đánh giá sản phẩm</h2>
                                {rates.map((rate, index) => (
                                    <div key={index}>
                                        <Rate rate={rate} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
