const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllDisciplinas = async function() {

    try {

        let sql = "select * from tbl_disciplina"

        let rdDisciplina = await prisma.$queryRawUnsafe(sql)

        return rdDisciplina

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_disciplina where id = ${id}`

        let rdDisciplinas = await prisma.$queryRawUnsafe(sql)

        return rdDisciplinas
    
    } catch (error) {

        return false
    }

}

const selectByNameDisciplina = async function (nome) {

    try {
        
        let sql = `select * from tbl_disciplina where nome like "%${nome}%"`

        let rdDisciplina = await prisma.$queryRawUnsafe(sql)
        

        return rdDisciplina

    } catch (error) {
        return false
    }

}
const insertNovaDisciplina = async function(dadosDisciplina) {
    try {
        
        let sql

        sql = `INSERT INTO tbl_disciplina (nome)
                                     VALUES (
                                         '${dadosDisciplina.nome}'
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


const updateDisciplina = async function () {
    try {

        let sql

        sql = `UPDATE tbl_disciplina SET 
                                nome = '${dadosDisciplina.nome}'
                                WHERE tbl_disciplina.id = '${dadosDisciplina.id}`
        

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

const deleteDisciplina = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_disciplina WHERE tbl_disciplina.id = ${id}`
        let rdDisciplina = await prisma.$queryRawUnsafe(sql)

        return rdDisciplina

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovaDisciplina,
    updateDisciplina,
    deleteDisciplina,
    selectAllDisciplinas,
    selectById,
    selectByNameDisciplina

}