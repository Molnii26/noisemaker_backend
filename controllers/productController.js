
const { createProduct, findProductById, productDelete, productModify, AllProducts, } = require('../models/productModel')

//Termék hozzáadása
async function addProduct(req, res) {
   try {

      const { Product_Name, ProductDescription, ProductPrice, Subcategory_Id, Stock } = req.body;


      if (!Product_Name || !ProductDescription) {
         return res.status(400).json({ error: "Minden mezőt tölts ki!" })
      }

      if (!ProductPrice || isNaN(ProductPrice)) {
         return res.status(400).json({ error: "Hibás ár!" })
      }

      if (!Subcategory_Id || isNaN(Subcategory_Id)) {
         return res.status(400).json({ error: "Hibás alkategória!" })
      }

      if (!Stock || isNaN(Stock)) {
         return res.status(400).json({ error: "Hibás készlet!" })
      }

      if (!req.file) {
         return res.status(400).json({ error: "Kép feltöltése kötelező" });
      }

      const ProductIMG = req.file.filename;

      const { insertId } = await createProduct(Product_Name, ProductDescription, ProductPrice, ProductIMG, Subcategory_Id, Stock)

      return res.status(201).json({ message: "Termék sikeresen létrehozva", insertId });

   } catch (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
         return res.status(400).json({ error: "Nem létező alkategória" })
      }
      return res.status(500).json({ error: "Hiba a termék létrehozásánál", err });
   }
}


//Termék lekérése Id alapján
async function getProduct(req, res) {
   try {
      const { Product_Id } = req.params
      if (isNaN(Product_Id)) {
         return res.status(400).json({ error: "Hibás termék id" })
      }
      const result = await findProductById(Product_Id)

      if (result == 0) {
         return res.status(404).json({ error: "Nincs ilyen termék" })
      }
      return res.status(200).json(result);

   } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Hiba a termék lekérdezésénél", err });
   }
}

async function deleteProduct(req, res) {
   try {
      const { Product_Id } = req.params

      if (isNaN(Product_Id)) {
         return res.status(400).json({ error: "Hibás termék id" })
      }
      const result = await productDelete(Product_Id)

      if (result.affectedRows === 0) {
         return res.status(404).json({ error: "Nincs ilyen termék" })
      }
      return res.status(204).send()

   } catch (err) {
      return res.status(500).json({ error: "Hiba a termék törlésnél", err });
   }
}

async function modifyProduct(req, res) {
   try {
      const { Product_Name, ProductDescription, ProductPrice, Subcategory_Id, Stock } = req.body;
      const { Product_Id } = req.params;

      //Így marad meg a régi kép
      let ProductIMG = null;
      if (req.file) {
         ProductIMG = req.file.filename;
      }


      if (Product_Name.trim() === "") {
         return res.status(400).json({ error: "A név nem lehet üres" })
      }

      if (ProductPrice.trim() === "" || isNaN(ProductPrice) || !Number.isInteger(Number(ProductPrice)) || ProductPrice < 0) {
         return res.status(400).json({ error: "Az ár nem lehet üres, illetve pozitív egész szám kell hogy legyen" })
      }

      if (isNaN(Stock) || !Number.isInteger(Number(Stock)) || Stock.trim() === ""  || Stock < 0) {
         return res.status(400).json({ error: "A készlet nem lehet üres, illetve pozitív egész szám kell hogy legyen" })
      }

      if (!Subcategory_Id || isNaN(Subcategory_Id)) {
         return res.status(400).json({ error: "Hibás alkategória!" })
      }


      const result = await productModify(Product_Name, ProductDescription, ProductPrice, ProductIMG, Subcategory_Id, Stock, Product_Id)


      if (result.affectedRows == 0) {
         return res.status(400).json({ error: "Nem létezik ilyen termék" })
      }
      return res.status(200).json({ message: "Sikeres termék módosítás", affectedRows: result.affectedRows });



   } catch (err) {
      if (err.code == "ER_NO_REFERENCED_ROW_2") {
         return res.status(404).json({ error: "Nem létezik ilyen alkategória" })
      }
      return res.status(500).json({ error: "Hiba a termék módosításánál", err });
   }
}

async function getAllProducts(req, res) {
   try {
      const result = await AllProducts()

      return res.status(200).json(result);
   } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Hiba a termékek lekérésénél' })

   }
}

module.exports = { addProduct, getProduct, deleteProduct, modifyProduct, getAllProducts }