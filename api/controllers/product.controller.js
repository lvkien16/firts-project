import Product from "../models/product.model.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, thumbnail, category, description, price, images } = req.body;
    const product = new Product({
      name,
      thumbnail,
      category,
      description,
      price,
      images,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
