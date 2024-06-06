const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllComunicado = async function() {

    try {

        let sql = "select * from tbl_comunicado"

        let rsComunicado = await prisma.$queryRawUnsafe(sql)

        return rsComunicado

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_comunicado where id = ${id}`

        let rsComunicados = await prisma.$queryRawUnsafe(sql)

        return rsComunicados
    
    } catch (error) {

        return false
    }

}

const selectByNameComunicado= async function (titulo) {

    try {
        
        let sql = `select * from tbl_comunicado where titulo like "%${titulo}%"`

        let rsComunicado = await prisma.$queryRawUnsafe(sql)
        

        return rsComunicado

    } catch (error) {
        return false
    }

}

const insertNovoComunicado = async function(dadosComunicado) {
    try {
        
        let sql

        sql = `INSERT INTO tbl_comunicado (titulo, 
                                        conteudo,
                                        data_publicacao,
                                        id_responsavel)
                                     VALUES (
                                         '${dadosComunicado.titulo}',
                                         '${dadosComunicado.conteudo}',
                                         '${dadosComunicado.data_publicacao}',
                                         '${dadosComunicado.id_responsavel}'
                                     )`

        console.log(sql)
        let result = await prisma.$queryRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const updateComunicado = async function () {
    try {

        let sql

        sql = `UPDATE tbl_comunicado SET 
                                titulo = '${dadosComunicado.titulo}',
                                conteudo = '${dadosComunicado.conteudo}',
                                data_publicacao = '${dadosComunicado.data_publicacao}',
                                id_responsavel = '${dadosComunicado.id_responsavel}'
                                WHERE tbl_comunicado.id = '${dadosComunicado.id}`
        

        let result = await prisma.$queryRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }


}

const deleteComunicado = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_comunicado WHERE tbl_comunicado.id = ${id}`
        let rsComunicado = await prisma.$queryRawUnsafe(sql)

        return rsComunicado

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovoComunicado,
    updateComunicado,
    deleteComunicado,
    selectAllComunicado,
    selectById,
    selectByNameComunicado

}