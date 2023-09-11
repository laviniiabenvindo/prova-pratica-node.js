const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 3000
//Importar o módulo conn para as operações com o banco
const pool = require('./db/conn')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Middleware para arquivos estáticos
app.use(express.static('public'))

app.get('/', (req, res)=>{
  const sql = `SELECT * FROM books`

  pool.query(sql, (err, data)=>{
    if(err){
      console.log(err)
      return
    }
    const book = data
    res.render('home', {book})
  })
})
app.get('/cadastrar', (req, res)=>{
  return res.render('cadastrar')
})
app.post('/cadastrar', (req, res)=>{

  const {titulo, categoria, descricao, preco, quantidade} = req.body

  const sql = `INSERT INTO books(titulo, categoria, descricao, preco, quantidade) VALUE ('${titulo}', '${categoria}', '${descricao}', '${preco}', '${quantidade}')`

  pool.query(sql, (err)=>{
    if(err){
      console.log(err)
      return
    }
    res.redirect('/')
  })
})

app.get('/listar', (req, res)=>{
  const sql = `SELECT * FROM books`

  pool.query(sql, (err, data)=>{
    if(err){
      console.log(err)
      return
    }
    const book = data
    res.render('listar', {book})
  })
})
app.get('/listar/:id', (req, res)=>{
  const id = req.params.id
  const sql = `SELECT * FROM books WHERE id=${id}`

  pool.query(sql, (err, data)=>{
    if(err){
      console.log(err)
      return
    }
    const book = data
    res.render('listar', {book})
  })
})

app.get('/atualizar/:id', (req, res)=>{
  return res.render('atualizar')
})

app.post('/atualizar/:id', (req, res)=>{
  const id = req.params.id
  const {titulo, categoria, descricao, preco, quantidade} = req.body

  const sql = `UPDATE books SET titulo='${titulo}', categoria='${categoria}', descricao='${descricao}', preco='${preco}', quantidade='${quantidade}' WHARE id='${id}'`

  pool.query(sql, (err)=>{
    if(err){
      console.log(err)
      return
    }
    res.redirect('/')
  })
})

app.get('/excluir/:id', (req, res)=>{
  const id = req.params.id
  const sql = `DELETE FROM books WHERE id=${id}`

  pool.query(sql, (err)=>{
    if(err){
      console.log(err)
      return
    }
    res.redirect('/')
  })
})

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`)
})

