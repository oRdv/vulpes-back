const message = require('../modulo/config.js')
const avisoDAO = require('../module/DAO/aviso.js')
const { json } = require('body-parser')

const setInserirNovoAviso = async function (dadosAviso, contentType) {
    try {

        let statusValidated = false
        let avisoJSON = {}


        if (String(contentType).toLowerCase() == 'application/json') {

            console.log(dadosAviso)

            if (dadosAviso.titulo == '' || dadosAviso.titulo == undefined || dadosAviso.titulo == null || dadosAviso.titulo.length > 200 ||
                dadosAviso.conteudo  == '' || dadosAviso.conteudo   == undefined || dadosAviso.conteudo   == null ||
                dadosAviso.data_publicacao  == '' || dadosAviso.data_publicacao  == undefined || dadosAviso.data_publicacao == null || isNaN(dadosAviso.data_publicacao)
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                statusValidated = true
            }

            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoavisoJSON = await responsavelDAO.insertNovoResponsavel(dadosAviso)
                let id = await responsavelDAO.selectById()

                avisoJSON.status = message.SUCESSED_CREATED_ITEM.status
                avisoJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                avisoJSON.message = message.SUCESSED_CREATED_ITEM.message
                avisoJSON.responsavel = dadosAviso
                avisoJSON.id = dadosAviso.id

                return avisoJSON
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

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let avisoJSON = {}

            if (dadosAviso.titulo == '' || dadosAviso.titulo == undefined || dadosAviso.titulo == null || dadosAviso.titulo.length > 100 ||
                dadosAviso.conteudo   == '' || dadosAviso.conteudo   == undefined || dadosAviso.conteudo   == null ||
                dadosAviso.data_publicacao  == '' || dadosAviso.data_publicacao  == undefined || dadosAviso.data_publicacao  == null || isNaN(dadosAviso.data_publicacao )
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoavisoJSON = await responsavelDAO.insertNovoResponsavel(dadosAviso)
                let id = await responsavelDAO.selectById()

                avisoJSON.status = message.SUCESSED_CREATED_ITEM.status
                avisoJSON.status_code = message.SUCESSED_CREATED_ITEM.status_code
                avisoJSON.message = message.SUCESSED_CREATED_ITEM.message
                avisoJSON.responsavel = dadosAviso
                avisoJSON.id = dadosAviso.id

                return avisoJSON
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

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

            if(avisoId.length > 0) {

                let avisoDeleted = await avisoDAO.deleteAviso(idAviso)
                
                if(avisoDeleted){
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