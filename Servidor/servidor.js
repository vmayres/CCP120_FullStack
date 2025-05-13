require("colors");
const http = require("http");
const express = require("express");
const mongodb = require("mongodb");
const nodemailer = require('nodemailer');

const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://victorayres:6DK5s5RjJoUppgXJ@victor.zji0nys.mongodb.net/?retryWrites=true&w=majority&appName=Victor';
const client = new MongoClient(uri, { useNewUrlParser: true });

const app = express();

// Define a pasta pública e configura o EJS
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

// Redireciona o Localhost sempre para o index.html
app.get("/", function(req, resp){
  resp.redirect("index.html");
});



//! Gei in thouch
app.post('/enviar-contato', function(req, res) {
    const { nome, email, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'victoroliveiraayres@gmail.com',
            pass: 'cvmx msrf hbac wlrz' // Recomendado usar variável de ambiente aqui no futuro
        }
    });

    const mailOptions = {
        from: email,
        to: 'victoroliveiraayres@gmail.com',
        subject: `Contato do site - ${nome}`,
        text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.render('resposta.ejs', {
                resposta: 'Erro',
                mensagem: 'Não foi possível enviar sua mensagem. Tente novamente.'
            });
        } else {
            res.render('resposta.ejs', {
                resposta: 'Mensagem enviada!',
                mensagem: 'Obrigado por entrar em contato!'
            });
        }
    });
});

//! Comandos do blog
app.get("/blog", function (req, resp){
    client.db("exemplo_bd").collection("posts_blog").find({}).toArray(function(err, posts) {
        if (err) {
            resp.render("resposta_blog.ejs", { resposta: "Falha!", mensagem: "Erro ao buscar posts!" });
        } else {
            resp.render("blog.ejs", { posts });
        }
    });
});

app.get("/cadastrar_post", function(req, resp){
    let titulo = req.query.titulo;
    let resumo = req.query.resumo;
    let conteudo = req.query.conteudo;

    client.db("exemplo_bd").collection("posts_blog").insertOne(
        { 
            db_titulo: titulo,
            db_resumo: resumo,
            db_conteudo: conteudo
        }, 
        function (err) {
            if (err) {
                resp.render("resposta_blog.ejs", {
                    resposta: "Falha!",
                    mensagem: "Erro ao cadastrar post!"
                });
            } else {
                resp.render("resposta_blog.ejs", {
                    resposta: "Sucesso!",
                    mensagem: "Post cadastrado com sucesso!"
                });       
            }
        }
    );
});




// Porta compatível com Render e local (porta 80)
const PORT = process.env.PORT || 80;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`.rainbow);
});


// //?? exemplo de aula de banco de dados 
// app.post("/cadastrar", function(req, resp) {
//     var data = { 
//         db_nome: req.body.nome, 
//         db_email: req.body.email, 
//         db_senha: req.body.senha, 
//         db_nascimento: req.body.nascimento 
//     };

//     client.db("exemplo_bd").collection("usuarios").insertOne(data, function (err) {
//         if (err) {
//             resp.render('resposta_usuario', {resposta: "Erro ao cadastrar usuário!"});
//         } else {
//             resp.render('resposta_usuario', {resposta: "Usuário cadastrado com sucesso!"});
//         }
//     });

// });

// app.post("/cadastrar_usuario", function(req, resp) {
//     var data = { db_nome: req.body.nome, db_login: req.body.login, db_senha: req.body.senha };

//     usuarios.insertOne(data, function (err) {
//         if (err) {
//         resp.render('resposta_usuario', {resposta: "Erro ao cadastrar usuário!"})
//         }else {
//         resp.render('resposta_usuario', {resposta: "Usuário cadastrado com sucesso!"})        
//         };
//     });
   
// });

// app.post("/logar_usuario", function(req, resp) {
//     var data = {db_login: req.body.login, db_senha: req.body.senha };

//     usuarios.find(data).toArray(function(err, items) {
//         console.log(items);
//         if (items.length == 0) {
//             resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
//         }else if (err) {
//             resp.render('resposta_usuario', {resposta: "Erro ao logar usuário!"})
//         }else {
//             resp.render('resposta_usuario', {resposta: "Usuário logado com sucesso!"})        
//         };
//     });

// });


// app.post("/atualizar_usuario", function(req, resp) {
//     var data = { db_login: req.body.login, db_senha: req.body.senha };
//     var newData = { $set: {db_senha: req.body.novasenha} };

//     usuarios.updateOne(data, newData, function (err, result) {
//       console.log(result);
//       if (result.modifiedCount == 0) {
//         resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
//       }else if (err) {
//         resp.render('resposta_usuario', {resposta: "Erro ao atualizar usuário!"})
//       }else {
//         resp.render('resposta_usuario', {resposta: "Usuário atualizado com sucesso!"})        
//       };
//     });
   
// });

// app.post("/remover_usuario", function(req, resp) {
//     var data = { db_login: req.body.login, db_senha: req.body.senha };
   
//     usuarios.deleteOne(data, function (err, result) {
//       console.log(result);
//       if (result.deletedCount == 0) {
//         resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
//       }else if (err) {
//         resp.render('resposta_usuario', {resposta: "Erro ao remover usuário!"})
//       }else {
//         resp.render('resposta_usuario', {resposta: "Usuário removido com sucesso!"})        
//       };
//     });

// });