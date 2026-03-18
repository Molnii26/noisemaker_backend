const { createCategory, createSubcategory, findCategoryById, categoryNameModify, categoryDelete, findSubcategoryById, subcategoryNameModify } = require("../models/categoryModel")


async function addCategory(req, res) {

    try {
        const { CategoryName } = req.body


        if (!CategoryName) {
            return res.status(400).json({ error: "Töltsd ki a mezőt!" })
        }
        if (!isNaN(CategoryName)) {
            return res.status(400).json({ error: "Szám nem lehet kategória" })
        }

        // const alreadyExists = await findByEmail(email)
        // if (alreadyExists) {
        //     return res.status(409).json({ error: 'Ezzel az emaillel már regisztráltak' })
        //  }

        const { insertId } = await createCategory(CategoryName)
        return res.status(201).json({ message: "Sikeres kategória hozzáadás", insertId })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a kategória hozzáadásnál", err })
    }

}

async function addSubcategory(req, res) {

    try {
        const { Category_Id, subCategoryName } = req.body


        if (!Category_Id || !subCategoryName) {
            return res.status(400).json({ error: "Töltsd ki a mezőt!" })
        }

        const { insertId } = await createSubcategory(Category_Id, subCategoryName)
        return res.status(201).json({ message: "Sikeres kategória hozzáadás", insertId })

    } catch (err) {

        return res.status(500).json({ error: "Hiba a kategória hozzáadásnál", err })
    }

}

//Kategóriához tartozó adatok lekérése Id alapján
async function getCategoryItems(req, res) {
    try {
        const { Category_Id } = req.params

        const result = await findCategoryById(Category_Id)

        if (result == null) {
            return res.status(400).json({ error: "Nincs ilyen kategória" })
        }
        return res.status(201).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Hiba a kategóriához tartozó itemek lekérdezésénél", err });
    }
}

//Alkategóriához tartozó adatok lekérése Id alapján
async function getSubcategoryItems(req, res) {
    try {
        const { Subcategory_Id } = req.params

        const result = await findSubcategoryById(Subcategory_Id)

        if (result == null) {
            return res.status(400).json({ error: "Nincs ilyen alkategória" })
        }
        return res.status(201).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Hiba az alkategóriához tartozó itemek lekérdezésénél", err });
    }
}

async function modifySubcategoryName(req, res) {
    try {
        const { Subcategory_Name } = req.body
        const { Subcategory_Id } = req.params

        const result = await subcategoryNameModify(Subcategory_Name, Subcategory_Id)

        if (result.affectedRows===0) {
            return res.status(400).json({error: "Nincs ilyen alkategória"})
        }
        if (!isNaN(Subcategory_Name)) {
            return res.status(400).json({ error: "Alkategórianévhez ne számot adj meg" })
        }

        return res.status(200).json({ message: "Sikeres alkategórianév módosítás", affectedRows: result.affectedRows })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Hiba az Alkategórianév módosításnál", err });
    }
}


async function modifyCategoryName(req, res) {
    try {
        const { CategoryName } = req.body
        const { Category_Id } = req.params

        const result = await categoryNameModify(CategoryName, Category_Id)

        if (result.affectedRows===0) {
            return res.status(400).json({error: "Nincs ilyen kategória"})
        }
        if (!isNaN(CategoryName)) {
            return res.status(400).json({ error: "Kategórianévhez ne számot adj meg" })
        }

        return res.status(200).json({ message: "Sikeres kategórianév módosítás", affectedRows: result.affectedRows })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Hiba a kategórianév módosításnál", err });
    }
}


async function deleteCategory(req, res) {
    try {
        const { Category_Id } = req.params

        const result = await categoryDelete(Category_Id)
        
        if (result == null) {
            return res.status(400).json({ error: "Nincs ilyen kategória" })
        }

        return res.status(200).json({ message: "Sikeres kategória törlés" })

    } catch (err) {
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({error: "A kategória használatban van, nem törölhető" })
        }
    }
}

module.exports = { addCategory, addSubcategory, getCategoryItems, modifyCategoryName, deleteCategory, getSubcategoryItems, modifySubcategoryName }