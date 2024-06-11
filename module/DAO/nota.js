const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectByAlunoeDisciplinaId = async function (id_aluno, id_disciplina) {
    try {
      let sql = `SELECT  a.nome AS nome_aluno, d.nome AS nome_disciplina, n.valor AS nota, n.data_lancamento FROM tbl_nota n INNER JOIN tbl_aluno a ON n.id_aluno = a.id INNER JOIN 
          tbl_disciplina d ON n.id_disciplina = d.id WHERE n.id_aluno = ${id_aluno} AND n.id_disciplina = ${id_disciplina};`
  
      let rsNotas = await prisma.$queryRawUnsafe(sql)
  
      return rsNotas
    } catch (error) {
      return false
    }
  }
  
  const selectAllNota = async function () {
    try {
      let sql = 'select * from tbl_nota'
  
      let rsNota = await prisma.$queryRawUnsafe(sql)
  
      return rsNota
    } catch (error) {
      return false
    }
  }
  
  const selectById = async function (id) {
    try {
      let sql = `select * from tbl_nota where id = ${id}`
  
      let rsNotas = await prisma.$queryRawUnsafe(sql)
  
      return rsNotas
    } catch (error) {
      return false
    }
  }
  
  const insertNovaNota = async function (dadosNota) {
    try {
      let sql
  
      sql = `INSERT INTO tbl_nota (id_aluno, 
                                      id_disciplina,
                                      valor,
                                      data_lancamento)
                                       VALUES (
                                           '${dadosNota.id_aluno}',
                                           '${dadosNota.id_disciplina}',
                                           '${dadosNota.valor}',
                                           '${dadosNota.data_lancamento}'
                                       )`
  
      console.log(sql)
      let result = await prisma.$queryRawUnsafe(sql)
      if (result) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }
  
  const updateNota = async function () {
    try {
      let sql
  
      sql = `UPDATE tbl_nota SET 
                                  id_aluno = '${dadosNota.id_aluno}',
                                  id_disciplina = '${dadosNota.id_disciplina}',
                                  valor = '${dadosNota.valor}'
                                  data_lancamento = '${dadosNota.data_lancamento}'
                                  WHERE tbl_nota.id = '${dadosNota.id}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }
  
  const deleteNota = async function (id) {
    try {
      let sql = `DELETE FROM tbl_nota WHERE tbl_nota.id = ${id}`
      let rsNota = await prisma.$queryRawUnsafe(sql)
  
      return rsNota
    } catch (error) {
      return false
    }
  }
  
  module.exports = {
    insertNovaNota,
    updateNota,
    deleteNota,
    selectAllNota,
    selectById,
    selectAllNota,
    selectByAlunoeDisciplinaId
  }
  