const Cliente = require('../models/Cliente')
const cryptoJs = require('crypto-js')
CHAVE_SECRETA = 'luizaAguiarNamoraComigo'

const logar = async (req, res) => {
    const valores = req.body
    console.log(valores)

    if (!valores.email || !valores.senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    try {
        const cliente = await Cliente.findOne({ where: { email: valores.email } })
        if (!cliente) {
            return res.status(400).json({ message: 'Email inválido!' })
        }

        const bytes = cryptoJs.AES.decrypt(cliente.senha, CHAVE_SECRETA).toString()
        const senhaDescriptografada = bytes.toString(cryptoJs.enc.Utf8)
        console.log('bytes',bytes)
        console.log('descripto',senhaDescriptografada)

        if (valores.senha !== senhaDescriptografada){
            return res.status(400).json({message: 'Senha incorreta'})
        }

        const tempoEmMs = 2*60*60*1000
        const tempoExpira = Date.now() + tempoEmMs

        const payload = {
            idCliente: valores.codCliente,
            nome: valores.nome,
            expiraEm:tempoExpira
        }

        const token  = cryptoJs.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()

        res.status(200).json({ 
            message: 'Cliente logado com sucesso!',
            nome: valores.nome,
            token:token
        })

    } catch (err) {
        res.status(500).json({ message: 'Erro ao logar cliente' })
        console.error('Erro ao logar cliente',err)
    }
}

module.exports = { logar }