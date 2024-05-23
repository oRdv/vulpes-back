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


//todos alunos ok
app.get('/v1/Vulpes/Alunos', cors(), async function(request, response, next){
    let dadosAlunos = await controllerAlunos.getListarAluno()
    

    if(dadosAlunos) {

        response.json(dadosAlunos)
        response.status(200)

    } else {
        response.json({message: 'Nenhum registro encontrado'})
        response.status(200)
    }
})

//id aluno ok
app.get('/v1/Vulpes/Alunos/:id', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let idAluno = request.params.id
   let dadosAluno = await controllerAlunos.getBuscarAluno(idAluno)

   response.status(dadosAluno.status_code)
   response.json(dadosAluno)

})

app.get('/v1/Vulpes/Alunos/nome', cors(), async function(request, response, next){
    //Recebe o id encaminhado pela requisição 
   let nome = request.query.nome
   let dadosAluno = await controllerAlunos.getNameAluno(nome)

   response.status(dadosAluno.status_code)
   response.json(dadosAluno)

})

//delete aluno ok
app.delete('/v1/Vulpes/Alunos/:id', cors(), async function(request, response){
    let idAluno = request.params.id
    let dadosAluno = await controllerAlunos.setExcluirAluno(idAluno)

    response.status(200)
    response.json(dadosAluno)
})


app.listen(8080, function(){
    console.log('A API está no ar e aguardando requisições')
})