const NoticiasModel = require("../models/Noticias")


module.exports = {
    salvarNoticias: async function (req, res) {
        const novaNoticia = {
            titulo: req.fields.titulo,
            imagem: req.files.imagem.path.split("\\")[2]
        }
        const noticia = await NoticiasModel.persistir(novaNoticia)

        res.redirect("/")
    },
    listarNoticias: async function (req, res) {
        const noticias = await NoticiasModel.carregarTodas()
        res.render('index', noticias)
    },
    buscarNoticias: async function (titulo) {
        const noticias = await NoticiasModel.buscar(titulo)
        return noticias
    } 
}