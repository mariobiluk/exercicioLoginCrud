const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const authMiddleware = require('./middleware/auth.middleware')
const clienteController = require('./controller/cliente.controller')
const authController = require('./controller/auth.controller')
const veiculoController = require('./controller/veiculo.controller')
const hostname = 'localhost'
const PORT = 3000

//middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//rotas publicas

app.post('/cliente', clienteController.cadastrar)
app.post('/veiculo', veiculoController.cadastrar)
app.post('/login', authController.logar)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando!' })
})

//rotas privadas

app.use(authMiddleware)

//server

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Aplicação rodando em: http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro', err)
    })