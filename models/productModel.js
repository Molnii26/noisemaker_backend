const db = require("../db/db")

async function createProduct(Product_Name,ProductDescription, ProductPrice,Product_IMG, Subcategory_Id, Stock) {
    
    const sql = 'INSERT INTO `products`(`Product_Id`, `Product_Name`, `ProductDescription`, `ProductPrice`, `ProductIMG`, `Subcategory_Id`, `Stock`) VALUES (NULL, ?, ?, ?, ?, ?, ?)'
    await db.query(sql, [Product_Name,ProductDescription, ProductPrice,Product_IMG, Subcategory_Id, Stock])
    
const [result] = await db.query(sql, [Product_Name,ProductDescription, ProductPrice, Product_IMG, Subcategory_Id, Stock])


return { insertId: result.insertId }

}



module.exports = {createProduct}