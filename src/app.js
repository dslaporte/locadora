/*
    Para importar libs ou arquivos, utiliza-se o comando require
    () => executa um método
*/

//carrego a lib do express (servido da aplicação)
const express = require('express')
//importa as rotas
const routes = require('./routes')
//instanciando um novo servidor
const app = express()
//habilita o uso do json
app.use(express.json())
//importa as rotas para o servidor
app.use('/', routes)
//crio uma constante para definir que porta o servidor rodará
const port = 3000
//listen: ouvir/escutar uma determinada porta
app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
})
