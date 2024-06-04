const message = require('../modulo/config.js')
const responsavelDAO = require('../module/DAO/responsavel.js')
const { json } = require('body-parser')

const setInserirNovoResponsavel = async function (dadosResponsavel, contentType) {
    try {

        let statusValidated = false
        let responsavelJson = {}


        if (String(contentType).toLowerCase() == 'application/json') {

            console.log(dadosResponsavel)

            if (dadosResponsavel.nome == '' || dadosResponsavel.nome == undefined || dadosResponsavel.nome == null || dadosResponsavel.nome.length > 100 ||
                dadosResponsavel.email  == '' || dadosResponsavel.email  == undefined || dadosResponsavel.email  == null || dadosResponsavel.email.length > 100 ||
                dadosResponsavel.senha  == '' || dadosResponsavel.senha  == undefined || dadosResponsavel.senha  == null || dadosResponsavel.senha.length > 100 ||
                dadosResponsavel.id_aluno  == '' || dadosResponsavel.id_aluno  == undefined || dadosResponsavel.id_aluno  == null || isNaN(dadosResponsavel.id_aluno )
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                statusValidated = true
            }

            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoresponsavelJson = await responsavelDAO.insertNovoResponsavel(dadosResponsavel)
                let id = await responsavelDAO.selectById()

                responsavelJson.status = message.SUCESSED_CREATED_ITEM.status
                responsavelJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                responsavelJson.message = message.SUCESSED_CREATED_ITEM.message
                responsavelJson.responsavel = dadosResponsavel
                responsavelJson.id = dadosResponsavel.id

                return responsavelJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE

        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }


}

const setAtualizarResponsavel = async function (id, dadosResponsavel, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let responsavelJson = {}

            if (dadosResponsavel.nome == '' || dadosResponsavel.nome == undefined || dadosResponsavel.nome == null || dadosResponsavel.nome.length > 100 ||
                dadosResponsavel.email  == '' || dadosResponsavel.email  == undefined || dadosResponsavel.email  == null || dadosResponsavel.email .length > 12 ||
                dadosResponsavel.senha  == '' || dadosResponsavel.senha  == undefined || dadosResponsavel.senha  == null || isNaN(dadosResponsavel.senha ) ||
                dadosResponsavel.id_aluno  == '' || dadosResponsavel.id_aluno  == undefined || dadosResponsavel.id_aluno  == null || isNaN(dadosResponsavel.id_aluno )
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoresponsavelJson = await responsavelDAO.insertNovoResponsavel(dadosResponsavel)
                let id = await responsavelDAO.selectById()

                responsavelJson.status = message.SUCESSED_CREATED_ITEM.status
                responsavelJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                responsavelJson.message = message.SUCESSED_CREATED_ITEM.message
                responsavelJson.responsavel = dadosResponsavel
                responsavelJson.id = dadosResponsavel.id

                return responsavelJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirResponsavel = async function (id) {

    try {
        let idResponsavel = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idResponsavel == '' || idResponsavel == undefined || isNaN(idResponsavel) || idResponsavel == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let responsavelId = await responsavelDAO.selectById(idResponsavel)

            if(responsavelId.length > 0) {

                let responsavelDeleted = await responsavelDAO.deleteResponsavel(idResponsavel)
                
                if(responsavelDeleted){
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

const getListarResponsavel = async function () {
    let responsavelJson = {}

    let dadosResponsavel = await responsavelDAO.selectAllResponsaveis()

    if (dadosResponsavel) {
        if (dadosResponsavel.length > 0) {
            responsavelJson.responsavel = dadosResponsavel
            responsavelJson.quantidade = dadosResponsavel.length
            responsavelJson.status_code = 200;

            return responsavelJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarResponsavel = async function (id) {
    try {

        let idResponsavel = id
        let responsavelJson = {}

        if (idResponsavel == '' || idResponsavel == undefined || isNaN(idResponsavel)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosResponsavel = await responsavelDAO.selectById(idResponsavel)

            if (dadosResponsavel.length > 0) {

                responsavelJson.responsavel = dadosResponsavel
                responsavelJson.status_code = 200

                return responsavelJson

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameResponsavel = async function (nome) {

    let nameResponsavel = nome
    let responsavelJson = {}


    if (nameResponsavel == '' || nameResponsavel == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let nomeResponsavel = await responsavelDAO.selectAllResponsaveis(nameResponsavel)

        if (nomeResponsavel) {

            console.log(nomeResponsavel)

            if (nomeResponsavel.length > 0) {
                responsavelJson.responsavel = nomeResponsavel
                responsavelJson.status_code = 200

                return responsavelJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoResponsavel,
    setAtualizarResponsavel,
    setExcluirResponsavel,
    getListarResponsavel,
    getBuscarResponsavel,
    getNameResponsavel
}