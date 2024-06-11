const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllGestao = async function() {

    try {

        let sql = "select * from tbl_gestao"

        let rsGestao = await prisma.$queryRawUnsafe(sql)

        return rsGestao

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_gestao where id = ${id}`

        let rsGestaos = await prisma.$queryRawUnsafe(sql)

        return rsGestaos
    
    } catch (error) {

        return false
    }

}

const selectByNameGestao = async function (nome) {

    try {
        
        let sql = `select * from tbl_gestao where nome like "%${nome}%"`

        let rsGestao = await prisma.$queryRawUnsafe(sql)
        

        return rsGestao

    } catch (error) {
        return false
    }

}

const insertNovaGestao = async function(dadosGestao) {
    try {
        
        let sql

        sql = `INSERT INTO tbl_gestao (nome, 
                                     email,
                                     senha)
                                     VALUES (
                                         '${dadosGestao.nome}',
                                         '${dadosGestao.email}',
                                         '${dadosGestao.senha}'
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


const updateGestao = async function () {
    try {

        let sql

        sql = `UPDATE tbl_gestao SET 
                                nome = '${dadosGestao.nome}',
                                email = '${dadosGestao.email}',
                                senha = '${dadosGestao.senha}'
                                WHERE tbl_gestao.id = '${dadosGestao.id}`
        

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

const deleteGestao = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_gestao WHERE tbl_gestao.id = ${id}`
        let rsGestao = await prisma.$queryRawUnsafe(sql)

        return rsGestao

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovaGestao,
    updateGestao,
    deleteGestao,
    selectAllGestao,
    selectById,
    selectByNameGestao

}