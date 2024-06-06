const message = require('../modulo/config.js')
const frequenciaDAO = require('../module/DAO/frequencia.js')
const { json } = require('body-parser')


const setInserirNovaFrequencia = async function (dadosFrequencia, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {


            let statusValidated = false
            let frequenciaJson = {}
            
            if (
                dadosFrequencia.dia_letivo  == '' || dadosFrequencia.dia_letivo  == undefined || dadosFrequencia.dia_letivo  == null || dadosFrequencia.dia_letivo.length != 10 || 
                dadosFrequencia.id_aluno  == '' || dadosFrequencia.id_aluno  == undefined || dadosFrequencia.id_aluno  == null || isNaN(dadosFrequencia.id_aluno )|| 
                dadosFrequencia.id_disciplina  == '' || dadosFrequencia.id_disciplina  == undefined || dadosFrequencia.id_disciplina  == null || isNaN(dadosFrequencia.id_disciplina ) ||
                dadosFrequencia.presenca === '' || dadosFrequencia.presenca === undefined || dadosFrequencia.presenca === null || typeof dadosFrequencia.presenca !== 'boolean'
            ) {
                return message.ERROR_REQUIRED_FIELDS
    
            } else {
    
                statusValidated = true;
            }
    
            if (statusValidated) {
    
                let novafrequenciaJson = await frequenciaDAO.insertNovaFrequencia(dadosFrequencia);
    
                if (novafrequenciaJson) {
                    frequenciaJson.status = message.SUCESSED_CREATED_ITEM.status
                    frequenciaJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                    frequenciaJson.message = message.SUCESSED_CREATED_ITEM.message
                    frequenciaJson.frequencia = novoprofessorJson
                    frequenciaJson.id = novafrequenciaJson[0].id
    
                    return frequenciaJson
    
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


const setAtualizarFrequencia = async function (id, dadosFrequencia, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let frequenciaJson = {}

            if (dadosFrequencia.dia_letivo  == '' || dadosFrequencia.dia_letivo  == undefined || dadosFrequencia.dia_letivo  == null || isNaN(dadosFrequencia.dia_letivo ) ||
                dadosFrequencia.id_aluno  == '' || dadosFrequencia.id_aluno  == undefined || dadosFrequencia.id_aluno  == null || isNaN(dadosFrequencia.id_aluno ) ||
                dadosFrequencia.id_disciplina  == '' || dadosFrequencia.id_disciplina  == undefined || dadosFrequencia.id_disciplina  == null || isNaN(dadosFrequencia.id_disciplina ) ||
                dadosFrequencia.presenca == '' || dadosFrequencia.presenca  == undefined || dadosFrequencia.presenca  == null || isNaN(dadosFrequencia.presenca )
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                statusValidated = true
            }
            if (statusValidated === true) {
                //ecaminha os dados para o dao
                let novofrequenciaJson = await frequenciaDAO.insertNovaFrequencia(dadosFrequencia)
                let id = await frequenciaDAO.selectById()

                frequenciaJson.status = message.SUCESSED_CREATED_ITEM.status
                frequenciaJson.status_code = message.SUCESSED_CREATED_ITEM.status_code
                frequenciaJson.message = message.SUCESSED_CREATED_ITEM.message
                frequenciaJson.frequencia = dadosFrequencia
                frequenciaJson.id = dadosFrequencia.id

                return frequenciaJson
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

const setExcluirFrequencia = async function (id) {

    try {
        let idFrequencia = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idFrequencia == '' || idFrequencia == undefined || isNaN(idFrequencia) || idFrequencia == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let frequenciaID = await frequenciaDAO.selectById(idFrequencia)

            if(frequenciaID.length > 0) {

                let frequenciaDeleted = await frequenciaDAO.deleteFrequencia(idFrequencia)
                
                if(frequenciaDeleted){
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

const getListarFrequencia = async function () {
    let frequenciaJson = {}

    let dadosFrequencia = await frequenciaDAO.selectAllFrequencia()

    if (dadosFrequencia) {
        if (dadosFrequencia.length > 0) {
            frequenciaJson.frequencia = dadosFrequencia
            frequenciaJson.quantidade = dadosFrequencia.length
            frequenciaJson.status_code = 200;

            return frequenciaJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarFrequencia = async function (id) {
    try {

        let idFrequencia = id
        let frequenciaJson = {}

        if (idFrequencia == '' || idFrequencia == undefined || isNaN(idFrequencia)) {

            return message.ERROR_INVALID_ID

        } else {

            let dadosFrequencia = await frequenciaDAO.selectById(idFrequencia)

            if (dadosFrequencia.length > 0) {

                frequenciaJson.frequencia = dadosFrequencia
                frequenciaJson.status_code = 200

                return frequenciaJson

            } else {
                return message.ERROR_NOT_FOUND
            }

        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER

    }
}

// const getNameFrequencia = async function (nome ) {

//     let nomeAlunoFreq = nome 
//     let frequenciaJson = {}


//     if (nomeAlunoFreq == '' || nomeAlunoFreq == undefined) {

//         return message.ERROR_NAME_NOT_FOUND

//     } else {
//         let nomefreq = await frequenciaDAO.selectByNameProfessor(nomeAlunoFreq)

//         if (nomefreq) {

//             console.log(nomefreq)

//             if (nomefreq.length > 0) {
//                 frequenciaJson.aluno = alunoJson
//                 frequenciaJson.frequencia = nomefreq
//                 frequenciaJson.status_code = 200

//                 return frequenciaJson
//             } else {
//                 return message.ERROR_NOT_FOUND
//             }
//         } else {
//             return message.ERROR_INTERNAL_SERVER_DB
//         }
//     }
// }

module.exports = {
    setAtualizarFrequencia,
    setInserirNovaFrequencia,
    setExcluirFrequencia,
    getListarFrequencia,
    getBuscarFrequencia
}