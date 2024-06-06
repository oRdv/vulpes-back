const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllModalidades = async function() {

    try {

        let sql = "select * from tbl_modalidade"

        let rsModalidade = await prisma.$queryRawUnsafe(sql)

        return rsModalidade

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_modalidade where id = ${id}`

        let rsModalidades = await prisma.$queryRawUnsafe(sql)

        return rsModalidades
    
    } catch (error) {

        return false
    }

}

const selectByNameModalidade = async function (nome) {

    try {
        
        let sql = `select * from tbl_modalidade where nome like "%${nome}%"`

        let rsModalidade = await prisma.$queryRawUnsafe(sql)
        

        return rsModalidade

    } catch (error) {
        return false
    }

}

const insertNovaModalidade = async function(dadosDisciplina) {
    try {
        
        let sql

        sql = `INSERT INTO tbl_modalidade (nome)
                                     VALUES (
                                         '${dadosDisciplina.nome}'
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


const updateModalidade = async function () {
    try {

        let sql

        sql = `UPDATE tbl_modalidade SET 
                                nome = '${dadosDisciplina.nome}'
                                WHERE tbl_modalidade.id = '${dadosDisciplina.id}`
        

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

const deleteModalidade = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_modalidade WHERE tbl_modalidade.id = ${id}`
        let rsModalidade = await prisma.$queryRawUnsafe(sql)

        return rsModalidade

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovaModalidade,
    updateModalidade,
    deleteModalidade,
    selectAllModalidades,
    selectById,
    selectByNameModalidade

}