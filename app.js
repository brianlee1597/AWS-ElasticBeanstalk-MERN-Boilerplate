import express from "express"
import path from "path"
import morgan from "morgan"
import cors from 'cors'
// import mongoose from "mongoose"

const app = express();
const __dirname = path.resolve()

// mongoose.connect("your_api_here", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("MongoDB is connected.")
// })

app.use(morgan('tiny')) 
app.use(express.json()) 
app.use(express.static(path.join(__dirname, 'client/build'))) 
app.use(express.urlencoded({ extended: false }))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

/* ----- REACT SERVE (Make sure this is below all other api routes) ----- */
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

/* ----- DEV ----- */
let port = process.env.PORT || 8080
app.listen(port, () => {
    console.log("Server started successfully on: http://localhost:" + port)
})