const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllAlunos = async function() {

    try {
        
        let sql = `select * from tbl_aluno`

        let rsAlunos = await prisma.$queryRawUnsafe(sql)

        return rsAlunos

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
        console.log(sql);
        
        let rsAluno = await prisma.$queryRawUnsafe(sql)
        return rsAluno

        
    } catch (error) {
        return false
        
    }

}