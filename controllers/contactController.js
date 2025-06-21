const ContactMessage = require("../models/ContactMessage");

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      phone,
      message,
    });

    res
      .status(201)
      .json({ message: "Query submitted successfully.", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};
