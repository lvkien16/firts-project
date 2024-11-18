import React, { useState } from "react";

export default function ChildrenCategory({
  childrenCategory,
  isUpdate,
  setIsUpdate,
}) {
  const [childrenCategoryName, setChildrenCategoryName] = useState(
    childrenCategory.name
  );
  const [isEditChildrenCategory, setIsEditChildrenCategory] = useState(false);

  const handleChange = (e) => {
    setChildrenCategoryName(e.target.value);
  };

  const handleEditCategory = async () => {
    try {
      const res = await fetch(
        `/api/category/edit-children-category/${childrenCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: childrenCategoryName }),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setIsEditChildrenCategory(false);
        setChildrenCategoryName(data.name);
        setIsUpdate(!isUpdate);
        alert("Edit children category successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(childrenCategoryName);
  return (
    <div className="flex gap-3">
      {isEditChildrenCategory ? (
        <div>
          <input
            onChange={handleChange}
            type="text"
            value={childrenCategoryName}
          />
          <button type="button" onClick={handleEditCategory}>
            Save
          </button>
        </div>
      ) : (
        <div>{childrenCategoryName}</div>
      )}

      <button
        onClick={() => setIsEditChildrenCategory(!isEditChildrenCategory)}
        className="border"
      >
        Edit
      </button>
    </div>
  );
}
