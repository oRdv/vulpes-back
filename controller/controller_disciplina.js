const message = require('../modulo/config.js')
const disciplinaDAO = require('../module/DAO/disciplina.js')
const { json } = require('body-parser')

const setInserirNovaDisciplina = async function (dadosDisciplina, contentType) {
    try {

        let statusValidated = false
        let disciplinaJson = {}


        if (String(contentType).toLowerCase() == 'application/json') {

            console.log(dadosDisciplina)

            if (dadosDisciplina.nome == '' || dadosDisciplina.nome == undefined || dadosDisciplina.nome == null || dadosDisciplina.nome.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                statusValidated = true
            }

            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novodisciplinaJson = await disciplinaDAO.insertNovaDisciplina(dadosDisciplina)
                let id = await disciplinaDAO.selectById()

                disciplinaJson.status = message.SUCESSED_CREATED_ITEM.status
                disciplinaJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                disciplinaJson.message = message.SUCESSED_CREATED_ITEM.message
                disciplinaJson.disciplina = dadosDisciplina
                disciplinaJson.id = dadosDisciplina.id

                return disciplinaJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE

        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }


}

const setAtualizarDisciplina = async function (id, dadosDisciplina, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let disciplinaJson = {}

            if (dadosDisciplina.nome == '' || dadosDisciplina.nome == undefined || dadosDisciplina.nome == null || dadosDisciplina.nome.length > 100
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novodisciplinaJson = await disciplinaDAO.insertNovaDisciplina(dadosDisciplina)
                let id = await disciplinaDAO.selectById()

                disciplinaJson.status = message.SUCESSED_CREATED_ITEM.status
                disciplinaJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                disciplinaJson.message = message.SUCESSED_CREATED_ITEM.message
                disciplinaJson.modalidade = dadosDisciplina
                disciplinaJson.id = dadosDisciplina.id

                return disciplinaJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirDisciplina = async function (id) {

    try {
        let idDisciplina = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idDisciplina == '' || idDisciplina == undefined || isNaN(idDisciplina) || idDisciplina == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let disciplinaID = await disciplinaDAO.selectById(idDisciplina)

            if(disciplinaID.length > 0) {

                let disciplinaDeleted = await disciplinaDAO.deleteDisciplina(idDisciplina)
                
                if(disciplinaDeleted){
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

const getListarDisciplina = async function () {
    let disciplinaJson = {}

    let dadosDisciplina = await disciplinaDAO.selectAllDisciplinas()

    if (dadosDisciplina) {
        if (dadosDisciplina.length > 0) {
            disciplinaJson.disciplina = dadosDisciplina
            disciplinaJson.quantidade = dadosDisciplina.length
            disciplinaJson.status_code = 200;

            return disciplinaJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarDisciplina = async function (id) {
    try {

        let idDisciplina = id
        let disciplinaJson = {}

        if (idDisciplina == '' || idDisciplina == undefined || isNaN(idDisciplina)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosDisciplina = await disciplinaDAO.selectById(idDisciplina)

            if (dadosDisciplina.length > 0) {

                disciplinaJson.disciplina = dadosDisciplina
                disciplinaJson.status_code = 200

                return disciplinaJson

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameDisciplina = async function (nome) {

    let nameDisciplina = nome
    let disciplinaJson = {}


    if (nameDisciplina == '' || nameDisciplina == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let nameDisciplina = await disciplinaDAO.selectByNameDisciplina(nameDisciplina)

        if (nameDisciplina) {

            console.log(nameDisciplina)

            if (nameDisciplina.length > 0) {
                disciplinaJson.disciplina = nameDisciplina
                disciplinaJson.status_code = 200

                return disciplinaJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovaDisciplina,
    setAtualizarDisciplina,
    setExcluirDisciplina,
    getListarDisciplina,
    getBuscarDisciplina,
    getNameDisciplina
}