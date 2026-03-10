const db = require("../db/db")


async function createOrder(User_Id, Order_Status,  PhoneNumber,Postal_Code, City, StreetHousenumber) {
 

    const sql = 'INSERT INTO `orders`(`Order_Id`, `User_Id`, `Order_Status`, `Date`, `PhoneNumber`, `Postal_Code`, `City`, `StreetHousenumber`) VALUES (NULL, ?, ?, current_timestamp(), ?, ?, ?, ?)' 
    const [result] = await db.query(sql, [User_Id, Order_Status,  PhoneNumber,Postal_Code, City, StreetHousenumber])


    return { insertId: result.insertId }
}

async function deleteOrder(Order_Id) {

    const sql = 'DELETE FROM orders WHERE `orders`.`Order_Id` = ?'
    const [result] = await db.query(sql, [Order_Id])
    
 
    return { insertId: result.insertId }
}

async function createOrderItems(orderId, productId, quantity, price) {
 
    const sql = 'INSERT INTO `order_items`(`Item_Id`, `Order_Id`, `Product_Id`, `Quantity`, `OrderPrice`) VALUES (NULL, ?, ?, ?, ?)'
    const [result] = await db.query(sql, [orderId, productId, quantity, price])


    return { insertId: result.insertId }
}

module.exports= {createOrder, createOrderItems, deleteOrder}
