const db = require("../db/db")


//Kategória létrehozása
async function createCategory(CategoryName) {

    const sql = 'INSERT INTO `categories`(`Category_Id`, `CategoryName`) VALUES (NULL, ?)'
    const [result] = await db.query(sql, [CategoryName])

    return { insertId: result.insertId }
}

//Alkategória létrehozása
async function createSubcategory(Category_Id, subCategoryName) {

    const sql = 'INSERT INTO `subcategories`(`Subcategory_Id`, `Category_Id`, `Subcategory_Name`) VALUES (NULL, ?, ?)'
    const [result] = await db.query(sql, [Category_Id, subCategoryName])

    return { insertId: result.insertId }
}

//Kategória megkeresése kategória Id alapján
async function findCategoryById(Category_Id) {

    const sql = 'SELECT * FROM `categories` WHERE Category_Id = ?'
    const [result] = await db.query(sql, [Category_Id])

    return result[0] || null
}

//Összes kategória lekérdezése
async function AllCategories() {

    const sql = 'SELECT * FROM `categories`'
    const [result] = await db.query(sql)

    return result[0] || null
}

//Kategória megkeresése alkategória Id alapján
async function findSubcategoryById(Subcategory_Id) {

    const sql = 'SELECT * FROM `subcategories` WHERE `Subcategory_Id`= ?'
    const [result] = await db.query(sql, [Subcategory_Id])

    return result[0] || null
}

//Összes alkategória lekérdezése
async function AllSubcategories() {

    const sql = 'SELECT * FROM `subcategories`'
    const [result] = await db.query(sql)

    return result[0] || null
}

//Alkategória módosítása
async function subcategoryModify(Category_Id, Subcategory_Name, Subcategory_Id) {

    const sql = 'UPDATE `subcategories` SET Category_Id = ?, `Subcategory_Name`= ? WHERE `Subcategory_Id` = ?'
    const [result] = await db.query(sql, [Category_Id, Subcategory_Name, Subcategory_Id])

    return { affectedRows: result.affectedRows }
}

//Kategórianév módosítása
async function categoryNameModify(CategoryName, Category_Id) {

    const sql = 'UPDATE `categories` SET `CategoryName`= ? WHERE  Category_Id = ?'
    const [result] = await db.query(sql, [CategoryName, Category_Id])

    return { affectedRows: result.affectedRows }
}

//Kategória törlése
async function categoryDelete(Category_Id) {

    const sql = 'DELETE FROM categories WHERE `Category_Id` = ?'
    const [result] = await db.query(sql, [Category_Id])

    return { insertId: result.insertId }
}

//Alkategória törlése
async function subcategoryDelete(Subcategory_Id) {

    const sql = 'DELETE FROM subcategories WHERE `Subcategory_Id` = ?'
    const [result] = await db.query(sql, [Subcategory_Id])

    return { insertId: result.insertId }
}



module.exports = { createCategory, createSubcategory, findCategoryById, categoryNameModify, categoryDelete, findSubcategoryById, subcategoryModify, subcategoryDelete, AllCategories, AllSubcategories }
