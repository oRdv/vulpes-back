const message = require('../modulo/config.js')
const gestaoDAO = require('../module/DAO/gestao.js')
const { json } = require('body-parser')

const setInserirNovaGestao = async function (dadosGestao, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let gestaoJson = {}
            
            if (
                dadosGestao.nome == null || dadosGestao.nome == undefined || dadosGestao.nome.length > 150 ||
                dadosGestao.email == null || dadosGestao.email == undefined || dadosGestao.email.length > 100 ||
                dadosGestao.senha == null || dadosGestao.senha == undefined || dadosGestao.senha.length > 16
            ) {
                return message.ERROR_REQUIRED_FIELDS
    
            } else {
    
                statusValidated = true;
            }
    
            if (statusValidated) {
    
                let novaGestao = await gestaoDAO.insertNovaGestao(dadosGestao);
    
                if (novaGestao) {
                    gestaoJson.status = message.SUCESSED_CREATED_ITEM.status
                    gestaoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                    gestaoJson.message = message.SUCESSED_CREATED_ITEM.message
                    gestaoJson.professor = novaGestao
                    gestaoJson.id = novoprofessorJson[0].id
    
                    return gestaoJson
    
                } else {
    
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }

        } else {

            return message.ERROR_CONTENT_TYPE
        }
    } 
    catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}



const setAtualizarGestao = async function (id, dadosGestao, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let gestaoJson = {}

            if (dadosGestao.nome == '' || dadosGestao.nome == undefined || dadosGestao.nome == null || dadosGestao.nome.length > 100 ||
                dadosGestao.email == '' || dadosGestao.email == undefined || dadosGestao.email == null || dadosGestao.nome.email > 100 ||
                dadosGestao.senha == '' || dadosGestao.senha == undefined || dadosGestao.senha == null || dadosGestao.senha.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novogestaoJson = await gestaoDAO.insertNovaGestao(dadosGestao)
                let id = await gestaoDAO.selectById()

                gestaoJson.status = message.SUCESSED_CREATED_ITEM.status
                gestaoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                gestaoJson.message = message.SUCESSED_CREATED_ITEM.message
                gestaoJson.gestao = dadosGestao
                gestaoJson.id = dadosGestao.id

                return gestaoJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirGestao = async function (id) {

    try {
        let idGestao = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idGestao == '' || idGestao == undefined || isNaN(idGestao) || idGestao == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let gestaoId = await gestaoDAO.selectById(idGestao)

            if(gestaoId.length > 0) {

                let gestaoDeleted = await gestaoDAO.deleteGestao(idGestao)
                
                if(gestaoDeleted){
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

const getListarGestao = async function () {
    let gestaoJson = {}

    let dadosGestao = await gestaoDAO.selectAllGestao()

    if (dadosGestao) {
        if (dadosGestao.length > 0) {
            gestaoJson.gestao = dadosGestao
            gestaoJson.quantidade = dadosGestao.length
            gestaoJson.status_code = 200;

            return gestaoJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarGestao = async function (id) {
    try {

        let idGestao = id
        let gestaoJson = {}

        if (idGestao == '' || idGestao == undefined || isNaN(idGestao)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosGestao = await gestaoDAO.selectById(idGestao)

            if (dadosGestao.length > 0) {

                gestaoJson.gestao = dadosGestao
                gestaoJson.status_code = 200

                return gestaoJson

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameGestao = async function (nome) {

    let nameGestao = nome
    let gestaoJson = {}


    if (nameGestao == '' || nameGestao == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let gestaoName = await gestaoDAO.selectByNameGestao(nameGestao)

        if (gestaoName) {

            console.log(gestaoName)

            if (gestaoName.length > 0) {
                gestaoJson.disciplina = nameGestao
                gestaoJson.status_code = 200

                return gestaoJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setAtualizarGestao,
    setInserirNovaGestao,
    setExcluirGestao,
    getListarGestao,
    getBuscarGestao,
    getNameGestao
}