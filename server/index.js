//Imports
require("dotenv").config()
const app = require("./app")
require("./database")


//Main Function
async function main(){
    await app.listen(app.get('port'))
    console.log("Server started at port "+app.get('port'))
}

//Start Server
main()