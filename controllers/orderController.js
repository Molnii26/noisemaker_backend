const { createOrder, createOrderItems, deleteOrder } = require('../models/orderModel')


//Rendelés hozzáadása
async function addOrder(req, res) {
    try {
        const AllowedStatus = ["Pending", "En route", "Cancelled", "Delivered"]
        const { User_Id, Order_Status, PhoneNumber, Postal_Code, City, StreetHousenumber } = req.body


        if (isNaN(User_Id)) {
            return res.status(400).json({ error: "A userId csak szám lehet" })
        }

        if (isNaN(Postal_Code)) {
            return res.status(400).json({ error: "Hibás irányítószám" })
        }
        if (Postal_Code.length < 4 || Postal_Code.length > 4) {
            return res.status(400).json({ error: "Az irányítószám 4 számból kell hogy álljon" })
        }

        if (!Order_Status || !User_Id || !PhoneNumber || !Postal_Code || !City || !StreetHousenumber) {
            return res.status(400).json({ error: "Töltsd ki minden mezőt!" })
        }

        if (!AllowedStatus.includes(Order_Status)) {
            return res.status(400).json({ error: "Nem megfelelő rendelési állapot" })
        }

        //USER ID VALIDÁLÁS


        const { insertId } = await createOrder(User_Id, Order_Status, PhoneNumber, Postal_Code, City, StreetHousenumber)

        return res.status(201).json({ message: "Rendelés sikeresen hozzáadva", insertId })

    } catch (err) {
        return res.status(500).json({ error: "Hiba a rendelés hozzáadásnál" })
    }


}


//Rendelés itemek hozzáadása
async function addOrderItems(req, res) {

    try {
        const { orderId, productId, quantity, price } = req.body

        if (!quantity || !price || !orderId || !productId) {
            return res.status(400).json({ error: "Minden mezőt tölts ki" })
        }

        if (isNaN(quantity)) {
            return res.status(400).json({ error: "Mennyiségnek számot adj meg" })
        }


        const { insertId } = await createOrderItems(orderId, productId, quantity, price)

        return res.status(201).json({ message: "Rendelés itemek hozzáadva", insertId })

    } catch (error) {
        return res.status(500).json({ error: "Hiba a rendelés items hozzáadásnál" })

    }

}

//Rendelés törlése
async function OrderDelete(req, res) {

    try {
        const { Order_Id } = req.params

        if (!Order_Id) {
            return res.status(400).json({ error: "Hibás user id" })
        }

        const delete_user = await deleteOrder(User_Id)

        if (delete_user === 0) {
            return res.status(400).json({ error: "Nem létező felhasználó" })
        }

        return res.status(201).json({ message: "Sikeres törlés" })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törlésnél", err })
    }
}

module.exports = { addOrder, addOrderItems, OrderDelete }