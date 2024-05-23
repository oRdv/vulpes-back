const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllAlunos = async function() {

    try {

        let sql = "select * from tbl_aluno"

        let rsAluno = await prisma.$queryRawUnsafe(sql)

        return rsAluno

      } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_aluno where id = ${id}`

        let rsAlunos = await prisma.$queryRawUnsafe(sql)

        return rsAlunos
    
    } catch (error) {

        return false
    }

}

const selectByNameAluno = async function (nome) {

    try {
        
        let sql = `select * from tbl_aluno where nome like "%${nome}%"`
         console.log(sql)

        let rsAluno = await prisma.$queryRawUnsafe(sql)

        return rsAluno

    } catch (error) {
        return false
    }

}

const insertNovoAluno = async function(dadosAluno) {
    try {
        
        let sql

        sql = `INSERT INTO tbl_aluno (nome, 
                                     numero_matricula,
                                     data_nascimento,
                                     cep)
                                     VALUES (
                                         '${dadosAluno.nome}',
                                         '${dadosAluno.numero_matricula}',
                                         '${dadosAluno.data_nascimento}',
                                         '${dadosAluno.cep}'
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


const updateAluno = async function () {
    try {

        let sql

        sql = `UPDATE tbl_aluno SET 
                                nome = '${dadosAluno.nome}',
                                numero_matricula = '${dadosAluno.numero_matricula}',
                                data_nascimento = '${dadosAluno.data_nascimento}',
                                cep = '${dadosAluno.cep}'
                                WHERE tbl_aluno.id = '${dadosAluno.id}`
        

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

const deleteAluno = async function (id) {

    try {
        
        let sql = `DELETE FROM tbl_aluno WHERE tbl_aluno.id = ${id}`
        let rsAluno = await prisma.$queryRawUnsafe(sql)

        return rsAluno

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovoAluno,
    updateAluno,
    deleteAluno,
    selectAllAlunos,
    selectById,
    selectByNameAluno

}