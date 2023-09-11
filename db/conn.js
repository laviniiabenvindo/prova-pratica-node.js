const mysql = require('mysql2')

//Configuração e conexão com banco
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306', // É opcional.
  user: 'aluno_medio',
  password: '@lunoSenai23.',
  database: 'provaPratica',
})

// É necessário exporta esse modulo

module.exports = pool