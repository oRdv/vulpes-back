const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllFrequencia = async function() {

    try {

        let sql = "select * from tbl_frequencia"

        let rsFrequencia = await prisma.$queryRawUnsafe(sql)

        return rsFrequencia

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_frequencia where id = ${id}`

        let rsFrequencias = await prisma.$queryRawUnsafe(sql)

        return rsFrequencias
    
    } catch (error) {

        return false
    }

}


const insertNovaFrequencia = async function(dadosFrequencia) {
    try {
        
        let sql

        sql = `INSERT INTO tbl_frequencia (
                                     dia_letivo, 
                                     id_aluno,
                                     id_disciplina,
                                     presenca
                                    )
                                     VALUES (
                                         '${dadosFrequencia.dia_letivo}',
                                         '${dadosFrequencia.id_aluno}',
                                         '${dadosFrequencia.id_disciplina}',
                                         ${dadosFrequencia.presenca}
                                     );`

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


const updateFrequencia = async function () {
    try {

        let sql

        sql = `UPDATE tbl_frequencia SET 
                                dia_letivo  = '${dadosFrequencia.dia_letivo}',
                                id_aluno  = '${dadosFrequencia.id_aluno}',
                                id_disciplina  = '${dadosFrequencia.id_disciplina}',
                                presenca = '${dadosFrequencia.presenca}'
                                WHERE tbl_frequencia.id = '${dadosFrequencia.id}`
        

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

const deleteFrequencia = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_frequencia WHERE tbl_frequencia.id = ${id}`
        let rsFrequencia = await prisma.$queryRawUnsafe(sql)

        return rsFrequencia

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovaFrequencia,
    updateFrequencia,
    deleteFrequencia,
    selectAllFrequencia,
    selectById

}