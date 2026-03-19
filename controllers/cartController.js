
const { createCart, createCartItems, findCartById, findCartItem, updateCartItemQuantity, showCartItems, cartDelete, cartDeleteItems, cartModifyItems } = require("../models/cartModel")


async function addCart(req, res) {

    try {
        const User_Id = req.user.id
        const { Product_Id, Quantity } = req.body


        if (!Product_Id || !Quantity) {
            return res.status(400).json({ error: "Tölts ki minden mezőt" })
        }

        let cart = await findCartById(User_Id)
        let Cart_Id

        if (!cart) {

            const result = await createCart(User_Id)
            Cart_Id = result.insertId

        } else {

            Cart_Id = cart[0].Cart_Id
        }

        const cartItem = await findCartItem(Cart_Id, Product_Id)

        if (cartItem) {

            await updateCartItemQuantity(cartItem.Cart_Item_Id, Quantity)

        } else {

            await createCartItems(Cart_Id, Product_Id, Quantity)

        }

        return res.status(201).json({
            message: "Termék hozzáadva a kosárhoz"
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a kosár hozzáadásnál", err })
    }

}

/* async function addCartItems(req, res) {

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

} */
async function CartItemsShow(req, res) {

    try {
        const User_Id = req.params

        const result = await showCartItems(User_Id)

        if (result == null) {
            return res.status(400).json({ error: "Üres a kosár" })
        }

        return res.status(201).json(result)

    } catch (err) {

        return res.status(500).json({ error: "Hiba a kosár lekérésénél", err })
    }

}

async function deleteCart(req, res) {

    try {

        const User_Id = req.user.id

        const Cart = await findCartById(User_Id)
        const Cart_Id = Cart.Cart_Id
        const result = await cartDelete(Cart_Id)

        if (result == null) {
            return res.status(400).json({ error: "Nincs kosár" })
        }

        return res.status(200).json({ message: "Sikeres kosár törlés" })

    } catch (err) {

        return res.status(400).json({ error: "Hiba a kosár törlésnél" })

    }


}

async function deleteCartItem(req, res) {

    try {

        const { Cart_Item_Id } = req.params

        const result = await cartDeleteItems(Cart_Item_Id)

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Nincs ilyen kosár elem" })
        }

        return res.status(200).json({ message: "Termék törölve a kosárból" })

    } catch (err) {

        console.log(err)

        return res.status(500).json({ error: "Hiba a törlésnél" })

    }

}

async function modifyCartItem(req, res) {

    try {
        const { Cart_Item_Id } = req.params
        const { Quantity } = req.body

        if (!Quantity || Quantity <= 0) {
            return res.status(400).json({
                error: "A mennyiség nem lehet 0 vagy kisebb"
            })
        }

        const result = await cartModifyItems(Quantity, Cart_Item_Id)

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Nincs ilyen kosár elem" })
        }
        return res.status(200).json({ message: "Kosár frissítve" })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Hiba a kosár módosításánál" })
    }

}



module.exports = { addCart, CartItemsShow, deleteCart, deleteCartItem, modifyCartItem }
