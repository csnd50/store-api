const express=require("express");
const app =express();
app.use(express.json());
const {Registration}=require("./registration");
const {Products}=require("./products")
const{Order}=require("./orders");
const{User}=require("./profile");
const {Errors}=require("../inputErrors/registrationErrors");
const {ErrorsProfile}=require("../inputErrors/profileErrors");
const{ProductsErrors}=require("../inputErrors/productsErrors");
const{OrdersErrors}=require("../inputErrors/ordersErrors");
const Port =3000;
app.listen(Port,()=>{
    console.log(`app listening on port ${Port}`);
})
//1- signUp
app.post("/signup",Errors.signUp,Registration.signUp);
//2- login 
app.post("/login",Errors.login,Registration.login);
//3- add products for only admin's
app.post("/products/add",Registration.checklogin,Registration.checkRole,ProductsErrors.products,Products.addProduct);
//4- update product
app.put("/products/update",Registration.checklogin,Registration.checkRole,ProductsErrors.products,Products.updateProduct);
//5- delete product
app.delete("/products/delete",Registration.checklogin,Registration.checkRole,ProductsErrors.name,Products.deleteProduct);
//6- create order 
app.post("/orders/create",Registration.checklogin,OrdersErrors.create,Order.createOrder);
//7- get orders
app.get("/orders",Registration.checklogin,Order.getOrders);
//8- update status of order
app.put("/orders/update",Registration.checklogin,Registration.checkRole,OrdersErrors.updateOrder,Order.updateStatusOfOrders);
//9- get products
app.get("/products",Registration.checklogin,Products.getProducts);
//10- get a specific product
app.get("/product",Registration.checklogin,ProductsErrors.name,Products.getProduct);
//11- get a specific order
app.get('/orders/:id',Registration.checklogin,Order.getSpecificOrder);
//12- Get user profile
app.get("/profile",Registration.checklogin,User.profile);
//13- Update user profile
app.put("/profile/update",Registration.checklogin,ErrorsProfile.updateProfile,User.updateProfile);
//14- Delete user account
app.delete("/profile/delete",Registration.checklogin,Errors.login,User.deleteProfile);
//15- Cancel an order
app.put("/orders/cancel/:id",Registration.checklogin,Order.cancelOrder);