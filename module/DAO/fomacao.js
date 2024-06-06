const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllFormacao = async function() {

    try {

        let sql = "select * from tbl_formacao"

        let rsFormacao = await prisma.$queryRawUnsafe(sql)

        return rsFormacao

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_formacao where id = ${id}`

        let rsModalidades = await prisma.$queryRawUnsafe(sql)

        return rsModalidades
    
    } catch (error) {

        return false
    }

}


const insertNovaFormacao = async function(dadosFormacao) {
    try {
        
        let sql

        sql = `INSERT INTO tbl_formacao (universidade,
                                         curso)
                                     VALUES (
                                         '${dadosFormacao.universidade}',
                                         '${dadosFormacao.curso}'

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


const updatFormacao = async function () {
    try {

        let sql

        sql = `UPDATE tbl_formacao SET 
                                      universidade = '${dadosFormacao.universidade}',
                                      curso = '${dadosFormacao.curso}'
                                WHERE tbl_formacao.id = '${dadosFormacao.id}`
        

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

const deleteFormacao = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_formacao WHERE tbl_formacao.id = ${id}`
        let rsFormacao = await prisma.$queryRawUnsafe(sql)

        return rsFormacao

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovaFormacao,
    updatFormacao,
    deleteFormacao,
    selectAllFormacao,
    selectById
    

}