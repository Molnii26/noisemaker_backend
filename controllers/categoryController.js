const { createCategory, createSubcategory } = require("../models/categoryModel")


async function addCategory(req, res) {

    try {
        const { CategoryName } = req.body


        if (!CategoryName) {
            return res.status(400).json({ error: "Töltsd ki a mezőt!" })
        }
        if (!isNaN(CategoryName)) {
            return res.status(400).json({error:"Szám nem lehet kategória"})
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
        const { CategoryId, subCategoryName } = req.body


        if (!CategoryId || !subCategoryName) {
            return res.status(400).json({ error: "Töltsd ki a mezőt!" })
        }
        

       // const alreadyExists = await findByEmail(email)
       // if (alreadyExists) {
       //     return res.status(409).json({ error: 'Ezzel az emaillel már regisztráltak' })
      //  }

        const { insertId } = await createSubcategory(CategoryId, subCategoryName)
        return res.status(201).json({ message: "Sikeres kategória hozzáadás", insertId })

    } catch (err) {
       
        return res.status(500).json({ error: "Hiba a kategória hozzáadásnál", err })
    }

}

module.exports = { addCategory, addSubcategory }