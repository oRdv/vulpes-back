const message = require('../modulo/config.js')
const alunosDao = require('../module/DAO/aluno.js')
const { json } = require('body-parser')

const setInserirNovo = async function (dadosAluno, contentType) {
    try {

        let statusValidated = false
        let alunoJson = {}


        if (String(contentType).toLowerCase() == 'application/json') {

            console.log(dadosAluno)

            if (dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome == null || dadosAtor.nome.length > 100 ||
                dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento == null || dadosAtor.data_nascimento.length > 12 ||
                dadosAtor.numero_matricula == '' || dadosAtor.numero_matricula == undefined || dadosAtor.numero_matricula == null || isNaN(dadosAluno.numero_matricula) ||
                dadosAtor.cep == '' || dadosAtor.cep == undefined || dadosAtor.cep == null || isNaN(dadosAluno.cep)
            ) {
                return message.ERROS_REQUIRED_FIELDS
            } else {
                statusValidated = true
            }

            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novoAlunoJson = await alunosDao.insertNovoAluno(dadosAtor)
                let id = await alunosDao.selectById()

                alunoJson.status = message.SUCESSED_CREATED_ITEM.status
                alunoJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                alunoJson.message = message.SUCESSED_CREATED_ITEM.message
                alunoJson.aluno = dadosAluno
                alunoJson.id = dadosAluno.id

                return alunoJson
            }
        } else {
            return message.ERROS_CONTENT_TYPE

        }
    } catch (error) {
        return message.ERROS_INTERNAL_SERVER
    }


}

