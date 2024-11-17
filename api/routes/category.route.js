import express from 'express';
import { createCategory, deleteCategory, editCategory, getCategories, getChildrenCategories } from '../controllers/category.controller.js';

const router = express.Router();

router.post("/create-category", createCategory);
router.get("/get-categories", getCategories);
router.delete("/delete-category/:id", deleteCategory);
router.get("/get-children-categories/:id", getChildrenCategories);
router.put("/edit-category/:id", editCategory);

export default router;