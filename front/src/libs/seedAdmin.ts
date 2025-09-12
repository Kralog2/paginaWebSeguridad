import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function seedAdmin() {
  const adminEmail = "admin@admin.com";
  const adminPassword = "admin123";
  const adminFullname = "Administrador";
  const adminUserType = "admin";

  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await User.create({
      email: adminEmail,
      password: hashedPassword,
      fullname: adminFullname,
      userType: adminUserType,
    });
    console.log("Cuenta de administrador creada:", adminEmail);
  }else{
    console.log("La cuenta de administrador ya existe:");
  }
}