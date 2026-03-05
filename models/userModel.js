const db = require("../db/db")

async function findByEmail(email) {

    const sql = 'SELECT * FROM `users` WHERE `Email` = ?'
    const [result] = await db.query(sql, [email])

    return result[0] || null

}
//Fiók létrehozása
async function createUser(username, email, hash ) {

    const sql = 'INSERT INTO `users`(`User_Id`, `Username`, `Email`, `PSW`, `User_Role`) VALUES (NULL, ?, ?, ?, "User")'
    const [result] = await db.query(sql, [username, email, hash])
 
    return { insertId: result.insertId }
}

//admin fiók létrehozása
async function createAdmin(username, email, hash ) {

    const sql = 'INSERT INTO `users`(`User_Id`, `Username`, `Email`, `PSW`, `User_Role`) VALUES (NULL, ?, ?, ?, "Admin")'
    const [result] = await db.query(sql, [username, email, hash ])
 
    return { insertId: result.insertId }
}

//Irányítószám alapján település
async function findByPostalCode(postalCode) {
    const sql = 'SELECT City FROM postal_codes WHERE Postal_Code_DB = ?'
    const [result] = await db.query(sql, [postalCode])

    return result[0] || null
}



module.exports = { findByEmail, createUser, createAdmin ,findByPostalCode }
