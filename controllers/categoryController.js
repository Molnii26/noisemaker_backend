const { findByCategoryName, createCategory, createSubcategory, findCategoryById, categoryNameModify, categoryDelete, findSubcategoryById, subcategoryModify, subcategoryDelete, AllCategories, AllSubcategories, findBySubcategoryName } = require("../models/categoryModel")

//Kategória hozzáadása
async function addCategory(req, res) {

    try {
        const { CategoryName } = req.body

        if (!CategoryName) {
            return res.status(400).json({ error: "Töltsd ki a mezőt!" })
        }
        if (!isNaN(CategoryName)) {
            return res.status(400).json({ error: "Szám nem lehet kategória" })
        }

        const alreadyExists = await findByCategoryName(CategoryName)
        if (alreadyExists) {
            return res.status(409).json({ error: 'Már van ilyen kategória' })
        }

        const { insertId } = await createCategory(CategoryName)
        return res.status(201).json({ message: "Sikeres kategória hozzáadás", insertId })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a kategória hozzáadásnál", err })
    }

}

//Alkategória hozzáadása
async function addSubcategory(req, res) {

    try {
        const { Category_Id, Subcategory_Name } = req.body

        if (!Category_Id || !Subcategory_Name) {
            return res.status(400).json({ error: "Töltsd ki a mezőt!" })
        }

        const alreadyExists = await findBySubcategoryName(Subcategory_Name)
        if (alreadyExists) {
            return res.status(409).json({ error: 'Már van ilyen alkategória' })
        }

        const { insertId } = await createSubcategory(Category_Id, Subcategory_Name)
        return res.status(201).json({ message: "Sikeres alkategória hozzáadás", insertId })

    } catch (err) {

        return res.status(500).json({ error: "Hiba a alkategória hozzáadásnál", err })
    }

}

//Kategória lekérdezése id alapján
async function getCategoryItems(req, res) {
    try {
        const { Category_Id } = req.params

        if (isNaN(Category_Id)) {
            return res.status(400).json({ error: "Hibás kategória id" })
        }

        const result = await findCategoryById(Category_Id)

        if (result == null) {
            return res.status(400).json({ error: "Nincs ilyen kategória" })
        }
        return res.status(200).json(result);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Hiba a kategóriához tartozó itemek lekérdezésénél", err })
    }
}

//Összes kategória lekérdezése
async function getCategoryAll(req, res) {
    try {
        const result = await AllCategories()

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Hiba a kategóriák lekérésénél' })

    }
}

//Alkategóriához tartozó adatok lekérése Id alapján
async function getSubcategoryItems(req, res) {
    try {
        const { Subcategory_Id } = req.params

        if (isNaN(Subcategory_Id)) {
            return res.status(404).json({ error: "Hibás alkategória id" })
        }
        const result = await findSubcategoryById(Subcategory_Id)

        if (result == null) {
            return res.status(400).json({ error: "Nincs ilyen alkategória" })
        }
        return res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Hiba az alkategóriához tartozó itemek lekérdezésénél", err });
    }
}

//Összes alkategória lekérdezése
async function getSubcategoryAll(req, res) {
    try {
        const result = await AllSubcategories()

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Hiba a kategóriák lekérésénél' })

    }
}

//Alkategória módosítása
async function modifySubcategory(req, res) {
    try {
        const { Category_Id, Subcategory_Name } = req.body
        const { Subcategory_Id } = req.params


        if (!isNaN(Subcategory_Name)) {
            return res.status(400).json({ error: "Alkategórianévhez ne számot adj meg" })
        }


        const result = await subcategoryModify(Subcategory_Name, Category_Id, Subcategory_Id)
        if (result.affectedRows == 0) {
            return res.status(400).json({ error: "Nincs ilyen kategória vagy alkategória" })
        }

        return res.status(200).json({ message: "Sikeres alkategórianév módosítás", affectedRows: result.affectedRows })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Hiba az Alkategórianév módosításnál", err });
    }
}

//Alkategória törlése
async function deleteSubcategory(req, res) {
    try {
        const { Subcategory_Id } = req.params

        if (isNaN(Subcategory_Id)) {
            return res.status(400).json({ error: "Hibás alkategória id" })
        }
        const result = await subcategoryDelete(Subcategory_Id)

        if (result.affectedRows == 0) {
            return res.status(404).json({ error: "Nincs ilyen alkategória" })
        }
        return res.status(204).send()

    } catch (err) {
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({ error: "Az alkategória használatban van, nem törölhető" })
        }
    }
}

//Kategórianév módosítása
async function modifyCategoryName(req, res) {
    try {
        const { CategoryName } = req.body
        const { Category_Id } = req.params

        const alreadyExists = await findByCategoryName(CategoryName)
        if (alreadyExists) {
            return res.status(409).json({ error: 'Ez a kategórianév már létezik' })
        }

        if (!isNaN(CategoryName)) {
            return res.status(400).json({ error: "Kategórianévhez számot nem adhatsz meg" })
        }

        const result = await categoryNameModify(CategoryName, Category_Id)

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "Nincs ilyen kategória" })
        }

        return res.status(200).json({ message: "Sikeres kategórianév módosítás", affectedRows: result.affectedRows })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Hiba a kategórianév módosításnál", err });
    }
}

//Kategória törlése
async function deleteCategory(req, res) {
    try {
        const { Category_Id } = req.params

        if (isNaN(Category_Id)) {
            return res.status(404).json({ error: "Hibás kategória id" })
        }
        const result = await categoryDelete(Category_Id)

        if (result.affectedRows == 0) {
            return res.status(400).json({ error: "Nincs ilyen kategória" })
        }

        return res.status(204).send()

    } catch (err) {
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({ error: "A kategória használatban van, nem törölhető" })
        }
    }
}

module.exports = { addCategory, addSubcategory, getCategoryItems, modifyCategoryName, deleteCategory, getSubcategoryItems, modifySubcategory, deleteSubcategory, getCategoryAll, getSubcategoryAll }