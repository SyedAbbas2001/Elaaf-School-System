// Use: node --env-file=.env.local scripts/create-teacher.mjs "Naam" email password [admin]
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const [, , name, email, password, role = "teacher"] = process.argv;
if (!name || !email || !password) {
  console.log('Use: node --env-file=.env.local scripts/create-teacher.mjs "Naam" email password [admin]');
  process.exit(1);
}
await mongoose.connect(process.env.MONGODB_URI);
await mongoose.connection.collection("users").updateOne(
  { email: email.toLowerCase() },
  {
    $set: { name, email: email.toLowerCase(), passwordHash: await bcrypt.hash(password, 10), role, updatedAt: new Date() },
    $setOnInsert: { createdAt: new Date() },
  },
  { upsert: true }
);
console.log("Teacher ready:", email, "(" + role + ")");
await mongoose.disconnect();
