const express = require("express")
const router = express.Router()



 router.get('/cadastro', (req, res) => {
   res.send("Pagina de cadastro")
 })

module.exports = router
