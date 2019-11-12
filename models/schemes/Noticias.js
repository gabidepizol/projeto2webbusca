var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Noticia = new Schema({
    titulo:{
        type: String,
        require: true
    },

    imagem:{
        type: String,
        require: true
    }

});

module.exports = mongoose.model("noticias", Noticia);