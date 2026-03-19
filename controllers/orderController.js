const { createOrder, createOrderItems, deleteOrder, allOrders, myOrders, OrderTotal, ModifyStatus, findByPostalCode } = require('../models/orderModel')


//Rendelés hozzáadása
async function addOrder(req, res) {
    try {
        const User_Id = req.user.id
        const { PhoneNumber, Postal_Code, City, StreetHousenumber, items } = req.body

        if (isNaN(Postal_Code)) {
            return res.status(400).json({ error: "Hibás irányítószám" })
        }
        if (Postal_Code.length < 4 || Postal_Code.length > 4) {
            return res.status(400).json({ error: "Az irányítószám 4 számból kell hogy álljon" })
        }

        if (!PhoneNumber || !Postal_Code || !City || !StreetHousenumber) {
            return res.status(400).json({ error: "Töltsd ki minden mezőt!" })
        }
        const { insertId } = await createOrder(User_Id, PhoneNumber, Postal_Code, City, StreetHousenumber)

        for (const item of items) {

            await createOrderItems(
                insertId,
                item.Product_Id,
                item.Quantity,
                item.OrderPrice
            )

        }

        return res.status(201).json({ message: "Rendelés sikeresen hozzáadva", Order_Id: insertId })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a rendelés hozzáadásnál" })
    }


}
//Rendelés végösszege
async function TotalOrder(req, res) {
    try {

        const { Order_Id } = req.params

        const result = await OrderTotal(Order_Id)

        return res.status(200).json({ Order_Id: Order_Id, totalPrice: result.TotalPrice || 0 })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Hiba a végösszeg lekérésnél" })

    }
}


//Rendelés itemek hozzáadása
/* async function addOrderItems(req, res) {

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

} */

//Rendelés állapot szerkesztés

async function StatusModify(req, res) {
    try {
        const { Order_Status } = req.body
        const { Order_Id } = req.params
        const AllowedStatuses = ["Pending", "En route", "Delivered", "Cancelled"]

        if (!AllowedStatuses.includes(Order_Status)) {
            return res.status(400).json({ error: "Nem megfelelő státusz" })
        }

        if (result.affectedRows===0) {
            return res.status(400).json({error: "Nincs ilyen rendelés"})
        }
        
        const result = await ModifyStatus(Order_Status, Order_Id)

        return res.status(200).json({ message: "Sikeres rendelés állapot módosítás", affectedRows: result.affectedRows })


    } catch (err) {

        return res.status(500).json({ error: "Hiba a stástusz módosításban", err })
    }
}

async function OrderDelete(req, res) {

    try {
        const { Order_Id } = req.params

        if (!Order_Id) {
            return res.status(400).json({ error: "Hibás user id" })
        }

        const delete_order = await deleteOrder(Order_Id)

        if (delete_order === 0) {
            return res.status(400).json({ error: "Nem létező felhasználó" })
        }

        return res.status(201).json({ message: "Sikeres törlés" })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törlésnél", err })
    }
}
//Összes rendelés lekérdezése
async function OrdersAll(req, res) {

    try {
        const result = await allOrders()

        return res.status(200).json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Adatbázis hiba a képek megjelenítésekor' })

    }
}


async function OrdersMine(req, res) {

    try {
        const User_Id = req.user.id;

        const result = await myOrders(User_Id)

        if (result == 0) {
            return res.status(400).json({ error: "Nincsenek rendeléseid" })
        }

        return res.status(200).json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Hiba a rendeléseid lekérésekor' })

    }
}


async function getCityByPostalCode(req, res) {
    try {
        const { postalCode } = req.params

        if (!postalCode) {
            return res.status(400).json({ error: "Hibás irányítószám" })
        }

        if (isNaN(postalCode)) {
            return res.status(400).json({ error: "Irányítószámhoz számot adj meg!" })
        }

        const city = await findByPostalCode(postalCode)

        if (!city) {
            return res.status(404).json({ error: "Nincs ilyen irányítószám" })
        }

        return res.status(200).json({
            postalCode,
            city: city.City
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Hibás irányítószám" })
    }
}

module.exports = { addOrder, TotalOrder, OrderDelete, OrdersAll, OrdersMine, StatusModify, getCityByPostalCode }