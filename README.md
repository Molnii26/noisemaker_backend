# Noisemaker Dokumentáció
## Készítette: <br/>
#### - **Májer Antal:** *(Backend, mySQL adatbázis)* [Backend](https://github.com/Molnii26/noisemaker_backend) <br/> 
#### - **Molnár Ádám:** *(Frontend)* [Frontend](https://github.com/Molnii26/noisemaker_frontend)
---
### A projekt <br/>
> A noisemaker egy webshop ahol különböző hangszereket tudsz vásárolni. Pengetős, Billentyűs, Ütős, Fúvós hangszereket. Ezeken kategóriákon belül a következőket veheted: Akusztikus Gitár, Elektromos gitár
Basszusgitár, Zongora, Szintetizátor, MIDI keyboard, Dob szett, Cintányér, Szaxofon, Trombita, Fuvola. A termékeket különféle módon szűrheted, majd miután kosárba tetted amit szeretnél, megrendelheted.
---
#### Projekt elindítása
`npm install` vagy `npm i` (Ezt csak ha még nem tölötted le a csomagokat) <br/>
`npm run dev` (Ezzel elindul a projekt)


## A projekt felépítése:
```bash
BACKEND
├── config
│   └── dotenvConfig.js
├── controllers
│   ├── cartControllers.js
│   ├── categoryController.js
│   ├── orderControllers.js
│   ├── productControllers.js
│   └── userController.js
├── middleware
│   ├── uploadProductIMG.js
│   ├── userMiddleware.js
├── models
│   ├── categoryModel.js
│   ├── orderModel.js
│   ├── productModel.js
│   ├── userModel.js
├── routes
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   ├── productsRoutes.js
│   └── userRoutes.js
├── .gitignore.json
├── app.js
├── package.json
├── server.js
└── README.md
```
## Adatbázis
<img width="1308" height="659" alt="image" src="https://github.com/user-attachments/assets/ebb98136-b424-4b7a-9ca6-f03935816443" />


## Postman-tesztek
[Megtekintés](https://documenter.getpostman.com/view/48108279/2sBXqJJzuu#8d2f2e16-8cc8-4c12-9cb8-9a715b535f26)

#### Felhasznált csomagok
- bcryptjs
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- multer
- mysql2
- nodemon

```bash
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cloudinary": "^2.9.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "multer": "^2.1.0",
    "mysql2": "^3.17.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
```
#### Felhasznált eszközök
- [Visual Studio Code](https://code.visualstudio.com)
- [Postman](https://www.postman.com)
- [DrawSQL](https://drawsql.app/login)
- [ChatGPT](https://chatgpt.com)
- [NPM](https://www.npmjs.com)
- [GitHub](https://github.com)
- [PhpMyAdmin](https://www.phpmyadmin.net)


