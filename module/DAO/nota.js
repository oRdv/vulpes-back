const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllNota = async function() {

    try {

        let sql = "select * from tbl_nota"

        let rsNota = await prisma.$queryRawUnsafe(sql)

        return rsNota

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_nota where id = ${id}`

        let rsNotas = await prisma.$queryRawUnsafe(sql)

        return rsNotas
    
    } catch (error) {

        return false
    }

}


const insertNovaNota = async function(dadosNota) {
    try {
        
        let sql

        sql = `INSERT INTO tbl_nota (id_aluno, 
                                    id_disciplina,
                                    valor,
                                    data_lancamento)
                                     VALUES (
                                         ${dadosNota.aluno_id},
                                         ${dadosNota.disciplina_id},
                                         '${dadosNota.valor}',
                                         '${dadosNota.data_lancamento}'
                                     )`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) {

            const insertedNota = await prisma.$queryRaw`SELECT * FROM tbl_nota WHERE id = (SELECT MAX(id) FROM tbl_nota)`
            return insertedNota

        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const updateNota = async function () {
    try {

        let sql

        sql = `UPDATE tbl_nota SET 
                                id_aluno = '${dadosNota.id_aluno}',
                                id_disciplina = '${dadosNota.id_disciplina}',
                                valor = '${dadosNota.valor}'
                                data_lancamento = '${dadosNota.data_lancamento}'
                                WHERE tbl_nota.id = '${dadosNota.id}`
        

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

const deleteNota = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_nota WHERE tbl_nota.id = ${id}`
        let rsNota = await prisma.$queryRawUnsafe(sql)

        return rsNota

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovaNota,
    updateNota,
    deleteNota,
    selectAllNota,
    selectById,
    selectAllNota

}