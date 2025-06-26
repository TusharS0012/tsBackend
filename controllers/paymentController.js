import { razorpay } from "../utils/razorpay";
import crypto from "crypto";
import Plan from "../models/plan.model";
import User from "../models/user.model";
import Subscription from "../models/subscription.model";

export const createOrder = async (req, res) => {
  const { planId } = req.body;
  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ message: "Plan not found" });

  const options = {
    amount: plan.priceMonthly * 100, // Amount in cents
    currency: "USD",
    receipt: `order_rcptid_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);
  res.json(order);
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const user = await User.findById(req.user._id);
    user.subscription = {
      plan: planId,
      status: "active",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    await user.save();
    return res.json({ success: true });
  }

  res
    .status(400)
    .json({ success: false, message: "Invalid payment signature" });
};
