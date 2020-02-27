// Configurar do servidor
const express = require("express")
const server = express()

// configurar o servidor para apresentar arquivos estaticos
server.use(express.static('public'))

// Habilitar body do form
server.use(express.urlencoded({ extended: true }))

// Configurar conexão com Banco de Dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'd09112000',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

// Configurar a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

// Configurar apresentação da pagina
server.get("/", function(req, res) {
    db.query("SELECT * FROM DONORS", function(err, result){
        if (err) return res.send("erro de Banco de Dados.")

        const donors = result.rows
        return res.render("index.html", {donors})
    })
})

// Pegar dados do form
server.post("/", function(req, res){
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name == "" || email == "" || blood == ""){
        alert("Todos os campos são obrigatórios.")
    }

    // Colocar valores dentro do Banco de Dados
    const query = 
    `INSERT INTO donors ("name", "email", "blood")
     VALUES ($1, $2, $3)`

    const values = [name, email, blood]
    db.query(query, values, function(err){
        if (err) return red.send("Erro no banco de dados.")

        return res.redirect("/")
    })
})

// Ligar Servidor e permitir acesso na porta 3000
server.listen(3000, function(){
    console.log("Servidor iniciado.")
})