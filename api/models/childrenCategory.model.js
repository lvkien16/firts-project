import mongoose from "mongoose";

const childrenCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const ChildrenCategory = mongoose.model("ChildrenCategory", childrenCategorySchema);

export default ChildrenCategory;