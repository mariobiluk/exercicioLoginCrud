const Veiculo = require('../models/Veiculo')
const cryptoJs = require('crypto-js')
CHAVE_SECRETA = 'luizaAguiarNamoraComigo'

const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.modelo||!valores.marca||!valores.placa||!valores.codigoRastreio||!valores.idCliente){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    try{
        const rastreioCripto = cryptoJs.AES.encrypt(valores.codigoRastreio,CHAVE_SECRETA).toString()

        await Veiculo.create({
            modelo: valores.modelo,
            marca: valores.marca,
            placa: placaCripto,
            codigoRastreio: rastreioCripto,
            idCliente: valores.idCliente,
        })

        res.status(201).json({message: 'veículo cadastrado com sucesso!'})

    }catch(err){
        res.status(500).json({message: 'Erro ao cadastrar veículo'})
    }
}

module.exports = {cadastrar}