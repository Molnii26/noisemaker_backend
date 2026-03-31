const bcrypt = require("bcrypt")
const { config } = require('../config/dotenvConfig')
const jwt = require('jsonwebtoken')
const { findByEmail, createUser, createAdmin, modifyUser, modifyUserInAdmin, deleteUser, AllUsers } = require('../models/userModel')

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

async function getAllUsers(req, res) {
    try {
        const result = await AllUsers()

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Hiba a termékek lekérésénél' })

    }
}

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
        return res.status(500).json({ error: "Hiba a regisztrációban", err })
    }

}

async function adminRegister(req, res) {

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
        const { insertId } = await createAdmin(username, email, hash)

        return res.status(201).json({ message: "Sikeres admin regisztráció", insertId })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba az admin regisztrációban", err })
    }

}

async function userDelete(req, res) {

    try {
        const { User_Id } = req.params

        if (isNaN(User_Id)) {
            return res.status(400).json({ error: "Hibás felhasználó id" })
        }

        const result = await deleteUser(User_Id)

        if (result.affectedRows == 0) {
            return res.status(400).json({ error: "Nincs ilyen felhasználó" })
        }

        return res.status(204).send()

    } catch (err) {
        return res.status(500).json({ error: "Hiba a törlésnél", err })
    }

}

async function userModifyInAdmin(req, res) {

    try {

        const { username, email, User_Role } = req.body
        const { User_Id } = req.params
        const AllowedRoles = ["Admin", "User"]

        if (!username || !email) {
            return res.status(400).json({ error: "Minden mezőt tölts ki!" })
        }
        if (isNaN(User_Id)) {
            return res.status(400).json({ error: "Hibás felhasználó id" })
        }


        if (!AllowedRoles.includes(User_Role)) {
            return res.status(400).json({ error: 'Csak Admin vagy User lehet a role' })
        }

        const alreadyExists = await findByEmail(email)
        if (alreadyExists && alreadyExists.User_Id != User_Id) {
            return res.status(409).json({ error: 'Ez az email már foglalt' })
        }

        const result = await modifyUserInAdmin(username, email, User_Role, User_Id)
        if (result.affectedRows == 0) {
            return res.status(400).json({ error: "Nincs ilyen felhasználó" })
        }

        return res.status(200).json({ message: "Sikeres felhasználó módosítás", affectedRows: result.affectedRows })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a felhasználó módosításban", err })
    }

}

async function userModify(req, res) {

    try {
        const { username, email } = req.body
        const { User_Id } = req.params
        if (!username || !email) {
            return res.status(400).json({ error: "Minden mezőt tölts ki!" })
        }

        const alreadyExists = await findByEmail(email)

        if (alreadyExists && alreadyExists.User_Id != User_Id) {
            return res.status(409).json({ error: 'Ez az email már foglalt' })
        }

        const result = await modifyUser(username, email, User_Id)
        if (isNaN(User_Id)) {
            return res.status(400).json({ error: "Hibás felhasználó id" })
        }

        if (result.affectedRows == 0) {
            return res.status(400).json({ error: "Nincs ilyen felhasználó" })
        }
        return res.status(200).json({ message: "Sikeres felhasználó módosítás", affectedRows: result.affectedRows })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a felhasználó módosításban", err })
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
            { expiresIn: config.JWT_EXPIRES_IN }
        )

        res.cookie(config.COOKIE_NAME, token, cookieOptions)
        return res.status(201).json({ message: 'Sikeres bejelentkezés' })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Bejelentkezési hiba', err })
    }

}

async function whoAmI(req, res) {
    try {
        const { id, username, email, role } = req.user

        return res.status(200).json({User_Id: id, Username: username, Email: email, User_Role: role
        })

    } catch (err) {
        return res.status(500).json({ error: 'whoAmI szerver oldali hiba', err })
    }
}


async function logout(req, res) {
    return res.clearCookie(config.COOKIE_NAME, { path: '/' }).status(200).json({ message: 'kijelentkezve' })
}





module.exports = { register, adminRegister, userDelete, userModify, userModifyInAdmin, login, whoAmI, logout, getAllUsers }