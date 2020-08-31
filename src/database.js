//Imports
const mongoose = require("mongoose")

//Connection
const URI = process.env.MONGODB_URI || "mongodb://localhost/dbtest"

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})

const connection = mongoose.connection

connection.once("open", () => {
    console.log("Database Connected")
})