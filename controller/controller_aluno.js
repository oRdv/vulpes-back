const message = require('../modulo/config.js')
const alunosDao = require('../module/DAO/aluno.js')
const { json } = require('body-parser')

const setInserirNovoAluno = async function (dadosAluno, contentType) {

    try {

        let statusValidated = false
        let alunoJson = {}

        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE

        }

        if (!dadosAluno.nome || dadosAluno.nome.length > 100 ||
            !dadosAluno.data_nascimento || dadosAluno.data_nascimento.length > 12 ||
            !dadosAluno.numero_matricula || dadosAluno.numero_matricula.length > 100 ||
            !dadosAluno.cep || dadosAluno.cep.length > 8) {
            return message.ERROR_REQUIRED_FIELDS
        }

        let novoAlunoJson = await alunosDao.insertNovoAluno(dadosAluno)
        if (novoAlunoJson && novoAlunoJson.length > 0) {
            alunoJson.status = message.SUCESSED_CREATED_ITEM.status
            alunoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
            alunoJson.message = message.SUCESSED_CREATED_ITEM.message
            alunoJson.aluno = novoAlunoJson
            alunoJson.id = novoAlunoJson[0].id
            return alunoJson;
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAluno = async function (id, dadosAluno, contentType) {
    let alunoJson = {};
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
        }

        if (!id || isNaN(id) ||
            dadosAluno.nome === '' || dadosAluno.nome === undefined || dadosAluno.nome === null || dadosAluno.nome.length > 100 ||
            dadosAluno.data_nascimento === '' || dadosAluno.data_nascimento === undefined || dadosAluno.data_nascimento === null || dadosAluno.data_nascimento.length > 12 ||
            dadosAluno.numero_matricula === '' || dadosAluno.numero_matricula === undefined || dadosAluno.numero_matricula === null || isNaN(dadosAluno.numero_matricula) ||
            dadosAluno.cep === '' || dadosAluno.cep === undefined || dadosAluno.cep === null || isNaN(dadosAluno.cep)
        ) {
            return message.ERROR_REQUIRED_FIELDS;
        }

        dadosAluno.id = id;
        let novoAluno = await alunosDao.updateAluno(dadosAluno);

        if (novoAluno) {
            alunoJson.status = message.SUCCESSED_UPDATED_ITEM;
            alunoJson.status_code = message.SUCCESSED_UPDATED_ITEM.status_code;
            alunoJson.message = message.SUCCESSED_UPDATED_ITEM.message;
            alunoJson.aluno = dadosAluno;

            return alunoJson;
        } else {
            return message.ERROR_INTERNAL_SERVER_DB; // Erro interno do servidor
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER; // Erro interno do servidor
    }
}


const setExcluirAluno = async function (id) {

    try {
        let idResponsavel = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idResponsavel == '' || idResponsavel == undefined || isNaN(idResponsavel) || idResponsavel == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let alunoId = await alunosDao.selectById(idResponsavel)

            if(alunoId.length > 0) {

                let alunosDeleted = await alunosDao.deleteAluno(idResponsavel)
                
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

        let idResponsavel = id
        let alunosJson = {}

        if (idResponsavel == '' || idResponsavel == undefined || isNaN(idResponsavel)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosAluno = await alunosDao.selectById(idResponsavel)

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


const getAlunoResponse = async function (id) {
    try {

        let idResponsavel = id;
        let alunosJson = {};

        if (idResponsavel === '' || idResponsavel === undefined || isNaN(idResponsavel)) {
            return message.ERROR_INVALID_ID;
        } else {
            let dadosAluno = await alunosDao.selectResponsavelAluno(idResponsavel);

            if (dadosAluno.length > 0) {
                alunosJson.aluno = dadosAluno;
                alunosJson.status_code = 200;

                return alunosJson;
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch (error) {
        console.error(error);  // Log de erro
        return message.ERROR_INTERNAL_SERVER;
    }
};

module.exports = {
    setInserirNovoAluno,
    setAtualizarAluno,
    setExcluirAluno,
    getListarAluno,
    getBuscarAluno,
    getNameAluno,
    getAlunoResponse
}