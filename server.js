const {config} = require('./config/dotenvConfig')
const app = require("./app")

const PORT = config.PORT
const HOST = config.HOST
//teszt

app.listen(PORT, HOST, () =>{
    console.log(`IP: http://${HOST}:${PORT}`);
})
