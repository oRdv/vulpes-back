const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { request } = require('http')


const app = express()

app.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//cria um objeto para definir o tipo de dados que ira chegar no body (JSON) NAO FUNCIONA SEM ESSA LINHA 
const bodyParserJson = bodyParser.json()

const controllerAlunos = require('./controller/controller_aluno.js')
const controllerProfessor = require('./controller/controller_professor.js')
const controllerFrequencia = require('./controller/controller_frequencia.js')
const controllerDisciplina = require('./controller/controller_disciplina.js')
const controllerGestao = require('./controller/controller_gestao.js')
const controllerResponsavel = require('./controller/controller_responsavel.js')
const controllerAviso = require('./controller/controller_aviso.js')
const controllerNota = require('./controller/controller_nota.js')
const controllerModalidade = require('./controller/controller_modalidade.js')
const controllerComunicado = require('./controller/controller_comunicado.js')
const controllerTurma = require('./controller/controller_turma.js')
const { log } = require('console')


/////////////////////////////////// ALUNO ///////////////////////////////////


app.get('/v1/Vulpes/Alunos', cors(), async function(request, response, next){
    let dadosAvisoss = await controllerAlunos.getListarAluno()
    

    if(dadosAvisoss) {

        response.json(dadosAvisoss)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})


app.get('/v1/Vulpes/Alunos/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idAviso = request.params.id
   let dadosAvisos = await controllerAlunos.getBuscarAluno(idAviso)

   response.status(dadosAvisos.status_code)
   response.json(dadosAvisos)

})


app.get('/v1/Vulpes/Alunos/nome', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let nome = request.query.nome
   let dadosAvisos = await controllerAlunos.getNameAluno(nome)

   response.status(dadosAvisos.status_code)
   response.json(dadosAvisos)

})

app.get('/v1/Vulpes/Alunos/Responsavel/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);  // Extrair o ID da URL
        console.log('ID extraído da URL:', id);  // Log para verificar o ID extraído

        const response = await controllerAlunos.getAlunoResponse(id);
    } catch (error) {
        console.error(error);  // Log de erro
    }
});


app.delete('/v1/Vulpes/Alunos/:id', cors(), async function(request, response){
    let idAviso = request.params.id
    let dadosAvisos = await controllerAlunos.setExcluirAluno(idAviso)

    response.status(200)
    response.json(dadosAvisos)
})

app.put('/v1/Vulpes/Atualizar/Alunos/:id', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type']
    let idAviso = request.params.id
    let dadosPut = request.body
    let dadosAvisos = await controllerAlunos.setAtualizarAluno(idAviso, dadosPut, contentType)

    response.status(dadosAvisos.status_code)
    response.json(dadosAvisos)
})

app.post('/v1/Vulpes/Inserir/Alunos', cors(), bodyParserJson, async function(request, response, next){
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultAlunos = await controllerAlunos.setInserirNovoAluno(dadosBody, contentType);

    response.status(resultAlunos.status_code).json(resultAlunos);
});

/////////////////////////////////// PROFESSOR ///////////////////////////////////

app.get('/v1/Vulpes/Professor', cors(), async function(request, response, next){
    let dadosProfessor = await controllerProfessor.getListarProfessor()
    

    if(dadosProfessor) {

        response.json(dadosProfessor)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})

app.get('/v1/Vulpes/Professor/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idProfessor = request.params.id
   let dadosProfessor = await controllerProfessor.getBuscarProfessor(idProfessor)

   response.status(dadosProfessor.status_code)
   response.json(dadosProfessor)

})

app.get('/v1/Vulpes/Professor/nome', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let nome = request.query.nome
   let dadosProfessor = await controllerProfessor.getNameProfessor(nome)

   response.status(dadosProfessor.status_code)
   response.json(dadosProfessor)

})

app.delete('/v1/Vulpes/Professor/:id', cors(), async function(request, response){
    let idProfessor = request.params.id
    let dadosProfessor = await controllerProfessor.setExcluirProfessor(idProfessor)

    response.status(200)
    response.json(dadosProfessor)
})



app.post('/v1/Vulpes/Inserir/Professor', cors(), bodyParserJson, async function(request, response, next){
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultAviso = await controllerProfessor.setInserirNovoProfessor(dadosBody, contentType);

    response.status(resultAviso.status_code).json(resultAviso);
});

app.put('/v1/Vulpes/atualiza/Professor/:id', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type']
    let idProfessor = request.params.id
    let dadosPut = request.body
    let dadosProfessor = await controllerAlunos.setAtualizarAluno(idProfessor, dadosPut, contentType)

    response.status(dadosProfessor.status_code)
    response.json(dadosProfessor)
})




/////////////////////////////////// FREQUENCIA ///////////////////////////////////

app.get('/v1/Vulpes/Frequencia', cors(), async function(request, response, next){
    let dadosFrequencia = await controllerFrequencia.getListarFrequencia()
    

    if(dadosFrequencia) {

        response.json(dadosFrequencia)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})

app.get('/v1/Vulpes/Frequencia/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idFrequencia = request.params.id
   let dadosFrequencia = await controllerFrequencia.getBuscarFrequencia(idFrequencia)

   response.status(dadosFrequencia.status_code)
   response.json(dadosFrequencia)

})


app.delete('/v1/Vulpes/Frequencia/:id', cors(), async function(request, response){
    let idFrequencia = request.params.id
    let dadosFrequencia = await controllerFrequencia.setExcluirFrequencia(idFrequencia)

    response.status(200)
    response.json(dadosFrequencia)
})

app.post('/v1/Vulpes/Inserir/Frequencia', cors(), bodyParserJson, async function(request, response, next){
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultFrequencia= await controllerFrequencia.setInserirNovaFrequencia(dadosBody, contentType);

    response.status(resultFrequencia.status_code).json(resultFrequencia);
});



/////////////////////////////////// DISCIPLINA ///////////////////////////////////

app.get('/v1/Vulpes/Disciplina', cors(), async function(request, response, next){
    let dadosDisciplina = await controllerDisciplina.getListarDisciplina()
    

    if(dadosDisciplina) {

        response.json(dadosDisciplina)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})

app.get('/v1/Vulpes/Disciplina/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idDisciplina = request.params.id
   let dadosDisciplina = await controllerDisciplina.getBuscarDisciplina(idDisciplina)

   response.status(dadosDisciplina.status_code)
   response.json(dadosDisciplina)

})

app.post('/v1/Vulpes/Inserir/Disciplina', cors(), bodyParserJson, async function(request, response, next){
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultDisciplina= await controllerDisciplina.setInserirNovaDisciplina(dadosBody, contentType);

    response.status(resultDisciplina.status_code).json(resultDisciplina);
});


app.delete('/v1/Vulpes/Disciplina/:id', cors(), async function(request, response){
    let idDisciplina = request.params.id
    let dadosDisciplina = await controllerDisciplina.setExcluirDisciplina(idDisciplina)

    response.status(200)
    response.json(dadosFrequencia)
})


/////////////////////////////////// GESTAO ///////////////////////////////////

app.get('/v1/Vulpes/Gestao', cors(), async function(request, response, next){
    let dadosGestao = await controllerGestao.getListarGestao()
    

    if(dadosGestao) {

        response.json(dadosGestao)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})

app.get('/v1/Vulpes/Gestao/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idGestao = request.params.id
   let dadosGestao = await controllerGestao.getBuscarGestao(idGestao)

   response.status(dadosGestao.status_code)
   response.json(dadosGestao)

})

app.get('/v1/Vulpes/Gestao/nome', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let nome = request.query.nome
   let dadosGestao = await controllerGestao.getNameGestao(nome)

   response.status(dadosGestao.status_code)
   response.json(dadosGestao)

})

app.delete('/v1/Vulpes/dadosGestao/:id', cors(), async function(request, response){
    let idGestao = request.params.id
    let dadosGestao = await controllerGestao.setExcluirGestao(idGestao)

    response.status(200)
    response.json(dadosGestao)
})

/////////////////////////////////// RESPONSAVEL ///////////////////////////////////


app.get('/v1/Vulpes/Responsavel', cors(), async function(request, response, next){
    let dadosResponsavel = await controllerResponsavel.getListarResponsavel()
    

    if(dadosResponsavel) {

        response.json(dadosResponsavel)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})


app.get('/v1/Vulpes/Responsavel/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idResponsavel = request.params.id
   let dadosResponsavel = await controllerResponsavel.getBuscarResponsavel(idResponsavel)

   response.status(dadosResponsavel.status_code)
   response.json(dadosResponsavel)

})


app.get('/v1/Vulpes/Responsavel/nome', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let nome = request.query.nome
   let dadosResponsavel = await controllerResponsavel.getNameResponsavel(nome)

   response.status(dadosResponsavel.status_code)
   response.json(dadosResponsavel)

})


app.delete('/v1/Vulpes/Responsavel/:id', cors(), async function(request, response){
    let idResponsavel = request.params.id
    let dadosResponsavel = await controllerResponsavel.setExcluirResponsavel(idResponsavel)

    response.status(200)
    response.json(dadosResponsavel)
})


/////////////////////////////////// AVISO ///////////////////////////////////


app.get('/v1/Vulpes/Aviso', cors(), async function(request, response, next){
    let dadosAviso = await controllerAviso.getListarAviso()
    

    if(dadosAviso) {

        response.json(dadosAviso)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})


app.get('/v1/Vulpes/Aviso/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idAviso = request.params.id
   let dadosAviso = await controllerAviso.getBuscarAviso(idAviso)

   response.status(dadosAviso.status_code)
   response.json(dadosAviso)

})


app.get('/v1/Vulpes/Aviso/nome', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let titulo = request.query.titulo
   let dadosAviso = await controllerAviso.getNameAviso(titulo)

   response.status(dadosAviso.status_code)
   response.json(dadosAviso)

})


app.delete('/v1/Vulpes/Aviso/:id', cors(), async function(request, response){
    let idAviso = request.params.id
    let dadosAviso = await controllerAviso.setExcluirAviso(idAviso)

    response.status(200)
    response.json(dadosAviso)
})

app.post('/v1/Vulpes/Inserir/Aviso', cors(), bodyParserJson, async function(request, response, next){
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;

    let resultAviso = await controllerAviso.setInserirNovoAviso(dadosBody, contentType);

    response.status(resultAviso.status_code).json(resultAviso);
});

app.put('/v1/Vulpes/Atualizar/Aviso/:id', cors(), bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type']
    let idAviso = request.params.id
    let dadosPut = request.body
    let dadosAviso = await controllerAviso.setAtualizarAviso(idAviso, dadosPut, contentType)

    console.log(dadosAviso);
    response.status(dadosAviso.status_code)
    response.json(dadosAviso)
})

/////////////////////////////////// NOTA ///////////////////////////////////


app.get('/v1/Vulpes/Nota', cors(), async function(request, response, next){
    let dadosNota = await controllerNota.getListarNota()
    

    if(dadosNota) {

        response.json(dadosNota)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})


app.get('/v1/Vulpes/Nota/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idNota = request.params.id
   let dadosNota = await controllerNota.getBuscarNota(idNota)


   response.json(dadosNota)

})


app.delete('/v1/Vulpes/Nota/:id', cors(), async function(request, response){
    let idNota = request.params.id
    let dadosNota = await controllerNota.setExcluirNota(idNota)

    response.status(200)
    response.json(dadosNota)
})

/////////////////////////////////// MODALIDADE ///////////////////////////////////


app.get('/v1/Vulpes/Modalidade', cors(), async function(request, response, next){
    let dadosModalidade = await controllerModalidade.getListarModalidade()
    

    if(dadosModalidade) {

        response.json(dadosModalidade)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})


app.get('/v1/Vulpes/Modalidade/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idModalidade = request.params.id
   let dadosModalidade = await controllerModalidade.getBuscarModalidade(idModalidade)

   response.status(dadosModalidade.status_code)
   response.json(dadosModalidade)

})


app.get('/v1/Vulpes/Modalidade/nome', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let nome = request.query.nome
   let dadosModalidade = await controllerModalidade.getNameModalidade(nome)

   response.status(dadosModalidade.status_code)
   response.json(dadosModalidade)

})


app.delete('/v1/Vulpes/Modalidade/:id', cors(), async function(request, response){
    let idModalidade = request.params.id
    let dadosModalidade = await controllerModalidade.setExcluirModalidade(idModalidade)

    response.status(200)
    response.json(dadosModalidade)
})

/////////////////////////////////// COMUNICADO ///////////////////////////////////


app.get('/v1/Vulpes/Comunicado', cors(), async function(request, response, next){
    let dadosComunicado = await controllerComunicado.getListarComunicado()
    

    if(dadosComunicado) {

        response.json(dadosComunicado)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})


app.get('/v1/Vulpes/Comunicado/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idComunicado = request.params.id
   let dadosComunicado = await controllerComunicado.getBuscarComunicado(idComunicado)

   response.status(dadosComunicado.status_code)
   response.json(dadosComunicado)

})


app.get('/v1/Vulpes/Comunicado/titulo', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let titulo = request.query.titulo
   let dadosComunicado = await controllerComunicado.getNameComunicado(titulo)

   response.status(dadosComunicado.status_code)
   response.json(dadosComunicado)

})


app.delete('/v1/Vulpes/Comunicado/:id', cors(), async function(request, response){
    let idComunicado = request.params.id
    let dadosComunicado = await controllerComunicado.setExcluirComunicado(idComunicado)

    response.status(200)
    response.json(dadosComunicado)
})

/////////////////////////////////// TURMA ///////////////////////////////////


app.get('/v1/Vulpes/Turma', cors(), async function(request, response, next){
    let dadosTurma = await controllerTurma.getListarTurma()

    if(dadosTurma) {

        response.json(dadosTurma)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})


app.get('/v1/Vulpes/Turma/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idTurma = request.params.id
   let dadosTurma = await controllerTurma.getBuscarTurma(idTurma)

   response.status(dadosTurma.status_code)
   response.json(dadosTurma)

})


app.get('/v1/Vulpes/Turma/nome', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let nome = request.query.nome
   let dadosTurma = await controllerTurma.getNameTurma(nome)

   response.status(dadosTurma.status_code)
   response.json(dadosTurma)

})


app.delete('/v1/Vulpes/Turma/:id', cors(), async function(request, response){
    let idTurma = request.params.id
    let dadosTurma = await controllerComunicado.setExcluirComunicado(idTurma)

    response.status(200)
    response.json(dadosTurma)
})


app.listen(8080, function(){
    console.log('A API está no ar e aguardando requisições')
})