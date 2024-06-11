const message = require('../modulo/config.js')
const comunicadoDAO = require('../module/DAO/comunicado.js')
const { json } = require('body-parser')

const setInserirNovoComunicado = async function (dadosComunicado, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let comunicadoJson = {}
            
            console.log(dadosComunicado)
            if (
                dadosComunicado.titulo == '' || dadosComunicado.titulo == undefined || dadosComunicado.titulo == null || dadosComunicado.titulo.length > 200 ||
                dadosComunicado.conteudo  == '' || dadosComunicado.conteudo   == undefined || dadosComunicado.conteudo   == null ||
                dadosComunicado.data_publicacao  == '' || dadosComunicado.data_publicacao  == undefined || dadosComunicado.data_publicacao == null ||
                dadosComunicado.id_responsavel  == '' || dadosComunicado.id_responsavel  == undefined || dadosComunicado.id_responsavel == null || isNaN(dadosComunicado.id_responsavel)
            ) {
                return message.ERROR_REQUIRED_FIELDS
    
            } else {
    
                statusValidated = true;
            }
    
            if (statusValidated) {
    
                let novocomunicadoJson = await comunicadoDAO.insertNovoComunicado(dadosComunicado);
    
                if (novocomunicadoJson) {
                    comunicadoJson.status = message.SUCESSED_CREATED_ITEM.status
                    comunicadoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                    comunicadoJson.message = message.SUCESSED_CREATED_ITEM.message
                    comunicadoJson.comunicado = novocomunicadoJson
                    comunicadoJson.id = novocomunicadoJson[0].id
    
                    return comunicadoJson
    
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

const setAtualizarComunicado = async function (id, dadosComunicado, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let comunicadoJson = {}

            if (dadosComunicado.titulo == '' || dadosComunicado.titulo == undefined || dadosComunicado.titulo == null || dadosComunicado.titulo.length > 100 ||
                dadosComunicado.conteudo   == '' || dadosComunicado.conteudo   == undefined || dadosComunicado.conteudo   == null ||
                dadosComunicado.data_publicacao  == '' || dadosComunicado.data_publicacao  == undefined || dadosComunicado.data_publicacao  == null || isNaN(dadosComunicado.data_publicacao ) ||
                dadosComunicado.id_responsavel  == '' || dadosComunicado.id_responsavel  == undefined || dadosComunicado.id_responsavel == null || isNaN(dadosComunicado.id_responsavel)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novocomunicadoJson = await comunicadoDAO.insertNovoComunicado(dadosComunicado)
                let id = await comunicadoDAO.selectById()

                comunicadoJson.status = message.SUCESSED_CREATED_ITEM.status
                comunicadoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                comunicadoJson.message = message.SUCESSED_CREATED_ITEM.message
                comunicadoJson.comunicado = dadosComunicado
                comunicadoJson.id = dadosComunicado.id

                return comunicadoJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirComunicado = async function (id) {

    try {
        let idComunicado = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idComunicado == '' || idComunicado == undefined || isNaN(idComunicado) || idComunicado == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let comunicadoId = await comunicadoDAO.selectById(idComunicado)

            if(comunicadoId.length > 0) {

                let comunicadoDeleted = await comunicadoDAO.deleteComunicado(idComunicado)
                
                if(comunicadoDeleted){
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

const getListarComunicado = async function () {
    let comunicadoJson = {}

    let dadosComunicado = await comunicadoDAO.selectAllComunicado()

    if (dadosComunicado) {
        if (dadosComunicado.length > 0) {
            comunicadoJson.comunicado = dadosComunicado
            comunicadoJson.quantidade = dadosComunicado.length
            comunicadoJson.status_code = 200;

            return comunicadoJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarComunicado = async function (id) {
    try {

        let idComunicado = id
        let comunicadoJson = {}

        if (idComunicado == '' || idComunicado == undefined || isNaN(idComunicado)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosComunicado = await comunicadoDAO.selectById(idComunicado)

            if (dadosComunicado.length > 0) {

                comunicadoJson.comunicado = dadosComunicado
                comunicadoJson.status_code = 200

                return comunicadoJson

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameComunicado = async function (titulo) {

    let nameComunicado = titulo
    let comunicadoJson = {}


    if (nameComunicado == '' || nameComunicado == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let tituloComunicado = await comunicadoDAO.selectAllComunicado(nameComunicado)

        if (tituloComunicado) {

            console.log(tituloComunicado)

            if (tituloComunicado.length > 0) {
                comunicadoJson.comunicado = tituloComunicado
                comunicadoJson.status_code = 200

                return comunicadoJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoComunicado,
    setAtualizarComunicado,
    setExcluirComunicado,
    getListarComunicado,
    getBuscarComunicado,
    getNameComunicado
}