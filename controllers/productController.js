
const { createProduct, findProductById, productDelete, productModify, AllProducts } = require('../models/productModel')

//Termék hozzáadása
async function addProduct(req, res) {
   try {
      const { Product_Name, ProductDescription, ProductPrice, Subcategory_Id, Stock } = req.body;
      const ProductIMG = req.file.filename;

      if (!Product_Name || !ProductDescription) {
         return res.status(400).json({ error: "Minden mezőt tölts ki!" })
      }
      if (ProductPrice === undefined || isNaN(ProductPrice)) {
         return res.status(400).json({ error: "Hibás ár!" })
      }
      if (Subcategory_Id === undefined || isNaN(Subcategory_Id)) {
         return res.status(400).json({ error: "Hibás alkategória!" })
      }
      if (Stock === undefined || isNaN(Stock)) {
         return res.status(400).json({ error: "Hibás készlet!" })
      }

      if (!req.file) {
         return res.status(400).json({ error: "Kép feltöltése kötelező" });
      }

      const { insertId } = await createProduct(Product_Name, ProductDescription, ProductPrice, ProductIMG, Subcategory_Id, Stock)

      res.status(201).json({ message: "Termék sikeresen létrehozva", insertId });

   } catch (err) {
      res.status(500).json({ error: "Hiba a termék létrehozásánál", err });
   }
}


//Termék lekérése Id alapján
async function getProduct(req, res) {
   try {
      const { Product_Id } = req.params


      const result = await findProductById(Product_Id)
      if (result == 0) {
         return res.status(400).json({ error: "Nincs ilyen termék" })
      }
      return res.status(201).json(result);

   } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Hiba a termék lekérdezésénél", err });
   }
}

async function deleteProduct(req, res) {
   try {
      const { Product_Id } = req.params


      const result = await productDelete(Product_Id)
      if (result == 0) {
         return res.status(400).json({ error: "Nincs ilyen termék" })
      }
      return res.status(201).json({ message: "Sikeres termék törlés" });

   } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Hiba a termék törlésnél", err });
   }
}

async function modifyProduct(req, res) {
   try {
      const { Product_Name, ProductDescription, ProductPrice, Subcategory_Id, Stock } = req.body;

      const { Product_Id } = req.params;
      let ProductIMG = null;

      if (req.file) {
         ProductIMG = req.file.filename;
      }

      const result = await productModify(Product_Name, ProductDescription, ProductPrice, ProductIMG, Subcategory_Id, Stock, Product_Id)


      if (result.affectedRows === 0) {
         return res.status(400).json({ error: "Nincs ilyen termék" })
      }
      return res.status(201).json({ message: "Sikeres termék módosítás", affectedRows: result.affectedRows });

   } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Hiba a termék módosításánál", err });
   }
}

async function getAllProducts(req, res) {
   try {
      const result = await AllProducts()

      return res.status(201).json({ result });
   } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Hiba a termékek lekérésénél' })

   }
}

module.exports = { addProduct, getProduct, deleteProduct, modifyProduct, getAllProducts }