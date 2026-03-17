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


    return result[0] || null
}

async function updateCartItemQuantity(Cart_Item_Id, Quantity) {

    const sql = `UPDATE cart_items SET Quantity = Quantity + ? WHERE Cart_Item_Id = ?`
    const [result] = await db.query(sql, [Quantity, Cart_Item_Id])

    return result
}

async function showCartItems(User_Id) {
    const sql = "SELECT products.ProductName, products.ProductPrice, cart_items.Quantity FROM cart_items JOIN cart ON cart.Cart_Id = cart_items.Cart_Id JOIN products ON products.Product_Id = cart_items.Product_Id WHERE cart.User_Id = ?"
    const [result] = await db.query(sql, [User_Id])

    return result
}

module.exports = { createCart, createCartItems, findCartById, findCartItem, updateCartItemQuantity, showCartItems }