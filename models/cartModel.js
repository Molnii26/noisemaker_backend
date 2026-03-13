const db = require("../db/db")


async function createCart(User_Id) {


    const sql = 'INSERT INTO `cart`(`Cart_Id`, `User_Id`) VALUES (NULL, ?)'
    const [result] = await db.query(sql, [User_Id])


    return { insertId: result.insertId }
}

async function createCartItems(Cart_Id, Product_Id, Quantity) {

    const sql = 'INSERT INTO `cart_items`(`Cart_Item_Id`, `Cart_Id`, `Product_Id`, `Quantity`) VALUES (NULL, ?, ?, ?)'
    const [result] = await db.query(sql, [Cart_Id, Product_Id, Quantity])


    return { insertId: result.insertId }
}

async function showCartItems(User_Id) {

    const sql = 'Select * FROM `cart` WHERE User_Id = ?'
    const [result] = await db.query(sql, [User_Id])


    return result
}

module.exports = { createCart, createCartItems, showCartItems }