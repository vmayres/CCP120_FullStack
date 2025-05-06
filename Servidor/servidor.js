require("colors");
const http = require("http");
const express = require("express");
const mongodb = require("mongodb");


const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://victorayres:6DK5s5RjJoUppgXJ@victor.zji0nys.mongodb.net/?retryWrites=true&w=majority&appName=Victor';
const client = new MongoClient(uri, { useNewUrlParser: true });

var dbo = client.db("exemplo_bd");
var usuarios = dbo.collection("usuarios");



const app = express()
app.use(express.static("./public"))
const server = http.createServer(app)
app.get("/", function(req, resp){
  resp.redirect('index.html')
})



app.post("/cadastrar_usuario", function(req, resp) {
    var data = { db_nome: req.body.nome, db_login: req.body.login, db_senha: req.body.senha };

    usuarios.insertOne(data, function (err) {
        if (err) {
        resp.render('resposta_usuario', {resposta: "Erro ao cadastrar usuário!"})
        }else {
        resp.render('resposta_usuario', {resposta: "Usuário cadastrado com sucesso!"})        
        };
    });
   
});

app.post("/logar_usuario", function(req, resp) {
    var data = {db_login: req.body.login, db_senha: req.body.senha };

    usuarios.find(data).toArray(function(err, items) {
      console.log(items);
      if (items.length == 0) {
        resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
      }else if (err) {
        resp.render('resposta_usuario', {resposta: "Erro ao logar usuário!"})
      }else {
        resp.render('resposta_usuario', {resposta: "Usuário logado com sucesso!"})        
      };
    });

});


server.listen(80)
console.log("Servidor Iniciado".rainbow);




