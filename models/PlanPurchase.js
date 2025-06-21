const mongoose = require("mongoose");

const planPurchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: {
      type: String,
      enum: ["essential", "ultimate", "premium"],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "paypal", "coupon"],
      required: true,
    },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PlanPurchase", planPurchaseSchema);
