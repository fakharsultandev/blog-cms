import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving
adminSchema.pre("save", async function (next) {
  const admin = this;

  if (admin.isModified("password") || admin.isNew) {
    try {
      const hash = await bcrypt.hash(admin.password, 10);
      admin.password = hash;
      next();
    } catch (err: any) {
      return next(err);
    }
  } else {
    next();
  }
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function (password: string) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw new Error("Password comparison failed");
  }
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
