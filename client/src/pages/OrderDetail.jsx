import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderProduct from "../components/order/OrderProduct";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function OrderDetail() {
    const [order, setOrder] = useState(null);
    const [comment, setComment] = useState("");
    const [rates, setRates] = useState([]);
    const [isRated, setIsRated] = useState(false);
    const [isLoadingRates, setIsLoadingRates] = useState(false);

    useEffect(() => {
        if (order && order.products.length > 0) {
            const fetchRates = async () => {
                setIsLoadingRates(true);
                try {
                    const res = await fetch(
                        `/api/rate/get-rates/${order.products[0].productId}`
                    );
                    const data = await res.json();
                    setRates(data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoadingRates(false);
                }
            };
            fetchRates();
        }
    }, [order, rates]);

    useEffect(() => {
        if (!isLoadingRates && rates.length > 0 && order) {
            const rated = rates.find((rate) => rate.owner._id === order.user);
            setIsRated(Boolean(rated));
        }
    }, [order, rates, isLoadingRates]);

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

    const { id } = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/order/get-order/${id}`);
                const data = await res.json();
                setOrder(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrder();
    }, [id]);

    const handleCancelOrder = async () => {
        try {
            const res = await fetch(`/api/order/cancel-order/${id}`, {
                method: "PUT",
            });
            const data = await res.json();
            setOrder(data);
            alert("Order cancelled successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateStatus = async () => {
        try {
            const res = await fetch(`/api/order/update-status/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "Đã giao" }),
            });
            const data = await res.json();
            setOrder(data);
            alert("Order status updated successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/rate/create-rate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment,
                    products: order.products.map(
                        (product) => product.productId
                    ),
                    owner: order.user,
                }),
            });
            const data = await res.json();
            alert("Danh gia san pham thanh cong");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {order && (
                <div>
                    <h1>Order Detail</h1>
                    <p>Receiver: {order.receiver}</p>
                    <p>Phone: {order.phone}</p>
                    <p>Address: {order.address}</p>
                    <p>Products: </p>
                    {order.products.map((product, index) => (
                        <div key={index}>
                            <OrderProduct item={product} />
                        </div>
                    ))}
                    <p>Total: {order.total}</p>
                    <p>Status: {order.status}</p>
                    {order.status === "Đang giao" && (
                        <button
                            onClick={handleUpdateStatus}
                            className="border px-3 py-1"
                        >
                            <FaRegCircleCheck />
                        </button>
                    )}
                    {order.status === "Chờ xử lý" && (
                        <button
                            onClick={handleCancelOrder}
                            className="bg-red-400 border py-2 px-3"
                        >
                            Cancel Order
                        </button>
                    )}
                    {order.status === "Đã giao" && !isRated && (
                        <form onSubmit={handleSubmitComment}>
                            <label htmlFor="comment">Comment</label>
                            <input
                                onChange={handleChangeComment}
                                type="text"
                                id="comment"
                                className="border"
                            />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
