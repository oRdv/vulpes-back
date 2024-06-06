const message = require('../modulo/config.js')
const professorDAO = require('../module/DAO/professor.js')
const { json } = require('body-parser')
const aluno = require('../module/DAO/aluno.js')

const setInserirNovoProfessor = async function (dadosProfessor, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let statusValidated = false
            let professorJson = {}
            
            if (
                dadosProfessor.nome == null || dadosProfessor.nome == undefined || dadosProfessor.nome.length > 100 ||
                dadosProfessor.email == null || dadosProfessor.email == undefined || dadosProfessor.email.length > 12 ||
                dadosProfessor.numero_matricula == null || dadosProfessor.numero_matricula == undefined || isNaN(dadosProfessor.numero_matricula) || dadosProfessor.numero_matricula.length > 100 ||
                dadosProfessor.telefone == null || dadosProfessor.telefone == undefined || dadosProfessor.telefone.length > 11
            ) {
                return message.ERROR_REQUIRED_FIELDS
    
            } else {
    
                statusValidated = true;
            }
    
            if (statusValidated) {
    
                let novoprofessorJson = await professorDAO.insertNovoProfessor(dadosProfessor);
    
                if (novoprofessorJson) {
                    professorJson.status = message.SUCESSED_CREATED_ITEM.status
                    professorJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                    professorJson.message = message.SUCESSED_CREATED_ITEM.message
                    professorJson.professor = novoprofessorJson
                    professorJson.id = novoprofessorJson[0].id
    
                    return professorJson
    
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

const setAtualizarProfessor = async function (id, dadosProfessor, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let professorJson = {}

            if (dadosProfessor.nome == '' || dadosProfessor.nome == undefined || dadosProfessor.nome == null || dadosProfessor.nome.length > 100 ||
                dadosProfessor.email == '' || dadosProfessor.email == undefined || dadosProfessor.email == null || dadosProfessor.email.length > 12 ||
                dadosProfessor.numero_matricula == '' || dadosProfessor.numero_matricula == undefined || dadosProfessor.numero_matricula == null || isNaN(dadosProfessor.numero_matricula) ||
                dadosProfessor.telefone == '' || dadosProfessor.telefone == undefined || dadosProfessor.telefone == null || isNaN(dadosProfessor.telefone)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoProfessorJson = await professorDAO.insertNovoProfessor(dadosProfessor)
                let id = await professorDAO.selectById()

                professorJson.status = message.SUCESSED_CREATED_ITEM.status
                professorJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                professorJson.message = message.SUCESSED_CREATED_ITEM.message
                professorJson.aluno = dadosProfessor
                professorJson.id = dadosProfessor.id

                return professorJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirProfessor = async function (id) {

    try {
        let idProfessor = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor) || idProfessor == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let professorId = await professorDAO.selectById(idProfessor)

            if(professorId.length > 0) {

                let professorDeleted = await professorDAO.deleteProfessor(idProfessor)
                
                if(professorDeleted){
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

const getListarProfessor = async function () {
    let professorJson = {}

    let dadosProfessor = await professorDAO.selectAllProfessores()

    if (dadosProfessor) {
        if (dadosProfessor.length > 0) {
            professorJson.professor = dadosProfessor
            professorJson.quantidade = dadosProfessor.length
            professorJson.status_code = 200;

            return professorJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarProfessor = async function (id) {
    try {

        let idProfessor = id
        let professorJson = {}

        if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosProfessor = await professorDAO.selectById(idProfessor)

            if (dadosProfessor.length > 0) {

                professorJson.professor = dadosProfessor
                professorJson.status_code = 200

                return professorJson

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameProfessor = async function (nome) {

    let nameProfessor = nome
    let professorJson = {}


    if (nameProfessor == '' || nameProfessor == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let nomeProfessor = await professorDAO.selectByNameProfessor(nameProfessor)

        if (nomeProfessor) {

            console.log(nomeProfessor)

            if (nomeProfessor.length > 0) {
                professorJson.professor = nomeProfessor
                professorJson.status_code = 200

                return professorJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoProfessor,
    setAtualizarProfessor,
    setExcluirProfessor,
    getListarProfessor,
    getBuscarProfessor,
    getNameProfessor
}