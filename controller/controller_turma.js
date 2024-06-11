const message = require('../modulo/config.js')
const turmaDAO = require('../module/DAO/turma.js')
const { json } = require('body-parser')

const setInserirNovaTurma = async function (dadosTurma, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let turmaJson = {}


            if (dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome == null || dadosTurma.nome.length > 255 ||
                dadosTurma.modalidade == '' || dadosTurma.modalidade == undefined || dadosTurma.modalidade == null || dadosTurma.modalidade.length > 50 ||
                dadosTurma.data_inicio == '' || dadosTurma.data_inicio == undefined || dadosTurma.data_inicio == null ||
                dadosTurma.data_fim == '' || dadosTurma.data_fim == undefined || dadosTurma.data_fim == null
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                statusValidated = true
            }

            if (statusValidated) {

                let novaTurmaJson = await turmaDAO.insertNovaTurma(dadosTurma)

                if (novaTurmaJson) {
                    turmaJson.status = message.SUCESSED_CREATED_ITEM.status
                    turmaJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                    turmaJson.message = message.SUCESSED_CREATED_ITEM.message
                    turmaJson.turma = novaTurmaJson
                    turmaJson.id = novaTurmaJson[0].id

                    return turmaJson
                } else {

                    return message.ERROR_INTERNAL_SERVER_DB

                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }


}

const setAtualizarTurma = async function (id, dadosTurma, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let turmaJson = {}

            if (dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome == null || dadosTurma.nome.length > 255 ||
                dadosTurma.modalidade == '' || dadosTurma.modalidade == undefined || dadosTurma.modalidade == null || dadosTurma.modalidade.length > 50 ||
                dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome == null || dadosTurma.nome.length > 8 ||
                dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome == null || dadosTurma.nome.length > 8
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoturmaJson = await turmaDAO.insertNovaDisciplina(dadosTurma)
                let id = await turmaDAO.selectById()

                turmaJson.status = message.SUCESSED_CREATED_ITEM.status
                turmaJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                turmaJson.message = message.SUCESSED_CREATED_ITEM.message
                turmaJson.turma = dadosTurma
                turmaJson.id = dadosTurma.id

                return turmaJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirTurma = async function (id) {

    try {
        let idTurma = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idTurma == '' || idTurma == undefined || isNaN(idTurma) || idTurma == null) {
            return message.ERROR_INVALID_ID //400
        } else {

            let turmaId = await turmaDAO.selectById(idTurma)

            if (turmaId.length > 0) {

                let turmaDeleted = await turmaDAO.deleteTurma(idTurma)

                if (turmaDeleted) {
                    return message.SUCCESSED_DELETED_ITEM //200
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }

}

const getListarTurma = async function () {
    let turmaJson = {}

    let dadosTurma = await turmaDAO.selectAllTurmas()

    if (dadosTurma) {
        if (dadosTurma.length > 0) {
            turmaJson.turma = dadosTurma
            turmaJson.quantidade = dadosTurma.length
            turmaJson.status_code = 200;

            return turmaJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarTurma = async function (id) {
    try {

        let idTurma = id
        let turmaJson = {}

        if (idTurma == '' || idTurma == undefined || isNaN(idTurma)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosTurma = await turmaDAO.selectById(idTurma)

            if (dadosTurma.length > 0) {

                turmaJson.turma = dadosTurma
                turmaJson.status_code = 200

                return turmaJson

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameTurma = async function (nome) {

    let nameTurma = nome
    let turmaJson = {}


    if (nameTurma == '' || nameTurma == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let nameTurma = await turmaDAO.selectByNameTurma(nameTurma)

        if (nameTurma) {

            console.log(nameTurma)

            if (nameTurma.length > 0) {
                turmaJson.turma = nameTurma
                turmaJson.status_code = 200

                return turmaJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovaTurma,
    setAtualizarTurma,
    setExcluirTurma,
    getListarTurma,
    getBuscarTurma,
    getNameTurma
}