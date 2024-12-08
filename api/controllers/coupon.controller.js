import Coupon from "../models/coupon.model.js";

export const createCoupon = async (req, res, next) => {
  const { code,quantity, start, end, discount, minTotal } = req.body;
  try {
    const exittingCoupon = await Coupon.findOne({ code });
    if (exittingCoupon) {
      const error = new Error("Coupon already exist");
      error.statusCode = 400;
      return;
    }
    const coupon = await Coupon.create({
        code,
        quantity,
        start,
        end,
        discount,
        minTotal,
    });
    res.status(201).json(coupon);
  } catch (error) {
    next(error);
  }
};
