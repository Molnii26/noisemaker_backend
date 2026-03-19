const db = require("../db/db")


//Email megkeresése hogy létezik-e
async function findByEmail(email) {

    const sql = 'SELECT * FROM `users` WHERE `Email` = ?'
    const [result] = await db.query(sql, [email])

    return result[0] || null
}

//Fiók létrehozása
async function createUser(username, email, hash) {

    const sql = 'INSERT INTO `users`(`User_Id`, `Username`, `Email`, `PSW`, `User_Role`) VALUES (NULL, ?, ?, ?, "User")'
    const [result] = await db.query(sql, [username, email, hash])

    return { insertId: result.insertId }
}

//admin fiók létrehozása
async function createAdmin(username, email, hash) {

    const sql = 'INSERT INTO `users`(`User_Id`, `Username`, `Email`, `PSW`, `User_Role`) VALUES (NULL, ?, ?, ?, "Admin")'
    const [result] = await db.query(sql, [username, email, hash])

    return { insertId: result.insertId }
}

//Összes felhasználó lekérése
async function AllUsers() {

    const sql = 'SELECT * FROM `users`'
    const [result] = await db.query(sql)

    return result
}

//Fiók törlése
async function deleteUser(User_Id) {

    const sql = 'DELETE FROM users WHERE `users`.`User_Id` = ?'
    const [result] = await db.query(sql, [User_Id])

    return { insertId: result.insertId }
}

//Fiók szerkesztése
async function modifyUser(Username, Email, User_Id) {
    const sql = 'UPDATE `users` SET `Username`= ?, `Email`= ? WHERE User_Id = ?'
    const [result] = await db.query(sql, [Username, Email, User_Id])

    return { affectedRows: result.affectedRows }
}

//Fiók szerkesztése adminként
async function modifyUserInAdmin(Username, Email, User_Role, User_Id) {

    const sql = 'UPDATE `users` SET `Username`= ?, `Email`= ?, User_Role = ? WHERE User_Id = ?'
    const [result] = await db.query(sql, [Username, Email, User_Role, User_Id])

    return { affectedRows: result.affectedRows }
}



module.exports = { findByEmail, createUser, deleteUser, modifyUser, modifyUserInAdmin, createAdmin, AllUsers }