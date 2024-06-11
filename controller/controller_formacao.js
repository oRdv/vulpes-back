const message = require('../modulo/config.js')
const formacaoDAO = require('../module/DAO/formacao.js')
const { json } = require('body-parser')

const setInserirNovaFormacao = async function (dadosFormacao, contentType) {
    try {

        let statusValidated = false
        let formacaoJson = {}


        if (String(contentType).toLowerCase() == 'application/json') {

            console.log(dadosFormacao)

            if (dadosFormacao.universidade == '' || dadosFormacao.universidade == undefined || dadosFormacao.universidade == null || dadosFormacao.universidade.length > 150 ||
                dadosFormacao.curso == '' || dadosFormacao.curso == undefined || dadosFormacao.curso == null || dadosFormacao.curso.length > 150 
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                statusValidated = true
            }

            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoformacaoJson = await formacaoDAO.insertNovaFormacao(dadosFormacao)
                let id = await formacaoDAO.selectById()

                formacaoJson.status = message.SUCESSED_CREATED_ITEM.status
                formacaoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                formacaoJson.message = message.SUCESSED_CREATED_ITEM.message
                formacaoJson.formacao = dadosFormacao
                formacaoJson.id = dadosFormacao.id

                return formacaoJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE

        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }


}

const setAtualizarFormacao = async function (id, dadosFormacao, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let formacaoJson = {}

            if (dadosFormacao.universidade == '' || dadosFormacao.universidade == undefined || dadosFormacao.universidade == null || dadosFormacao.universidade.length > 150
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoformacaoJson = await formacaoDAO.insertNovaFormacao(dadosFormacao)
                let id = await formacaoDAO.selectById()

                formacaoJson.status = message.SUCESSED_CREATED_ITEM.status
                formacaoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                formacaoJson.message = message.SUCESSED_CREATED_ITEM.message
                formacaoJson.formacao = dadosFormacao
                formacaoJson.id = dadosFormacao.id

                return formacaoJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirFormacao = async function (id) {

    try {
        let idFomacao = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idFomacao == '' || idFomacao == undefined || isNaN(idFomacao) || idFomacao == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let formacaoId = await formacaoDAO.selectById(idFomacao)

            if(formacaoId.length > 0) {

                let formacaoDeleted = await formacaoDAO.deleteFormacao(idFomacao)
                
                if(formacaoDeleted){
                    return message.SUCCESSED_DELETED_ITEM //200
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }
       } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
       }

}

const getListarFormacao = async function () {
    let formacaoJson = {}

    let dadosFormacao = await formacaoDAO.selectAllFormacao()

    if (dadosFormacao) {
        if (dadosFormacao.length > 0) {
            formacaoJson.formacao = dadosFormacao
            formacaoJson.quantidade = dadosFormacao.length
            formacaoJson.status_code = 200;

            return formacaoJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarFormacao = async function (id) {
    try {

        let idFomacao = id
        let formacaoJson = {}

        if (idFomacao == '' || idFomacao == undefined || isNaN(idFomacao)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosFormacao = await formacaoDAO.selectById(idFomacao)

            if (dadosFormacao.length > 0) {

                formacaoJson.formacao = dadosFormacao
                formacaoJson.status_code = 200

                return formacaoJson

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameUniversidade = async function (universidade) {

    let nameUniversidade = universidade
    let formacaoJson = {}


    if (nameUniversidade == '' || nameUniversidade == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let nameUniversidade = await formacaoDAO.selectBynameUniversidade(nameUniversidade)

        if (nameUniversidade) {

            console.log(nameUniversidade)

            if (nameUniversidade.length > 0) {
                formacaoJson.modalidade = nameUniversidade
                formacaoJson.status_code = 200

                return formacaoJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setAtualizarFormacao,
    setInserirNovaFormacao,
    setExcluirFormacao,
    getBuscarFormacao,
    getListarFormacao,
    getNameUniversidade
}