const message = require('../modulo/config.js')
const notaDAO = require('../module/DAO/nota.js')
const { json } = require('body-parser')

const setInserirNovaNota = async function (dadosNota, contentType) {
    try {

        let statusValidated = false
        let notaJSON = {}


        if (String(contentType).toLowerCase() == 'application/json') {

            console.log(dadosNota)

            if (dadosNota.titulo == '' || dadosNota.titulo == undefined || dadosNota.titulo == null || dadosNota.titulo.length > 200 ||
                dadosNota.conteudo  == '' || dadosNota.conteudo   == undefined || dadosNota.conteudo   == null ||
                dadosNota.data_publicacao  == '' || dadosNota.data_publicacao  == undefined || dadosNota.data_publicacao == null || isNaN(dadosNota.data_publicacao)
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                statusValidated = true
            }

            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novonotaJSON = await responsavelDAO.insertNovoResponsavel(dadosNota)
                let id = await responsavelDAO.selectById()

                notaJSON.status = message.SUCESSED_CREATED_ITEM.status
                notaJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                notaJSON.message = message.SUCESSED_CREATED_ITEM.message
                notaJSON.responsavel = dadosNota
                notaJSON.id = dadosNota.id

                return notaJSON
            }
        } else {

            return message.ERROR_CONTENT_TYPE

        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }


}

const setAtualizarAviso = async function (id, dadosNota, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let notaJSON = {}

            if (dadosNota.titulo == '' || dadosNota.titulo == undefined || dadosNota.titulo == null || dadosNota.titulo.length > 100 ||
                dadosNota.conteudo   == '' || dadosNota.conteudo   == undefined || dadosNota.conteudo   == null ||
                dadosNota.data_publicacao  == '' || dadosNota.data_publicacao  == undefined || dadosNota.data_publicacao  == null || isNaN(dadosNota.data_publicacao )
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novonotaJSON = await responsavelDAO.insertNovoResponsavel(dadosNota)
                let id = await responsavelDAO.selectById()

                notaJSON.status = message.SUCESSED_CREATED_ITEM.status
                notaJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                notaJSON.message = message.SUCESSED_CREATED_ITEM.message
                notaJSON.responsavel = dadosNota
                notaJSON.id = dadosNota.id

                return notaJSON
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirNota = async function (id) {

    try {
        let idNota = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idNota == '' || idNota == undefined || isNaN(idNota) || idNota == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let notaId = await no.selectById(idNota)

            if(notaId.length > 0) {

                let notaDeleted = await notaDAO.deleteNota(idNota)
                
                if(notaDeleted){
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

const getListarNota = async function () {
    let notaJSON = {}

    let dadosNota = await notaDAO.selectAllNota()

    if (dadosNota) {
        if (dadosNota.length > 0) {
            notaJSON.nota = dadosNota
            notaJSON.quantidade = dadosNota.length
            notaJSON.status_code = 200;

            return notaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarNota = async function (id) {
    try {

        let idNota = id
        let notaJSON = {}

        if (idNota == '' || idNota == undefined || isNaN(idNota)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosNota = await notaDAO.selectById(idNota)

            if (dadosNota.length > 0) {

                notaJSON.nota = dadosNota
                notaJSON.status_code = 200

                return notaJSON

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}


module.exports = {
    setInserirNovaNota,
    setAtualizarAviso,
    setExcluirNota,
    getListarNota,
    getBuscarNota
    
}