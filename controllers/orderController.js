const { createOrder, createOrderItems, deleteOrder, allOrders, myOrders, OrderTotal, ModifyStatus, findByPostalCode } = require('../models/orderModel')


//Rendelés hozzáadása
async function addOrder(req, res) {
    
    try {
        const User_Id = req.user.id
        const { PhoneNumber, Postal_Code, City, StreetHousenumber, items } = req.body

 const postal = await findByPostalCode(Postal_Code)

        if (!postal) {
            return res.status(400).json({
                error: "Hibás irányítószám"
            })
        }


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
            Number(String(item.ProductPrice).replace(/\s/g, ''))
            await createOrderItems(
                insertId,
                item.Product_Id,
                item.Quantity,
                item.ProductPrice
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
        if (result.TotalPrice == null) {
            return res.status(400).json({ error: "Nincs ilyen rendelés" })
        }

        return res.status(200).json({ Order_Id: Order_Id, totalPrice: result.TotalPrice })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Hiba a végösszeg lekérésnél" })
    }
}

//Rendelés állapot szerkesztés
async function StatusModify(req, res) {

    try {
        const { Order_Status } = req.body
        const { Order_Id } = req.params
        const AllowedStatuses = ["Pending", "En route", "Delivered", "Cancelled"]

        if (!AllowedStatuses.includes(Order_Status)) {
            return res.status(400).json({ error: "Nem megfelelő státusz" })
        }

        const result = await ModifyStatus(Order_Status, Order_Id)

        if (result.affectedRows == 0) {
            return res.status(404).json({ error: "Nincs ilyen rendelés" })
        }

        return res.status(200).json({ message: "Sikeres rendelés állapot módosítás", affectedRows: result.affectedRows })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a stástusz módosításban", err })
    }
}

//Rendelés törlése
async function OrderDelete(req, res) {

    try {
        const { Order_Id } = req.params

        if (isNaN(Order_Id)) {
            return res.status(400).json({ error: "Hibás rendelés id" })
        }
        const result = await deleteOrder(Order_Id)

        if (result.affectedRows == 0) {
            return res.status(404).json({ error: "Nem létező rendelés" })
        }

        return res.status(204).send()

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

//Saját rendelések lekérdezése
async function OrdersMine(req, res) {

    try {
        const User_Id = req.user.id;

        const result = await myOrders(User_Id)

        if (result == 0) {
            return res.status(404).json({ error: "Nincsenek rendeléseid" })
        }

        return res.status(200).json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Hiba a rendeléseid lekérésekor' })

    }
}

//Lekéri a várost irányítószám alapján
async function getCityByPostalCode(req, res) {
    try {
        const { postalCode } = req.params

        if (!postalCode || isNaN(postalCode)) {
            return res.status(400).json({ error: "Hibás irányítószám" })
        }

        const city = await findByPostalCode(postalCode)

        if (!city) {
            return res.status(404).json({ error: "Nincs ilyen irányítószám" })
        }

        return res.status(200).json({ postalCode, city: city.City })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Hibás irányítószám" })
    }
}

module.exports = { addOrder, TotalOrder, OrderDelete, OrdersAll, OrdersMine, StatusModify, getCityByPostalCode }