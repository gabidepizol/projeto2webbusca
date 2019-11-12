const mongoose = require("mongoose")
const Schema = mongoose.Schema;

 //definindo o model
const Cadastro = new Schema({
    nome: {
    type: String,
    require: true
  },

  email: { 
  type: String,
  require: true
  },

  senha: {
  type: String,
  require: true
  }
})

mongoose.model("cadastros", Cadastro)