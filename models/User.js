import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },

    isEmailVerified: { type: Boolean, default: false },
    loginProvider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },

    currentPlan: {
      type: String,
      enum: ["free", "essential", "ultimate", "premium"],
      default: "free",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "cancelled", "expired", "trial"],
      default: "trial",
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlanPurchase",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
