const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const dbConnect = require('./dbConnection')


const userRoutes = require('./routes/user')

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));

app.use('/api/v1',userRoutes)

app.get('/',(req,res) => {
    res.send("up and running")
})

const port = process.env.PORT || 4090

app.listen(port,() => {
    dbConnect()
    console.log(`server is up on port ${port}`)
})