const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllAlunos = async function () {

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

        let rsAluno = await prisma.$queryRawUnsafe(sql)


        return rsAluno

    } catch (error) {
        return false
    }

}

const insertNovoAluno = async function (dadosAluno) {
    try {
        const sql = `INSERT INTO tbl_aluno(nome, 
                                            numero_matricula, 
                                            data_nascimento, 
                                            cep)
                                            VALUES (
                                                '${dadosAluno.nome}', 
                                                '${dadosAluno.numero_matricula}', 
                                                '${dadosAluno.data_nascimento}', 
                                                '${dadosAluno.cep}')`

        const result = await prisma.$queryRawUnsafe(sql)
        if (result) {

            const insertedAluno = await prisma.$queryRaw`SELECT * FROM tbl_aluno WHERE id = (SELECT MAX(id) FROM tbl_aluno)`
            return insertedAluno
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const updateAluno = async function (dadosAluno) {
    try {

        let sql

        sql = `UPDATE tbl_aluno SET 
                    nome = '${dadosAluno.nome}', 
                    numero_matricula = '${dadosAluno.numero_matricula}', 
                    data_nascimento = '${dadosAluno.data_nascimento}', 
                    cep = '${dadosAluno.cep}'
                WHERE tbl_aluno.id = '${dadosAluno.id}'`

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


const deleteAluno = async function (id) {

    try {

        let sql = `DELETE FROM tbl_aluno WHERE tbl_aluno.id = ${id}`
        let rsAluno = await prisma.$queryRawUnsafe(sql)

        return rsAluno

    } catch (error) {
        return false
    }
}

const selectResponsavelAluno = async function (id) {
    try {

        let sql = `select * from tbl_aluno inner join tbl_aluno_responsavel on tbl_aluno.id = tbl_aluno_responsavel.id_aluno where tbl_aluno_responsavel.id_responsavel = ${id}`;

        let rsAlunos = await prisma.$queryRawUnsafe(sql);

        return rsAlunos;
    } catch (error) {
        return false;
    }
}

const selectByResponsavelId = async function (id_responsavel) {
    try {
        let sql = `select * from tbl_aluno inner join tbl_aluno_responsavel on tbl_aluno.id = tbl_aluno_responsavel.id_aluno where tbl_aluno_responsavel.id_responsavel = ${id_responsavel};`;

        let rsAlunos = await prisma.$queryRawUnsafe(sql)

        return rsAlunos
    } catch (error) {
        return false
    }
}

const selectByTurmaId = async function (id_turma) {
    try {
        let sql = `select * from tbl_aluno inner join tbl_turma_aluno on tbl_aluno.id = tbl_turma_aluno.id_aluno where tbl_turma_aluno.id_turma = ${id_turma};`;

        let rsAlunos = await prisma.$queryRawUnsafe(sql)

        return rsAlunos
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
    selectByNameAluno,
    selectResponsavelAluno,
    selectByResponsavelId,
    selectByTurmaId

}