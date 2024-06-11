const message = require('../modulo/config.js')
const avisoDAO = require('../module/DAO/aviso.js')
const { json } = require('body-parser')

const setInserirNovoAviso = async function (dadosAviso, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let avisoJSON = {}

            if (dadosAviso.titulo == '' || dadosAviso.titulo == null || dadosAviso.titulo == undefined || dadosAviso.titulo.length > 200 ||
                dadosAviso.conteudo == '' || dadosAviso.conteudo == null || dadosAviso.conteudo == undefined ||
                dadosAviso.data_publicacao == '' || dadosAviso.data_publicacao == null || dadosAviso.data_publicacao == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                statusValidated = true
            }

            if (statusValidated) {

                let novoAvisoJson = await avisoDAO.insertNovoAviso(dadosAviso)

                if (novoAvisoJson) {
                    avisoJSON.status = message.SUCESSED_CREATED_ITEM.status
                    avisoJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                    avisoJSON.message = message.SUCESSED_CREATED_ITEM.message
                    avisoJSON.aviso = novoAvisoJson
                    avisoJSON.id = novoAvisoJson[0].id

                    return avisoJSON
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

const setAtualizarAviso = async function (id, dadosAviso, contentType) {
    try {
        let avisoJson = {}
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE
        }

        if (!id || isNaN(id) ||
        dadosAviso.titulo == '' || dadosAviso.titulo == null || dadosAviso.titulo == undefined || dadosAviso.titulo.length > 200 ||
        dadosAviso.conteudo == '' || dadosAviso.conteudo == null || dadosAviso.conteudo == undefined ||
        dadosAviso.data_publicacao == '' || dadosAviso.data_publicacao == null || dadosAviso.data_publicacao == undefined
        ) {
            return message.ERROR_REQUIRED_FIELDS
        }

        dadosAviso.id = id
        let novoAviso = await avisoDAO.updateAviso(dadosAviso)

        if (novoAviso) {

            avisoJson.status = message.SUCCESSED_UPDATED_ITEM
            avisoJson.status_code = message.SUCCESSED_UPDATED_ITEM.status_code
            avisoJson.message = message.SUCCESSED_UPDATED_ITEM.message
            avisoJson.aviso = dadosAviso
            avisoJson.id = dadosAviso.id

            return avisoJson
            
        } else {
            return message.ERROR_INTERNAL_SERVER_DB; 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; 
    }
}

const setExcluirAviso = async function (id) {

    try {
        let idAviso = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idAviso == '' || idAviso == undefined || isNaN(idAviso) || idAviso == null) {
            return message.ERROR_INVALID_ID //400
        } else {

            let avisoId = await avisoDAO.selectById(idAviso)

            if (avisoId.length > 0) {

                let avisoDeleted = await avisoDAO.deleteAviso(idAviso)

                if (avisoDeleted) {
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

const getListarAviso = async function () {
    let avisoJSON = {}

    let dadosAviso = await avisoDAO.selectAllAvisos()

    if (dadosAviso) {
        if (dadosAviso.length > 0) {
            avisoJSON.aviso = dadosAviso
            avisoJSON.quantidade = dadosAviso.length
            avisoJSON.status_code = 200;

            return avisoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarAviso = async function (id) {
    try {

        let idAviso = id
        let avisoJSON = {}

        if (idAviso == '' || idAviso == undefined || isNaN(idAviso)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosAviso = await avisoDAO.selectById(idAviso)

            if (dadosAviso.length > 0) {

                avisoJSON.aviso = dadosAviso
                avisoJSON.status_code = 200

                return avisoJSON

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameAviso = async function (titulo) {

    let nameAviso = titulo
    let avisoJSON = {}


    if (nameAviso == '' || nameAviso == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let tituloAviso = await avisoDAO.selectAllAvisos(nameAviso)

        if (tituloAviso) {

            console.log(tituloAviso)

            if (tituloAviso.length > 0) {
                avisoJSON.aviso = tituloAviso
                avisoJSON.status_code = 200

                return avisoJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}




module.exports = {
    setInserirNovoAviso,
    setAtualizarAviso,
    setExcluirAviso,
    getListarAviso,
    getBuscarAviso,
    getNameAviso
}