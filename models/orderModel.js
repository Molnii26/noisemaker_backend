const db = require("../db/db")


async function createOrder(User_Id,Order_Status, PhoneNumber,Postal_Code, City, StreetHousenumber) {
 

    const sql = `INSERT INTO orders(Order_Id, User_Id, Order_Status, Date, PhoneNumber, Postal_Code, City, StreetHousenumber) VALUES (NULL, ?, 'Pending', current_timestamp(), ?, ?, ?, ?)`
    const [result] = await db.query(sql, [User_Id, Order_Status,PhoneNumber,Postal_Code, City, StreetHousenumber])


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


    return { result }
}

//Összes rendelés lekérdezése (admin)
async function allOrders() {
 
    const sql = 'SELECT * FROM `orders`'
    const [result] = await db.query(sql)

return result
}
//Saját rendelések lekérdezése
async function myOrders(User_Id) {
 
    const sql = 'SELECT * FROM `orders` WHERE User_Id = ?'
    const [result] = await db.query(sql, [User_Id])

return result
}

async function OrderTotal(Order_Id) {
    const sql = 'SELECT SUM(Quantity * OrderPrice) AS TotalPrice FROM order_items WHERE Order_Id = ?'
    const [result] = await db.query(sql, [Order_Id])
    return result[0]
}

async function ModifyStatus(Order_Status, Order_Id) {
    const sql = "UPDATE `orders` SET `Order_Status`= ? WHERE Order_Id = ?"

    const [result] = await db.query(sql, [Order_Status, Order_Id])
    return {affectedRows: result.affectedRows}

}


module.exports= {createOrder, createOrderItems, deleteOrder, allOrders, myOrders, OrderTotal, ModifyStatus}
