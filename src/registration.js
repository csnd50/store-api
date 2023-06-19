const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secertkey = process.env.SECERT_KEY;
class Registration {
  static async signUp(req, res) {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const isExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (isExists) {
      return res
        .status(400)
        .json({ Message: "account already exists", account: email });
    }
    try {
      if (password !== confirmPassword) {
        return res.status(400).json({ Message: "please confirm the password" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const createUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashPassword,
        },
      });

      return res
        .status(200)
        .json({ Message: "Account created successfully", createUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: "internal error" });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ Message: "wrong email or password" });
    }
    try {
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return res.status(400).json({ Message: "wrong password" });
      }
      const token = jwt.sign(
        {
          userId: user.id,
          Role: user.role,
        },
        secertkey,
        { expiresIn: "7d" }
      );
      return res
        .status(200)
        .json({ Message: "login successfuly", Token: token });
    } catch (error) {
      console.log(error);
      return res.json({ Message: "internal error" });
    }
  }
  static async checklogin(req, res, next) {
    const headers = req.headers.authorization;
    if (headers) {
      const [bearer, token] = headers.split(" ");
      try {
        const Payload = jwt.verify(token, process.env.SECERT_KEY);
        req.Payload = Payload;
        return next();
      } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
      }
    }

    return res.status(400).json({ message: "Unauthorized" });
  }
  static checkRole(req, res, next) {
    const { Payload } = req;
    if (Payload.Role !== "admin") {
      return res
        .status(400)
        .json({ Message: "Access denied. Only admins access this end-point." });
    }
    return next();
  }
}
module.exports = {
  Registration,
};
