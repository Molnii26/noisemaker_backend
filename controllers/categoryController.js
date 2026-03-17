const { createCategory, createSubcategory, findCategoryById, categoryNameModify, categoryDelete, productCheck, subCategoryCheck } = require("../models/categoryModel")


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
async function getCategory(req, res) {
    try {
        const { Category_Id } = req.params

        const result = await findCategoryById(Category_Id)

        if (result == 0) {
            return res.status(400).json({ error: "Nincs ilyen kategória" })
        }
        return res.status(201).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Hiba a kategóriához tartozó itemek lekérdezésénél", err });
    }
}

async function modifyCategoryName(req, res) {
    try {
        const { CategoryName } = req.body
        const { Category_Id } = req.params

        const result = await categoryNameModify(CategoryName, Category_Id)

        if (result == 0) {
            return res.status(400).json({ error: "Nincs ilyen kategória" })
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
        
        if (result == 0) {
            return res.status(400).json({ error: "Nincs ilyen kategória" })
        }

        return res.status(200).json({ message: "Sikeres kategória törlés" })

    } catch (err) {
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({error: "A kategória használatban van, nem törölhető" })
        }
    }
}

module.exports = { addCategory, addSubcategory, getCategory, modifyCategoryName, deleteCategory }