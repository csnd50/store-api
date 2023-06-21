const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "UsersImages");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

class User {
  static async profile(req, res) {
    try {
      const { userId } = req.Payload;
      const profile = await prisma.user.findUnique({
        select: {
          firstName: true,
          lastName: true,
          email: true,
          image: true,
          id: true,
        },
        where: {
          id: userId,
        },
      });
      if (!profile) {
        return res.status(500).json({ Message: "user not found" });
      }
      return res.status(200).json({ profile });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: "Internal error" });
    }
  }
  static async deleteProfile(req, res) {
    const { userId } = req.Payload;
    try {
      const { password } = req.body;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          order: {
            include: {
              OrderItem: true,
            },
          },
          address: true,
        },
      });
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(500).json({ Message: "Invalid password" });
      }
      // Delete associated OrderItems
      await prisma.orderItem.deleteMany({
        where: {
          orderId: {
            in: user.order.map((order) => order.id),
          },
        },
      });
      // Delete associated orders
      await prisma.order.deleteMany({
        where: {
          userId: user.id,
        },
      });
      // Delete associated addresses
      await prisma.address.deleteMany({
        where: {
          userId: user.id,
        },
      });
      // Delete the user
      await prisma.user.delete({
        where: { id: userId },
      });
      return res.status(200).json({ Message: "Account deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: "Internal error" });
    }
  }

  static async updateProfile(req, res) {
    upload.single("image")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ Message: "Multer error" });
      } else if (err) {
        return res.status(500).json({ Message: "Internal error" });
      }
      const { userId } = req.Payload;
      try {
        const { firstName, lastName, email, password } = req.body;
        if (!password) {
          return res
            .status(400)
            .json({ Message: "please enter your password" });
        }
        const imageFile = req.file;
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        const image = imageFile ? imageFile.filename : user.image;
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
          return res.status(500).json({ Message: "Invalid password" });
        }
        const updateProfile = await prisma.user.update({
          data: {
            firstName,
            lastName,
            email,
            image,
          },
          where: { id: userId },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
            email: true,
          },
        });
        return res
          .status(200)
          .json({ Message: "Profile updated successfully", updateProfile });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Internal error" });
      }
    });
  }
}
module.exports = {
  User,
};
