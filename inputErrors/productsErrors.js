class ProductsErrors {
  static async products(req, res, next) {
    const { name, description, price, quantityInStock } = req.body;

    if (!name || !description || !price || !quantityInStock) {
      const errorMessage = {
        Message:
          "Please provide name, description, price, quantityInStock   as JSON",
        Example: {
          name: "product",
          description: "product",
          price: 100.0,
          quantityInStock: 5,
        },
      };
      return res.status(400).json(errorMessage);
    }
    return next();
  }
  static async name(req, res, next) {
    const { name, description, price, quantityInStock } = req.body;

    if (!name) {
      const errorMessage = {
        Message: "Please provide name as JSON",
        Example: {
          name: "product",
        },
      };
      return res.status(400).json(errorMessage);
    }
    return next();
  }
}

module.exports = {
  ProductsErrors,
};
