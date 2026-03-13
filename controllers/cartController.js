
const { createCart, createCartItems, showCartItems, findCartItem } = require("../models/cartModel")


async function addCart(req, res) {

    try {
        const { User_Id } = req.user.id
        const { Product_Id, Quantity } = req.body


        if (!Product_Id || !Quantity) {
            return res.status(400).json({ error: "Tölts ki minden mezőt" })
        }

        let cart = await findCartByUserId(User_Id)
        let Cart_Id

        if (!cart) {

            const result = await createCart(User_Id)
            Cart_Id = result.insertId

        } else {

            Cart_Id = cart.Cart_Id

        }

        const cartItem = await findCartItem(Cart_Id, Product_Id)

        if (cartItem) {

            await updateCartItemQuantity(cartItem.CartItem_Id, Quantity)

        } else {

            await createCartItems(Cart_Id, Product_Id, Quantity)

        }

        return res.status(201).json({
            message: "Termék hozzáadva a kosárhoz"
        })

   


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
