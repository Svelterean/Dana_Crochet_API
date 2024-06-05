import logger from  "morgan"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import productsRoutes from "./routes/products.routes.js"
import usersRoutes from "./routes/users.routes.js"
import authJwt from "./helper/jwt.js"
import {errorHandler} from "./helper/error_handler.js"

let PORT = 3000
let app = express()

app.use(cors())
app.options("*", cors())

app.use(express.json())
app.use(logger('dev'))
app.use(authJwt());
app.use(errorHandler)


app.use(productsRoutes)
app.use(usersRoutes)

mongoose.connect(process.env.connection_string)
    .then(() => {
        console.log("Database connection is ready...", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'eshop-database'
        })
    })
    .catch((err) => {
        console.log(err)
    })

    
app.listen(PORT, () => {
    console.log(`Server running on localhost ${PORT}`)
})