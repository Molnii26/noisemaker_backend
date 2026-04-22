const {config} = require('./config/dotenvConfig')
const app = require("./app")

const PORT = config.PORT
const HOST = config.HOST


app.listen(PORT, () =>{
    console.log(`IP: ${HOST}`);
})
