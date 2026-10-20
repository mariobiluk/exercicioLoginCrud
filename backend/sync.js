const { Cliente, Veiculo, Agendamento } = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {

    try{
        await conn.sync({force:true})
        console.log('Sincronizando tabelas DB')
    }catch(err){
        console.error('Erro ne')
    }finally{
        await conn.close()
    }
}

syncDataBase()