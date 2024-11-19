import React, { useState } from "react";

export default function Test() {
  const [isShowChildCategory, setIsShowCategory] = useState("");

  const handleShowChildCategory = (id) => {
    setIsShowCategory(id);
  };
  return (
    <div>
      <div onClick={handleShowChildCategory}>áo </div>
      <div>
        {isShowChildCategory && (
          <div>
            ao phong
            <input type="radio" name="category" id="" />
            ao hoodie
            <input type="radio" name="category" id="" />
            ao sweater
            <input type="radio" name="category" id="" />
          </div>
        )}
      </div>
      <div>quần </div>
      <div>
        ao phong
        <input type="radio" name="category" id="" />
        ao hoodie
        <input type="radio" name="category" id="" />
        ao sweater
        <input type="radio" name="category" id="" />
      </div>
      <div>mũ</div>
    </div>
  );
}
