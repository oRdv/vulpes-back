const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllResponsaveis = async function() {

    try {

        let sql = "select * from tbl_responsavel"

        let rsResponsavel = await prisma.$queryRawUnsafe(sql)

        return rsResponsavel

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_responsavel where id = ${id}`

        let rsResponsavels = await prisma.$queryRawUnsafe(sql)

        return rsResponsavels
    
    } catch (error) {

        return false
    }

}

const selectByNameResponsavel = async function (nome) {

    try {
        
        let sql = `select * from tbl_responsavel where nome like "%${nome}%"`

        let rsResponsavel = await prisma.$queryRawUnsafe(sql)
        

        return rsResponsavel

    } catch (error) {
        return false
    }

}

const insertNovoResponsavel = async function(dadosResponsavel) {
    try {
        
        const sql = `INSERT INTO tbl_responsavel (nome, 
                                                 email,
                                                 senha,
                                                id_aluno)
            VALUES (
                "${dadosResponsavel.nome}",
                "${dadosResponsavel.email}",
                "${dadosResponsavel.senha}",
                "${dadosResponsavel.id_aluno}"
                )`

                
                const result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            
            const insertResponsavel = await prisma.$queryRaw`SELECT * FROM tbl_responsavel WHERE id = (SELECT MAX(id) FROM tbl_responsavel)`
            return insertResponsavel
            
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const updateResponsavel = async function () {
    try {

        let sql

        sql = `UPDATE tbl_responsavel SET 
                                nome = '${dadosResponsavel.nome}',
                                email = '${dadosResponsavel.email}',
                                senha = '${dadosResponsavel.senha}',
                                id_aluno = '${dadosResponsavel.id_aluno}'
                                WHERE tbl_responsavel.id = '${dadosResponsavel.id}`
        

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

const deleteResponsavel = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_responsavel WHERE tbl_responsavel.id = ${id}`
        let rsResponsavel = await prisma.$queryRawUnsafe(sql)

        return rsResponsavel

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovoResponsavel,
    updateResponsavel,
    deleteResponsavel,
    selectAllResponsaveis,
    selectById,
    selectByNameResponsavel

}