const cryptoJs = require('crypto-js')
CHAVE_SECRETA = 'luizaAguiarNamoraComigo'

function authMiddleware(req, res, next) {

    const token = req.headers['authorization']

    if (!token) {
        return res.status(400).json({ message: 'Acesso inválido!' })
    }

    try {
        const bytes = cryptoJs.AES.decrypt(token, CHAVE_SECRETA).toString()
        const dadosDescriptografados = bytes.toString(cryptoJs.enc.Utf8)

        if (!dadosDescriptografados) {
            return res.status(400).json({ message: 'Token inválido!' })
        }

        const payload = JSON.parse(dadosDescriptografados)

        if (payload.expiraEm < Date.now()) {
            return res.status(400).json({ message: 'Sessão expirada, faça login novamente!' })
        }

        req.usuario = payload

        next()

    } catch (err) {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

module.exports = authMiddleware

