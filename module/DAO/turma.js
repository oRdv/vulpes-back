const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllTurmas = async function() {

    try {

        let sql = "select * from tbl_turma"

        let rsTurma = await prisma.$queryRawUnsafe(sql)

        return rsTurma

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_turma where id = ${id}`

        let rsTurmas = await prisma.$queryRawUnsafe(sql)

        return rsTurmas
    
    } catch (error) {

        return false
    }

}

const selectByNameTurma = async function (nome) {

    try {
        
        let sql = `select * from tbl_turma where nome like "%${nome}%"`

        let rsTurma = await prisma.$queryRawUnsafe(sql)
        

        return rsTurma

    } catch (error) {
        return false
    }

}

const insertNovaTurma = async function(dadosTurma) {
    try {
        
        let sql = `INSERT INTO tbl_turma (nome,
                                        data_inicio,
                                        data_conclusao
                                        )
                                     VALUES (
                                         '${dadosTurma.nome}',
                                         '${dadosTurma.data_inicio}',
                                         '${dadosTurma.data_conclusao}'
                                     )`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if (result) {

            const insertedTurma = await prisma.$queryRaw`SELECT * FROM tbl_turma WHERE id = (SELECT MAX(id) FROM tbl_turma)`
            return insertedTurma
            
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const updateTurma = async function () {
    try {

        let sql

        sql = `UPDATE tbl_turma SET 
                                nome = '${dadosTurma.nome}'
                                modalidade = '${dadosTurma.modalidade}'
                                data_inicio = '${dadosTurma.data_inicio}'
                                data_fim = '${dadosTurma.data_fim}'
                                WHERE tbl_turma.id = '${dadosTurma.id}`
        

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

const deleteTurma = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_turma WHERE tbl_turma.id = ${id}`
        let rsTurma = await prisma.$queryRawUnsafe(sql)

        return rsTurma

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovaTurma,
    updateTurma,
    deleteTurma,
    selectAllTurmas,
    selectById,
    selectByNameTurma

}