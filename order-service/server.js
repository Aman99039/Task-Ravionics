const app = require("./app");
const runBackupJob = require("./utils/backupJob");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  runBackupJob(); // 🔁 Start backup scheduler
});
