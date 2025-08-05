const cron = require("node-cron");
const Order = require("../models/Order");
const cloudinary = require("./cloudinary");
const { Readable } = require("stream");

function bufferToStream(buffer) {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}

function runBackupJob() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const orders = await Order.find();
      const jsonData = JSON.stringify(orders, null, 2);
      const buffer = Buffer.from(jsonData);

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          public_id: `order-logs/order-backup-${Date.now()}`,
          format: "json",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
          } else {
            console.log("📦 Backup uploaded to Cloudinary:", result.secure_url);
          }
        }
      );

      bufferToStream(buffer).pipe(uploadStream);
    } catch (err) {
      console.error("❌ Backup job failed:", err.message);
    }
  });
}

module.exports = runBackupJob;
