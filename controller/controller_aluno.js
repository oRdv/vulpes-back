const message = require('../modulo/config.js')
const alunosDao = require('../module/DAO/aluno.js')
const { json } = require('body-parser')

const setInserirNovoAluno = async function (dadosAluno, contentType) {
    try {

        let statusValidated = false
        let alunoJson = {}


        if (String(contentType).toLowerCase() == 'application/json') {

            console.log(dadosAluno)

            if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome == null || dadosAluno.nome.length > 100 ||
                dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento == null || dadosAluno.data_nascimento.length > 12 ||
                dadosAluno.numero_matricula == '' || dadosAluno.numero_matricula == undefined || dadosAluno.numero_matricula == null || isNaN(dadosAluno.numero_matricula) ||
                dadosAluno.cep == '' || dadosAluno.cep == undefined || dadosAluno.cep == null || isNaN(dadosAluno.cep)
            ) {
                return message.ERROR_REQUIRED_FIELDS

            } else {
                statusValidated = true
            }

            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoAlunoJson = await alunosDao.insertNovoAluno(dadosAluno)
                let id = await alunosDao.selectById()

                alunoJson.status = message.SUCESSED_CREATED_ITEM.status
                alunoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                alunoJson.message = message.SUCESSED_CREATED_ITEM.message
                alunoJson.aluno = dadosAluno
                alunoJson.id = dadosAluno.id

                return alunoJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE

        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }


}

const setAtualizarAluno = async function (id, dadosAluno, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let atorJson = {}

            if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome == null || dadosAluno.nome.length > 100 ||
                dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined || dadosAluno.data_nascimento == null || dadosAluno.data_nascimento.length > 12 ||
                dadosAluno.numero_matricula == '' || dadosAluno.numero_matricula == undefined || dadosAluno.numero_matricula == null || isNaN(dadosAluno.numero_matricula) ||
                dadosAluno.cep == '' || dadosAluno.cep == undefined || dadosAluno.cep == null || isNaN(dadosAluno.cep)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoAlunoJson = await alunosDao.insertNovoAluno(dadosAluno)
                let id = await alunosDao.selectById()

                alunoJson.status = message.SUCESSED_CREATED_ITEM.status
                alunoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                alunoJson.message = message.SUCESSED_CREATED_ITEM.message
                alunoJson.aluno = dadosAluno
                alunoJson.id = dadosAluno.id

                return alunoJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirAluno = async function (id) {

    try {
        let idAluno = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idAluno == '' || idAluno == undefined || isNaN(idAluno) || idAluno == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let alunoId = await alunosDao.selectById(idAluno)

            if(alunoId.length > 0) {

                let alunosDeleted = await alunosDao.deleteAluno(idAluno)
                
                if(alunosDeleted){
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

const getListarAluno = async function () {
    let alunosJson = {}

    let dadosAlunos = await alunosDao.selectAllAlunos()

    if (dadosAlunos) {
        if (dadosAlunos.length > 0) {
            alunosJson.alunos = dadosAlunos
            alunosJson.quantidade = dadosAlunos.length
            alunosJson.status_code = 200;

            return alunosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarAluno = async function (id) {
    try {

        let idAluno = id
        let alunosJson = {}

        if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosAluno = await alunosDao.selectById(idAluno)

            if (dadosAluno.length > 0) {

                alunosJson.aluno = dadosAluno
                alunosJson.status_code = 200

                return alunosJson

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const getNameAluno = async function (nome) {

    let nameAluno = nome
    let alunoJson = {}


    if (nameAluno == '' || nameAluno == undefined) {

        return message.ERROR_NAME_NOT_FOUND

    } else {
        let nomeAluno = await alunosDao.selectByNameAluno(nameAluno)

        if (nomeAluno) {

            console.log(nomeAluno)

            if (nomeAluno.length > 0) {
                alunoJson.aluno = nomeAluno
                alunoJson.status_code = 200

                return alunoJson
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoAluno,
    setAtualizarAluno,
    setExcluirAluno,
    getListarAluno,
    getBuscarAluno,
    getNameAluno
}