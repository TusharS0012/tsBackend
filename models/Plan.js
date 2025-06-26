import mongoose from "mongoose";
const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priceMonthly: { type: Number, required: true },
  priceYearly: { type: Number, required: false },
  features: [String], // e.g. ['real-time data', 'signals', 'AI insights']
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
