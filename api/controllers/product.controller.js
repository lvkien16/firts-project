import ChildrenCategory from "../models/childrenCategory.model.js";
import Product from "../models/product.model.js";
import Category from "./../models/category.model.js";

export const createProduct = async (req, res, next) => {
    try {
        const {
            name,
            thumbnail,
            category,
            description,
            price,
            images,
            quantity,
        } = req.body;
        const product = new Product({
            name,
            thumbnail,
            category,
            description,
            price,
            images,
            quantity,
        });
        await product.save();
        const ChildCategory = await ChildrenCategory.findById(product.category);
        ChildCategory.quantity += quantity;
        await ChildCategory.save();
        const UCategory = await Category.findById(ChildCategory.parentCategory);
        UCategory.quantity += quantity;
        await UCategory.save();
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    const { page, limit } = req.query;
    try {
        const products = await Product.find({
            status: { $ne: "deleted" },
        });
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const productToReturn = products.slice(startIndex, endIndex);

        res.status(200).json({
            product: products.length,
            products: productToReturn,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res
                .status(404)
                .json({ message: `Product with id ${id} not found` });
        }
        product.status = "deleted";
        await product.save();
        res.status(200).json({ message: `Product deleted` });
    } catch (error) {
        next(error);
    }
};

export const editProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, thumbnail, category, price, images, quantity } = req.body;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res
                .status(404)
                .json({ message: `Product with id ${id} not found` });
        }
        const oldQuantity = product.quantity;
        product.name = name;
        product.thumbnail = thumbnail;
        product.category = category;
        product.price = price;
        product.images = images;
        product.quantity = quantity;
        await product.save();
        const ChildCategory = await ChildrenCategory.findById(product.category);
        ChildCategory.quantity =
            ChildCategory.quantity - oldQuantity + quantity;
        await ChildCategory.save();
        const UCategory = await Category.findById(ChildCategory.parentCategory);
        UCategory.quantity = UCategory.quantity - oldQuantity + quantity;
        await UCategory.save();
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const getProductForUsers = async (req, res, next) => {
    try {
        const products = await Product.find({
            status: "active",
            quantity: { $gt: 0 },
        });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res
                .status(404)
                .json({ message: `Product with id ${id} not found` });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const searchProduct = async (req, res, next) => {
    try {
        const { search } = req.params;
        const products = await Product.find({
            name: { $regex: search, $options: "i" },
            status: { $ne: "deleted" },
        });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const searchProductForUsers = async (req, res, next) => {
    try {
        const { search } = req.params;
        const products = await Product.find({
            name: { $regex: search, $options: "i" },
            status: "active",
            quantity: { $gt: 0 },
        });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductFeatured = async (req, res, next) => {
    try {
        const products = await Product.find({
            status: "active",
            quantity: { $gt: 0 },
        })
            .limit(4)
            .sort({ sold: -1 });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductByCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await Product.find({
            category: id,
            status: "active",
            quantity: { $gt: 0 },
        });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const productsSold = async (req, res, next) => {
    try {
        const products = await Product.find({
            sold: { $gt: 0 },
        }).sort({ sold: -1 });
        let productsSold = 0;
        products.forEach((product) => {
            productsSold += product.sold;
        });
        res.status(200).json(productsSold);
    } catch (error) {
        next(error);
    }
};
