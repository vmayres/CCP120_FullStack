// Ao criar o servidor deve adicionar os pacotes 
require("colors");
const http = require("http");
const express = require("express");
const mongodb = require("mongodb");


// Cria uma instância do aplicativo Express, que será usada para definir rotas e middlewares
const app = express();


// Importa o cliente MongoDB e define a URI de conexão
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://victorayres:6DK5s5RjJoUppgXJ@victor.zji0nys.mongodb.net/?retryWrites=true&w=majority&appName=Victor';
const client = new MongoClient(uri, { useNewUrlParser: true });


// Define a pasta pública e configura o EJS
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");


// CRUD: READ (Redireciona para página de catálogo dinâmica como página inicial)
app.get("/", function(req, resp){
  resp.redirect("/carros");
});

// Porta compatível com Render e local (porta 80)
const PORT = process.env.PORT || 80;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`.rainbow);
});



////////////////////////////////////////////////////////////////

// CRUD: CREATE (Cadastrar um usuário)
app.post("/cadastrar", function(req, resp) {
  var data = { 
    db_nome: req.body.nome, 
    db_login: req.body.login, 
    db_senha: req.body.senha, 
  };
  console.log("Dados recebidos para cadastro: ");
  // Verifica se ja tem um usuário com o mesmo login
  client.db("exemplo_bd").collection("usuarios").findOne({ db_login: data.db_login }, function(err, user) {
    if (err) {
      resp.render('resposta.ejs', {resposta: "Erro ao acessar o banco de dados!"});
    } else if (user) {
      resp.render('resposta.ejs', {resposta: "Erro: já existe um usuário com esse login!"});
    } else {
      // Se não existir, insere o novo usuário
      console.log("Inserindo usuário: ");
      client.db("exemplo_bd").collection("usuarios").insertOne(data, function (err) {
        if (err) {
          resp.render('resposta.ejs', {resposta: "Erro ao cadastrar usuário!"});
        } else {
          resp.render('resposta.ejs', {resposta: "Usuário cadastrado com sucesso!"});
        }
      });
    }
  });

});

// CRUD: READ (Login de usuário)
app.post("/login", function(req, resp) {
  var data = { 
    db_login: req.body.login, 
    db_senha: req.body.senha, 
  };

  // Verifica se o usuário existe no banco de dados
  client.db("exemplo_bd").collection("usuarios").findOne(data, function(err, user) {
    if (err) {
      resp.render('resposta.ejs', {resposta: "Erro ao acessar o banco de dados!"});
    } else if (!user) {
      resp.render('resposta.ejs', {resposta: "Usuário ou senha incorretos!"});
    } else {
      resp.render('resposta.ejs', {resposta: "Login realizado com sucesso!"});
    }
  });
});

// CRUD: CREATE (Adicionar um carro)
app.post("/adicionar-carro", function(req, resp) {
  var data = {
    modelo: req.body.modelo,
    marca: req.body.marca,
    ano: req.body.ano,
    quantidade: req.body.quantidade,
  };

  client.db("exemplo_bd").collection("carros").insertOne(data, function(err, user) {
    if (err) {
      resp.render('resposta.ejs', {resposta: "Erro ao cadastrar carro!"});
    } else {
      resp.render('resposta.ejs', {resposta: "Carro cadastrado com sucesso!"});
    }
  });
});


// CRUD: DELETE (Remover um carro)
app.post("/remover-carro", function(req, resp) {
  var data = {
    modelo: req.body.modelo,
    marca: req.body.marca,
    ano: req.body.ano
  };

  client.db("exemplo_bd").collection("carros").deleteOne(data, function(err, result) {
    if (err) {
      resp.render('resposta.ejs', {resposta: "Erro ao remover carro!"});
    } else if (result.deletedCount === 0) {
      resp.render('resposta.ejs', {resposta: "Carro não encontrado!"});
    } else {
      resp.render('resposta.ejs', {resposta: "Carro removido com sucesso!"});
    }
  });
});

// CRUD: UPDATE (Vender um carro - decrementa quantidade)
app.post("/vender-carro", function(req, resp) {
  var filtro = {
    modelo: req.body.modelo,
    marca: req.body.marca,
    ano: req.body.ano
  };

  client.db("exemplo_bd").collection("carros").findOne(filtro, function(err, carro) {
    if (err) {
      resp.render('resposta.ejs', {resposta: "Erro ao acessar o banco de dados!"});
    } else if (!carro) {
      resp.render('resposta.ejs', {resposta: "Carro não encontrado!"});
    } else {
      let quantidadeAtual = parseInt(carro.quantidade);

      if (isNaN(quantidadeAtual)) {
        resp.render('resposta.ejs', {resposta: "Quantidade inválida no banco de dados!"});
      } else if (quantidadeAtual <= 0) {
        resp.render('resposta.ejs', {resposta: "Esgotado! Não é possível vender."});
      } else {
        let novaQuantidade = (quantidadeAtual - 1).toString();

        client.db("exemplo_bd").collection("carros").updateOne(
          filtro,
          { $set: { quantidade: novaQuantidade } },
          function(err) {
            if (err) {
              resp.render('resposta.ejs', {resposta: "Erro ao vender carro!"});
            } else {
              resp.render('resposta.ejs', {resposta: "Carro vendido com sucesso!"});
            }
          }
        );
      }
    }
  });
});



// CRUD: READ (Listar carros disponíveis)
app.get("/carros", function(req, resp) {
  client.db("exemplo_bd").collection("carros").find({}).toArray(function(err, carros) {
    if (err) {
      resp.render('resposta.ejs', {resposta: "Erro ao acessar o banco de dados!"});
    } else {
      // Ajusta os campos para compatibilidade com o EJS existente
      const carrosFormatados = carros.map(carro => ({
        db_marca: carro.marca,
        db_modelo: carro.modelo,
        db_ano: carro.ano,
        db_qtde: carro.quantidade
      }));
      resp.render('carros.ejs', {carros: carrosFormatados});
    }
  });
});