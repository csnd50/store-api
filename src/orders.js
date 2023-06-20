const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Order {
  static async createOrder(req, res) {
    try {
      const { totalAmount, address, items } = req.body;
      const { userId } = req.Payload;
      console.log(userId);

      // Create the address in the database
      const createdAddress = await prisma.address.create({
        data: {
          address: address.address,
          street: address.street,
          city: address.city,
          userId,
        },
      });

      // Create the order in the database
      const order = await prisma.order.create({
        data: {
          totalAmount,
          addressId: createdAddress.id,
          userId,
          OrderItem: {
            create: items.map((item) => ({
              quantity: item.quantity,
              priceAtPurchase: item.priceAtPurchase,
              productId: item.productId, // Use productId instead of name
            })),
          },
        },
        include: {
          shippedAddress: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          OrderItem: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update the orderId in OrderItem with the generated orderId
      const updatedOrderItems = await Promise.all(
        order.OrderItem.map(async (item) => {
          const updatedItem = await prisma.orderItem.update({
            where: { id: item.id },
            data: { orderId: order.id },
          });
          return updatedItem;
        })
      );
            // Update the quantityInStock of products
    const updatedProducts = await Promise.all(
        updatedOrderItems.map(async (item) => {
          const updatedProduct = await prisma.product.update({
            where: { id: item.productId },
            data: {
              quantityInStock: {
                decrement: item.quantity, // Decrement the quantity by the ordered quantity
              },
            },
          });
          return updatedProduct;
        })
      );
      order.OrderItem = updatedOrderItems;
    
      res.json(order);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the order." });
    }
  }
  static async getOrders(req,res){
    const { userId } = req.Payload;
    console.log(userId);
try {
    const orders=await prisma.order.findMany({

        include: {
            shippedAddress: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            OrderItem: {
              include: {
                product: true,
              },
            },
          },
          where:{userId},

    });
    return res.status(200).json({orders})
} catch (error) {
    console.log(error);
    return res.status(500).json({Message:"Internal error"})
}
  }
  static async updateStatusOfOrders(req,res){
    const{id,orderStatus}=req.body;
    try {
      const update=await prisma.order.update({
        where:{id},
        data:{orderStatus}
      })
      return res.status(200).json({Message:"status update successfuly",update})
    } catch (error) {
      console.log(error);
      return res.status(500).json({Message:"Internal Error"});
    }
  }
  static async getSpecificOrder(req, res) {
    const { id } = req.params;
    const { userId } = req.Payload;
    console.log(userId,id);
  
    try {
      const order = await prisma.order.findUnique({
        where: {
          id: id,
        },
        include: {
          shippedAddress: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          OrderItem: {
            include: {
              product: true,
            },
          },
        },
      });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Check if the retrieved order belongs to the authenticated user
      if (order.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized access to order" });
      }
  
      return res.status(200).json({ order });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }
  static async cancelOrder(req, res) {
    const { id } = req.params;
    try {
      const canceledOrder = await prisma.order.update({
        where: { id },
        data: { orderStatus: 'Canceled' },
        include: {
          OrderItem: {
            include: {
              product: true,
            },
          },
        },
      });
  
      if (!canceledOrder.canUpdate) {
        return res.status(401).json({ Message: "You have already canceled the order" });
      }
  
      await prisma.order.update({
        where: { id },
        data: { canUpdate: false },
      });
  
      const canceledProducts = canceledOrder.OrderItem.map(async (item) => {
        const updatedProduct = await prisma.product.update({
          where: { id: item.product.id },
          data: { quantityInStock: { increment: item.quantity } },
        });
  
        return {
          productId: updatedProduct.id,
          quantityInStock: updatedProduct.quantityInStock,
        };
      });
  
      const productsWithUpdatedQuantity = await Promise.all(canceledProducts);
  
      return res.status(200).json({
        Message: 'Order canceled successfully',
        canceledOrder: {
          orderId: canceledOrder.id,
          canceledProducts: productsWithUpdatedQuantity,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Message: 'Internal error' });
    }
  }
  
  
  
  
  
}

module.exports = {
  Order,
};
