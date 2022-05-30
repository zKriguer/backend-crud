//configuração inicial do express
require('dotenv').config();
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = process.env

async function connectDb(){
    await mongoose.connect(`mongodb+srv://${config.user}:${config.password}@cluster0.ygao3.mongodb.net/?retryWrites=true&w=majority`)
}
//caso de erro na conexão // caso a conexão tenha sucesso
connectDb()
.catch(err => {
    throw err
})
.then(() => {
    //entrega uma porta
    const porta = 3030
    app.listen(porta, () => {
        console.log(`Banco de dados conectado com sucesso!!! Escutando porta: ${porta}`)
    })
})

//forma para ler o JSON e enviar 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
//------------------------------------------
//rota incial e END point
app.use('/api', userRoutes)