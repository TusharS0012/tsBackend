import Plan from "../models/Planmodel.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().populate("subscription.plan");
  res.json(users);
};

export const createPlan = async (req, res) => {
  const { name, priceMonthly, features } = req.body;
  const plan = await Plan.create({ name, priceMonthly, features });
  res.status(201).json(plan);
};

export const addProduct = async (req, res) => {
  const { name, description, isPremium, availableInPlans } = req.body;
  const product = await Product.create({
    name,
    description,
    isPremium,
    availableInPlans,
  });
  res.status(201).json(product);
};
