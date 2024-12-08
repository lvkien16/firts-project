import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from './../models/product.model.js';

export const createOrder = async (req, res, next) => {
  const { user, name, phone, address, products, total } = req.body;
  const newOrder = new Order({
    user,
    receiver: name,
    phone,
    address,
    products,
    total,
  });
  try {
    await newOrder.save();
    const cart = await Cart.findOne({ userId: user });
    if(cart.products === products){
      cart.products = [];
    } else {
      products.forEach((product) => {
        cart.products = cart.products.filter(
          (item) => item.productId !== product.productId
        );
      });
    }

    await cart.save();

    products.forEach(async (product) => {
      const productInDB = await Product.findById(product.productId);
      productInDB.quantity -= product.quantity;
      productInDB.sold += product.quantity;
      await productInDB.save();
    });

    res.status(200).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  }
  catch (error) {
    next(error);
  }
}

export const getOrders = async (req, res, next) => {
  const { user } = req.params;
  try {
    const orders = await Order.find({ user });
    res.status(200).json(orders);
  }
  catch (error) {
    next(error);
  }
}

export const cancelOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    order.status = "Cancelled";
    await order.save();

    order.products.forEach(async (product) => {
      const productInDB = await Product.findById(product.productId);
      productInDB.quantity += product.quantity;
      productInDB.sold -= product.quantity;
      await productInDB.save();
    }
    );
    res.status(200).json(order);
  }
  catch (error) {
    next(error);
  }
}

export const getOrdersForAdmin = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export const updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    order.status = status;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}