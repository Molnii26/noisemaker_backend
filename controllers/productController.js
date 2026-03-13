
const { createProduct, findProductById } = require('../models/productModel')


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

async function getProduct(req, res) {
   try {
      const {Product_Id} = req.params


      const result = await findProductById(Product_Id)
if (result==0) {
   return res.status(400).json({error: "Nincs ilyen termék"})
}
     return res.status(201).json(result);

   } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Hiba a termék lekérdezésénél", err });
   }
}


module.exports = { addProduct, getProduct }