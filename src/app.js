const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());

// Import routes
const mappingsRoutes = require("./routes/mappings");
const authRoutes = require("./routes/auth");
const syncRoutes = require("./routes/sync");

// Use routes
app.use("/mappings", mappingsRoutes);
app.use("/auth", authRoutes);
app.use("/sync", syncRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
