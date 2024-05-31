const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllProfessores = async function() {

    try {

        let sql = "select * from tbl_professor"

        let rsProfessor = await prisma.$queryRawUnsafe(sql)

        return rsProfessor

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_professor where id = ${id}`

        let rsProfessors = await prisma.$queryRawUnsafe(sql)

        return rsProfessors
    
    } catch (error) {

        return false
    }

}

const selectByNameProfessor = async function (nome) {

    try {
        
        let sql = `select * from tbl_professor where nome like "%${nome}%"`

        let rsProfessor = await prisma.$queryRawUnsafe(sql)
        

        return rsProfessor

    } catch (error) {
        return false
    }

}

const insertNovoProfessor = async function(dadosProfessor) {
    try {
        
        let sql

        sql = `INSERT INTO tbl_professor (nome,
                                     email,  
                                     numero_matricula,
                                     telefone)
                                     VALUES (
                                         '${dadosProfessor.nome}',
                                         '${dadosProfessor.email}',
                                         '${dadosProfessor.numero_matricula}',
                                         '${dadosProfessor.telefone}'
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


const updateProfessor = async function () {
    try {

        let sql

        sql = `UPDATE tbl_professor SET 
                                nome = '${dadosProfessor.nome}',
                                email = '${dadosProfessor.email}',
                                data_nascimento = '${dadosProfessor.numero_matricula}',
                                telefone = '${dadosProfessor.telefone}'
                                WHERE tbl_professor.id = '${dadosProfessor.id}`
        

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

const deleteProfessor = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_professor WHERE tbl_professor.id = ${id}`
        let rsProfessor = await prisma.$queryRawUnsafe(sql)

        return rsProfessor

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovoProfessor,
    updateProfessor,
    deleteProfessor,
    selectAllProfessores,
    selectById,
    selectByNameProfessor

}