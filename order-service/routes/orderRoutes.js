const express = require("express");
const router = express.Router();
const multer = require("multer");
const Order = require("../models/Order");
const cloudinary = require("../utils/cloudinary");
const fcm = require("../utils/fcm");
const auth = require("../middleware/authMiddleware");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { Readable } = require("stream");

// 🔁 Convert Buffer to Stream
const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// ✅ Cloudinary Upload as Promise
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: `invoices/${Date.now()}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    bufferToStream(fileBuffer).pipe(stream);
  });
};

router.post("/orders", auth, upload.single("invoice"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Invoice file is required" });
    }

    const result = await uploadToCloudinary(file.buffer);

    const newOrder = new Order({
      customerName: req.body.customerName,
      orderAmount: req.body.orderAmount,
      invoiceFileUrl: result.secure_url,
    });

    await newOrder.save();

    await fcm.messaging().send({
      notification: {
        title: "New Order Created",
        body: `Order by ${req.body.customerName}`,
      },
      topic: "orders",
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/orders", auth, async (req, res) => {
  const orders = await Order.find().sort({ orderDate: -1 });
  res.json(orders);
});

router.get("/orders/:id", auth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
});

module.exports = router;
