const db = require("../db/db")


//Kosár létrehozása
async function createCart(User_Id) {

    const sql = 'INSERT INTO `cart`(`Cart_Id`, `User_Id`) VALUES (NULL, ?)'
    const [result] = await db.query(sql, [User_Id])

    return result[0] || null
}

//Kosár itemek hozzáadása kosár létrehozásánál
async function createCartItems(Cart_Id, Product_Id, Quantity) {

    const sql = 'INSERT INTO `cart_items`(`Cart_Item_Id`, `Cart_Id`, `Product_Id`, `Quantity`) VALUES (NULL, ?, ?, ?)'
    const [result] = await db.query(sql, [Cart_Id, Product_Id, Quantity])

    return result[0] || null
}

//Kosár item megkeresése kosár Id és termék Id alapján
async function findCartItem(Cart_Id, Product_Id) {

    const sql = "SELECT * FROM cart_items WHERE Cart_Id = ? AND Product_Id = ?"
    const [result] = await db.query(sql, [Cart_Id, Product_Id])

    return result[0] || null
}

//Kosár megkeresése felhasználó id alapján
async function findCartById(User_Id) {

    const sql = 'Select * FROM `cart` WHERE User_Id = ?'
    const [result] = await db.query(sql, [User_Id])

    return result[0] || null
}

//Kosár mennyiségének frissítése
async function updateCartItemQuantity(Cart_Item_Id, Quantity) {

    const sql = `UPDATE cart_items SET Quantity = Quantity + ? WHERE Cart_Item_Id = ?`
    const [result] = await db.query(sql, [Quantity, Cart_Item_Id])

    return result[0] || null
}

//Kosár megtekintése
async function showCartItems(User_Id) {
    const sql = "SELECT products.ProductName, products.ProductPrice, cart_items.Quantity FROM cart_items JOIN cart ON cart.Cart_Id = cart_items.Cart_Id JOIN products ON products.Product_Id = cart_items.Product_Id WHERE cart.User_Id = ?"
    const [result] = await db.query(sql, [User_Id])

    return result[0] || null
}

//Kosár törlése
async function cartDelete(Cart_Id) {

    const sql = 'DELETE FROM cart WHERE `Cart_Id` = ?'
    const [result] = await db.query(sql, [Cart_Id])

    return { insertId: result.insertId }
}

//Kosár egy itemének törlése
async function cartDeleteItems(Cart_Item_Id) {

    const sql = 'DELETE FROM cart_items WHERE `Cart_Item_Id` = ?'
    const [result] = await db.query(sql, [Cart_Item_Id])

    return { insertId: result.insertId }
}

//Kosár mennyiségének módosítása
async function cartModifyItems(Quantity, Cart_Item_Id) {

    const sql = 'UPDATE `cart_items` SET `Quantity`= ? WHERE Cart_Item_Id = ?'
    const [result] = await db.query(sql, [Quantity, Cart_Item_Id])

    return { affectedRows: result.affectedRows }
}



module.exports = { createCart, createCartItems, findCartById, findCartItem, updateCartItemQuantity, showCartItems, cartDelete, cartDeleteItems, cartModifyItems }