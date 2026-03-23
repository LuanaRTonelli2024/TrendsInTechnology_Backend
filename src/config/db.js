const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoUri = "mongodb+srv://luanatonelli_db_user:SEKHAo4G1sxU4IvD@cluster0.bp3srrk.mongodb.net/?appName=Cluster0/TrendsBackendAPIs";

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully.");
};

module.exports = { connectDB } //precisa exportar para usar em outros lugares