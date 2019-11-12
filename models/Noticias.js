const mongoose = require("mongoose")
const NoticiaScheme =  require("./schemes/Noticias")

module.exports = {
    persistir: function (noticia) {
        return NoticiaScheme.create(noticia);
   },
   carregarTodas: function () {
       return NoticiaScheme.find({})
   },
   buscar: function (titulo) {
       return NoticiaScheme.find({titulo: titulo})
   }
}