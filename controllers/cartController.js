
const { createCart, createCartItems, showCartItems } = require("../models/cartModel")


async function addCart(req, res) {

    try {
        const { User_Id } = req.body


        if (!User_Id) {
            return res.status(400).json({ error: "Töltsd ki a mezőt!" })
        }
        if (isNaN(User_Id)) {
            return res.status(400).json({ error: "UserId-hoz számot adj meg" })
        }


        const { insertId } = await createCart(User_Id)
        return res.status(201).json({ message: "Sikeres kosár hozzáadás", insertId })

    } catch (err) {

        return res.status(500).json({ error: "Hiba a kosár hozzáadásnál", err })
    }

}

async function addCartItems(req, res) {

    try {
        const { Cart_Id, Product_Id, Quantity } = req.body


        if (!Cart_Id || !Product_Id || !Quantity) {
            return res.status(400).json({ error: "Töltsd ki a mezőt!" })
        }

        const { insertId } = await createCartItems(Cart_Id, Product_Id, Quantity)
        return res.status(201).json({ message: "Sikeres kosár items hozzáadás", insertId })

    } catch (err) {

        return res.status(500).json({ error: "Hiba a kosár items hozzáadásnál", err })
    }

}
async function CartItemsShow(req, res) {

    try {
        const User_Id = req.user.id

        const result = await showCartItems(User_Id)

        if (result == 0) {
            return res.status(400).json({ error: "Üres a kosár" })
        }

        return res.status(201).json(result)

    } catch (err) {

        return res.status(500).json({ error: "Hiba a kosár lekérésénél", err })
    }

}

module.exports = { addCart, addCartItems, CartItemsShow }
