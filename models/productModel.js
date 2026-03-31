const db = require("../db/db")


//Termék létrehozása
async function createProduct(Product_Name, ProductDescription, ProductPrice, Product_IMG, Subcategory_Id, Stock) {

    const sql = 'INSERT INTO `products`(`Product_Id`, `Product_Name`, `ProductDescription`, `ProductPrice`, `ProductIMG`, `Subcategory_Id`, `Stock`) VALUES (NULL, ?, ?, ?, ?, ?, ?)'
    const [result] = await db.query(sql, [Product_Name, ProductDescription, ProductPrice, Product_IMG, Subcategory_Id, Stock])

    return { insertId: result.insertId }
}

//Termék megkeresése Termék Id alapján
async function findProductById(Product_Id) {

    const sql = 'SELECT * FROM `products` WHERE `Product_Id` = ?'
    const [result] = await db.query(sql, [Product_Id])

    return result
}

//Összes termék lekérése
async function AllProducts() {

    const sql = 'SELECT * FROM `products`'
    const [result] = await db.query(sql)

    return result
}

//Termék törlése
async function productDelete(Product_Id) {

    const sql = 'DELETE FROM `products` WHERE `Product_Id` = ?'
    const [result] = await db.query(sql, [Product_Id])

    return { affectedRows: result.affectedRows }
}

//Termék módosítása
async function productModify(Product_Name, ProductDescription, ProductPrice, ProductIMG, Subcategory_Id, Stock, Product_Id) {

    const sql = 'UPDATE `products` SET `Product_Name`= ?, `ProductDescription`= ?, `ProductPrice`= ?, `ProductIMG`= ?,`Subcategory_Id`= ? ,`Stock`= ? WHERE Product_Id = ?'
    const [result] = await db.query(sql, [Product_Name, ProductDescription, ProductPrice, ProductIMG, Subcategory_Id, Stock, Product_Id])

    return { affectedRows: result.affectedRows }
}



module.exports = { createProduct, findProductById, productDelete, productModify, AllProducts }