const db = require("../db/db")


async function createCategory(CategoryName) {
 

    const sql = 'INSERT INTO `categories`(`Category_Id`, `CategoryName`) VALUES (NULL, ?)'
    const [result] = await db.query(sql, [CategoryName])


    return { insertId: result.insertId }
}

async function createSubcategory(CategoryId, subCategoryName ) {
 
    const sql = 'INSERT INTO `subcategories`(`Subcategory_Id`, `Category_Id`, `Subcategory_Name`) VALUES (NULL, ?, ?)'
    const [result] = await db.query(sql, [CategoryId, subCategoryName])


    return { insertId: result.insertId }
}

module.exports= {createCategory, createSubcategory}
