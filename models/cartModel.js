const db = require("../db/db")


async function createCart(User_Id) {


    const sql = 'INSERT INTO `cart`(`Cart_Id`, `User_Id`) VALUES (NULL, ?)'
    const [result] = await db.query(sql, [User_Id])


    return result
}

async function createCartItems(Cart_Id, Product_Id, Quantity) {

    const sql = 'INSERT INTO `cart_items`(`Cart_Item_Id`, `Cart_Id`, `Product_Id`, `Quantity`) VALUES (NULL, ?, ?, ?)'
    const [result] = await db.query(sql, [Cart_Id, Product_Id, Quantity])


    return result
}

async function findCartItem(Cart_Id, Product_Id) {

    const sql = "SELECT * FROM cart_items WHERE Cart_Id = ? AND Product_Id = ?"
    const [result] = await db.query(sql, [Cart_Id, Product_Id])

    return result[0]
}

async function findCartById(User_Id) {

    const sql = 'Select * FROM `cart` WHERE User_Id = ?'
    const [result] = await db.query(sql, [User_Id])


    return result
}

async function updateCartItemQuantity(Cart_Item_Id, Quantity) {

    const sql = `UPDATE cart_items SET Quantity = Quantity + ? WHERE CartItem_Id = ?`
    const [result] = await db.query(sql, [Quantity, Cart_Item_Id])

    return result
}

module.exports = { createCart, createCartItems, findCartById, findCartItem, updateCartItemQuantity }