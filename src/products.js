const { PrismaClient, Role, status } = require("@prisma/client");
const prisma = new PrismaClient();

class Products{
    static async addProduct(req,res){
        const{name,description,price,quantityInStock}=req.body;
        if(!name ||!description ||!price||!quantityInStock){
            return res.status(400).json({Message:"enter all fields"});
        }
        const item=await prisma.product.findUnique({
            where:{name}
        })
        if(item){
            return res.status(400).json({Message:"Item already exists"});
        }
        try {
            await prisma.product.create({
                data:{
                    name,
                    description,
                    price,
                    quantityInStock
                }
            })
            return res.status(200).json({Message:"Item added successfuly"});
        } catch (error) {
            console.log(error)
            return res.status(500).json({Message:"Internal error"});
        }
    }
    static async updateProduct(req,res){
        const {name,description,price,quantityInStock}=req.body;
        try {
            const Quantity=await prisma.product.findUnique({
                where:{
                    name
                },
            });
            if(!Quantity){
                return res.status(400).json({Message:"Item Not Found"});
            }
            const newQuantity=Quantity.quantityInStock+quantityInStock;
            const updateItem=await prisma.product.update({
                data:{
                    description,
                    price,
                    quantityInStock:newQuantity
                },
                where:{
                    name
                },
            });
            return res.status(200).json({Message:"Item update successfuly",updateItem});
        } catch (error) {
            console.log(error);
            return res.status(500).json({Message:"Internal error"});
        }

    }
    static async deleteProduct(req,res){
        const {name}=req.body;
        
        try {
            const item=await prisma.product.findUnique({
                where:{
                    name
                },
            });
            if(!item){
                return res.status(400).json({Message:"Item Not Found"});
            }
            const deleteItem=await prisma.product.delete({
                where:{
                    name
                },
            })
            return res.status(200).json({Message:"Item delete successfuly",deleteItem});
        } catch (error) {
            console.log(error);
            return res.status(500).json({Message:"Internal error"});
        }
    }
}

module.exports={
    Products
}