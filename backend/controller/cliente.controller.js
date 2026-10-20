const Cliente = require('../models/Cliente')
const cryptoJs = require('crypto-js')
CHAVE_SECRETA = 'luizaAguiarNamoraComigo'

const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.nome||!valores.email||!valores.senha||!valores.cpf||!valores.endereco||!valores.telefone){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'CPF inválido!'})
    }

    try{
        const senhaCripto = cryptoJs.AES.encrypt(valores.senha,CHAVE_SECRETA).toString()
        const cpfCrito = cryptoJs.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto,
            cpf: cpfCrito,
            endereco: valores.endereco,
            telefone: valores.telefone,
        })

        res.status(201).json({message: 'Cliente cadastrado com sucesso!'})

    }catch(err){
        res.status(500).json({message: 'Erro ao cadastrar cliente'})
    }
}

module.exports = {cadastrar}