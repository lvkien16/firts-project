import express from 'express';
import { createCategory, deleteCategory, editCategory, editChildrenCategory, getCategories, getChildrenCategories, getOneChildCategory } from '../controllers/category.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create-category",verifyToken, createCategory);
router.get("/get-categories", getCategories);
router.delete("/delete-category/:id",verifyToken, deleteCategory);
router.get("/get-children-categories/:id", getChildrenCategories);
router.put("/edit-category/:id",verifyToken, editCategory);
router.put("/edit-children-category/:id",verifyToken, editChildrenCategory);
router.get("/get-one-child-category/:id", getOneChildCategory);

export default router;