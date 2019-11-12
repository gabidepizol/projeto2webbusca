//carregando modulos
const express = require('express') //copia do framework - tudo que for do express esta aqui
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const formidableMiddleware = require('express-formidable');
const app = express()
const admin = require("./routes/admin")//pega o arquivo admin da pasta routes
const path = require("path") //manipulacao de diretorios


/*
Controllers das noticias
*/

const NoticiasController  = require("./controllers/Noticias")

//chamando o banco
  require('./models/Cadastro.js')
  const Cadastro = mongoose.model("cadastros")


//configuracoes
  //body Parser
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: './public/imgs/',
    multiples: false,
    keepExtensions: true
  }));

  //Handlebars
  app.engine('handlebars', handlebars({defaultLayout: false}))
  app.set('view engine', 'handlebars');

  //mongoose
    mongoose.Promise = global.Promise;
   //
   mongoose.connect("mongodb://localhost/cadastro").then(() => {
    console.log("MongoDB conectado")
  }).catch((err) => {
    console.log("Houve um erro ao se conectar ao mongoDB: "+err)
  })

  // Public -- arquivos de img e css
  app.use(express.static(path.join(__dirname,'public')))

//rotas

  //app.use('/admin', admin)

  /*
    Noticias
  */
  app.post("/noticias/", (req, res) => {
    // salvar no banco
    // salvar a img no diretorio
    NoticiasController.salvarNoticias(req, res);
  })

  app.get('/nova/', (req, res) => {
    // carregar a pagina de postar
    res.render('salvar')
  })

  app.get("/", function(req, res) {
    // carregar as noticias
    NoticiasController.listarNoticias(req, res);
  }); //rota principal
  

  app.get("/buscar/", async (req, res) => {
    const noticias = await NoticiasController.buscarNoticias(req.query.titulo)
    res.render('buscar', noticias)
  })
///////////////////

  app.get('/cadastro',function(req, res){
    res.sendFile(__dirname + "/views/cadastro.html")
  });
  
  app.get('/login',function(req, res){
    res.sendFile(__dirname + "/views/login.html")
  });
  
  app.post("/login/novouser", (req, res) => {
      const novoCadastro = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
      }

      new Cadastro(novoCadastro).save().then(() => {
        console.log("Cadastro realizado com sucesso!")
      }).catch((err) => {
        console.log("erro ao cadastrar usuario!")
      })
  })


//outros
const PORT = 8081
app.listen(PORT,() => {
  console.log("Servidor rodando")
} )

