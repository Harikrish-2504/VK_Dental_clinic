const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!existingAdmin) {
      const admin = new User({
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD, // plain text
        role: "superadmin",
      });

      await admin.save();
      console.log("Admin user created successfully");
      console.log(`Email: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

createAdminUser();
