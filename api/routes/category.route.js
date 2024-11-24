import express from 'express';
import { createCategory, deleteCategory, editCategory, editChildrenCategory, getCategories, getChildrenCategories, getOneChildCategory } from '../controllers/category.controller.js';

const router = express.Router();

router.post("/create-category", createCategory);
router.get("/get-categories", getCategories);
router.delete("/delete-category/:id", deleteCategory);
router.get("/get-children-categories/:id", getChildrenCategories);
router.put("/edit-category/:id", editCategory);
router.put("/edit-children-category/:id", editChildrenCategory);
router.get("/get-one-child-category/:id", getOneChildCategory);

export default router;