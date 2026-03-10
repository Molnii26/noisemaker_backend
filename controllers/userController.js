const bcrypt = require("bcrypt")
const { config } = require('../config/dotenvConfig')
const jwt = require('jsonwebtoken')
const { findByEmail, createUser, findByPostalCode, createAdmin } = require('../models/userModel')

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}
//ads
async function register(req, res) {

    try {
        const { username, email, psw } = req.body
        if (!username || !email || !psw) {
            return res.status(400).json({ error: "Minden mezőt tölts ki!" })
        }


        const alreadyExists = await findByEmail(email)
        if (alreadyExists) {
            return res.status(409).json({ error: 'Ezzel az emaillel már regisztráltak' })
        }
        const hash = await bcrypt.hash(psw, 15)

        const { insertId } = await createUser(username, email, hash)


        return res.status(201).json({ message: "Sikeres Regisztráció", insertId })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a regisztrációban", err })
    }

}

async function adminRegister(req, res) {

    try {
        const { username, email, psw } = req.body
        console.log(username, email, psw);
        if (!username || !email || !psw) {
            return res.status(400).json({ error: "Minden mezőt tölts ki!" })
        }
        const alreadyExists = await findByEmail(email)
        if (alreadyExists) {
            return res.status(409).json({ error: 'Ezzel az emaillel már regisztráltak' })
        }
        const hash = await bcrypt.hash(psw, 15)

        const { insertId } = await createAdmin(username, email, hash)

        return res.status(201).json({ message: "Sikeres admin regisztráció", insertId })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba az admin regisztrációban", err })
    }

}



async function login(req, res) {
    try {
        const { email, psw } = req.body
        if (!email || !psw) {
            return res.status(400).json({ error: "Tölts ki minden mezőt" })
        }

        const userSQL = await findByEmail(email)
        if (!userSQL) {
            return res.status(401).json({ error: 'Hibás email' })
        }

        const ok = await bcrypt.compare(psw, userSQL.PSW)
        if (!ok) {
            return res.status(401).json({ error: 'hibás jelszó' })
        }

        const token = jwt.sign({
            id: userSQL.User_Id, username: userSQL.Username, email: userSQL.Email, role: userSQL.User_Role
        },
            config.JWT_SECRET,
            {expiresIn: config.JWT_EXPIRES_IN}
        )

        res.cookie(config.COOKIE_NAME, token, cookieOptions)
        return res.status(200).json({message: 'Sikeres bejelentkezés'})


    } catch (err) {

        console.log(err);
        return res.status(500).json({ error: 'Bejelentkezési hiba', err })
    }

}

async function whoAmI(req, res) {
    try {
        const { id, username, email, role } = req.user

        return res.status(200).json({
            User_Id: id, Username: username, Email: email, User_Role: role
        })

    } catch (err) {
        return res.status(500).json({ error: 'whoAmI szerver oldali hiba', err })
    }
}

async function logout(req, res) {
    return res.clearCookie(config.COOKIE_NAME, { path: '/' }).status(200).json({ message: 'kijelentkezve' })
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
module.exports = { register, adminRegister, login, whoAmI, logout, getCityByPostalCode }