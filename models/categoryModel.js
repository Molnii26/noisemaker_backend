const db = require("../db/db")


async function createCategory(CategoryName) {


    const sql = 'INSERT INTO `categories`(`Category_Id`, `CategoryName`) VALUES (NULL, ?)'
    const [result] = await db.query(sql, [CategoryName])


    return { insertId: result.insertId }
}

async function createSubcategory(Category_Id, subCategoryName) {

    const sql = 'INSERT INTO `subcategories`(`Subcategory_Id`, `Category_Id`, `Subcategory_Name`) VALUES (NULL, ?, ?)'
    const [result] = await db.query(sql, [Category_Id, subCategoryName])


    return { insertId: result.insertId }
}

async function findCategoryById(Category_Id) {

    const sql = 'SELECT * FROM `categories` WHERE Category_Id = ?'

    const [result] = await db.query(sql, [Category_Id])


    return result[0] || null

}
async function findSubcategoryById(Subcategory_Id) {

    const sql = 'SELECT * FROM `subcategories` WHERE `Subcategory_Id`= ?'

    const [result] = await db.query(sql, [Subcategory_Id])


    return result[0] || null

}


async function subcategoryNameModify(Subcategory_Name, Subcategory_Id) {

    const sql = 'UPDATE `subcategories` SET `Subcategory_Name`= ? WHERE `Subcategory_Id` = ?'

    const [result] = await db.query(sql, [Subcategory_Name, Subcategory_Id])

    return { affectedRows: result.affectedRows }

}

async function categoryNameModify(CategoryName, Category_Id) {

    const sql = 'UPDATE `categories` SET `CategoryName`= ? WHERE  Category_Id = ?'

    const [result] = await db.query(sql, [CategoryName, Category_Id])

    return { affectedRows: result.affectedRows }

}

async function categoryDelete(Category_Id) {

    const sql = 'DELETE FROM categories WHERE `Category_Id` = ?'

    const [result] = await db.query(sql, [Category_Id])

    return { insertId: result.insertId }

}


module.exports = { createCategory, createSubcategory, findCategoryById, categoryNameModify, categoryDelete, findSubcategoryById, subcategoryNameModify }
