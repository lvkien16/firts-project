import Category from "../models/category.model.js";
import ChildrenCategory from "../models/childrenCategory.model.js";

export const createCategory = async (req, res, next) => {
  const { name, category } = req.body;
  try {
    if (!category) {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }
      const category = new Category({ name });
      await category.save();
      res.status(201).json(category);
    } else {
      const existingCategory = await ChildrenCategory.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }
      const childrenCategory = new ChildrenCategory({
        name,
        parentCategory: category,
      });
      await childrenCategory.save();
      res.status(201).json(childrenCategory);
    }
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getChildrenCategories = async (req, res, next) => {
  const { id } = req.params;

  try {
    const childrenCategories = await ChildrenCategory.find({
      parentCategory: id,
    });
    if (!childrenCategories) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(childrenCategories);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const editCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const editChildrenCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const childrenCategory = await ChildrenCategory.findById(id);
    if (!childrenCategory) {
      return res.status(404).json({ message: "Children category not found" });
    }
    childrenCategory.name = name;
    await childrenCategory.save();
    res.status(200).json(childrenCategory);
  } catch (error) {
    next(error);
  }
};

export const getOneChildCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const childrenCategory = await ChildrenCategory.findById(id);
    if (!childrenCategory) {
      return res.status(404).json({ message: "Children category not found" });
    }
    res.status(200).json(childrenCategory);
  } catch (error) {
    next(error);
  }
};
