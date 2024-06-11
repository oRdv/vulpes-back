const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllAvisos = async function () {

    try {

        let sql = "select * from tbl_aviso"

        let rsAviso = await prisma.$queryRawUnsafe(sql)

        return rsAviso

    } catch (error) {
        return false
    }
}


const selectById = async function (id) {

    try {

        let sql = `select * from tbl_aviso where id = ${id}`

        let rsAvisos = await prisma.$queryRawUnsafe(sql)

        return rsAvisos

    } catch (error) {

        return false
    }

}

const selectByNameAviso = async function (nome) {

    try {

        let sql = `select * from tbl_aviso where titulo like "%${titulo}%"`

        let rsAviso = await prisma.$queryRawUnsafe(sql)


        return rsAviso

    } catch (error) {
        return false
    }

}

const insertNovoAviso = async function (dadosAviso) {
    try {

        let sql

        sql = `INSERT INTO tbl_aviso (
                                        titulo, 
                                        conteudo,
                                        data_publicacao)
                                        VALUES (
                                         '${dadosAviso.titulo}',
                                         '${dadosAviso.conteudo}',
                                         '${dadosAviso.data_publicacao}'
                                     );`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result) {

            const insertedAviso = await prisma.$queryRaw`SELECT * FROM tbl_aviso WHERE id = (SELECT MAX(id) FROM tbl_aviso)`
            return insertedAviso

        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const updateAviso = async function () {
    try {

        let sql

        sql = `UPDATE tbl_aviso SET 
                                titulo = '${dadosAviso.titulo}',
                                conteudo = '${dadosAviso.conteudo}',
                                data_publicacao = '${dadosAviso.data_publicacao}'
                                WHERE tbl_aviso.id = '${dadosAviso.id}'`


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

const deleteAviso = async function (id) {

    try {

        let sql = `DELETE FROM tbl_aviso WHERE tbl_aviso.id = ${id}`
        let rsAviso = await prisma.$queryRawUnsafe(sql)

        return rsAviso

    } catch (error) {
        return false
    }
}


module.exports = {
    insertNovoAviso,
    updateAviso,
    deleteAviso,
    selectAllAvisos,
    selectById,
    selectByNameAviso

}