const message = require('../modulo/config.js')
const modalidadeDAO = require('../module/DAO/modalidade.js')
const { json } = require('body-parser')

const setInserirNovaModalidade = async function (dadosModalidade, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let modalidadeJson = {}

            if (dadosModalidade.nome == '' || dadosModalidade.nome == null || dadosModalidade.nome == undefined || dadosModalidade.nome.length > 200 
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                statusValidated = true
            }

            if (statusValidated) {

                let novomodalidadeJson = await modalidadeDAO.insertNovaModalidade(dadosModalidade)

                if (novomodalidadeJson) {
                    modalidadeJson.status = message.SUCESSED_CREATED_ITEM.status
                    modalidadeJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                    modalidadeJson.message = message.SUCESSED_CREATED_ITEM.message
                    modalidadeJson.modalidade = novomodalidadeJson
                    modalidadeJson.id = novomodalidadeJson[0].id

                    return modalidadeJson
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

const setAtualizarModalidade = async function (id, dadosModalidade, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let modalidadeJSON = {}

            if (dadosModalidade.nome == '' || dadosModalidade.nome == undefined || dadosModalidade.nome == null || dadosModalidade.nome.length > 150
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novomodalidadeJSON = await modalidadeDAO.insertNovaModalidade(dadosModalidade)
                let id = await modalidadeDAO.selectById()

                modalidadeJSON.status = message.SUCESSED_CREATED_ITEM.status
                modalidadeJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                modalidadeJSON.message = message.SUCESSED_CREATED_ITEM.message
                modalidadeJSON.modalidade = dadosModalidade
                modalidadeJSON.id = dadosModalidade.id

                return modalidadeJSON
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirModalidade = async function (id) {

    try {
        let idModalidade = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idModalidade == '' || idModalidade == undefined || isNaN(idModalidade) || idModalidade == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let modalidadeId = await modalidadeDAO.selectById(idModalidade)

            if(modalidadeId.length > 0) {

                let modalidadeDeleted = await modalidadeDAO.deleteModalidade(idModalidade)
                
                if(modalidadeDeleted){
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

const getListarModalidade = async function () {
    let modalidadeJSON = {}

    let dadosModalidade = await modalidadeDAO.selectAllModalidades()

    if (dadosModalidade) {
        if (dadosModalidade.length > 0) {
            modalidadeJSON.modalidade = dadosModalidade
            modalidadeJSON.quantidade = dadosModalidade.length
            modalidadeJSON.status_code = 200;

            return modalidadeJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarModalidade = async function (id) {
    try {

        let idModalidade = id
        let modalidadeJSON = {}

        if (idModalidade == '' || idModalidade == undefined || isNaN(idModalidade)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosModalidade = await modalidadeDAO.selectById(idModalidade)

            if (dadosModalidade.length > 0) {

                modalidadeJSON.modalidade = dadosModalidade
                modalidadeJSON.status_code = 200

                return modalidadeJSON

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameModalidade = async function (nome) {

    let nameModalidade = nome
    let modalidadeJSON = {}


    if (nameModalidade == '' || nameModalidade == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let nameModalidade = await modalidadeDAO.selectByNameModalidade(nameModalidade)

        if (nameModalidade) {

            console.log(nameModalidade)

            if (nameModalidade.length > 0) {
                modalidadeJSON.modalidade = nameModalidade
                modalidadeJSON.status_code = 200

                return modalidadeJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovaModalidade,
    setAtualizarModalidade,
    setExcluirModalidade,
    getListarModalidade,
    getBuscarModalidade,
    getNameModalidade
}