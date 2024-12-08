import React, { useState } from "react";

export default function Coupon() {
    const [form, setForm] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleCreateCoupon = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/coupon/create-coupon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      create Coupon
      <form onSubmit={handleCreateCoupon}>
        <input onChange={handleChange} type="text" placeholder="Coupon Code" name="code" />
        <input onChange={handleChange} type="number" placeholder="quantity" name="quantity" />
        <input onChange={handleChange} type="date" placeholder="start" name="start" />
        <input onChange={handleChange} type="date" placeholder="end" name="end" />
        <input onChange={handleChange} type="number" placeholder="discount" name="discount" />
        <input onChange={handleChange} type="number" placeholder="min order" name="minTotal" />
        <button>Submit</button>
      </form>
    </div>
  );
}
