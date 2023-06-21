class OrdersErrors {
  static async create(req, res, next) {
    const { totalAmount, address, items } = req.body;

    if (!totalAmount || !address || !items) {
      const errorMessage = {
        Message: "Please provide totalAmount, address, items as JSON",
        Example: {
          totalAmount: 100.0,
          address: {
            address: "example",
            street: "example",
            city: "example",
          },
          items: [
            {
              quantity: 3,
              priceAtPurchase: 25.0,
              productId: "productId",
            },
            {
              quantity: 2,
              priceAtPurchase: 25.0,
              productId: "productId",
            },
          ],
        },
      };
      return res.status(400).json(errorMessage);
    }
    return next();
  }
  static async updateOrder(req, res, next) {
    const { id, orderStatus } = req.body;
    if (!id || !orderStatus) {
      const errorMessage = {
        Message: "Please provide id,orderStatus as JSON for admins",
        Example: {
          id: "id of order",
          orderStatus: "  Pending || Shipped || Delivered",
        },
      };
      return res.status(400).json(errorMessage);
    }
    return next();
  }
}
module.exports = {
  OrdersErrors,
};
