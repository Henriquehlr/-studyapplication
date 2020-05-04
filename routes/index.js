var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((error, docs) =>{
    if(error){return console.log(error);}
    res.render('index', { title: 'lista de empresas', dados : docs})
  })
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro',
                    dados: {nome: "", numero: ""},
                    action: 'new'
  });
});

router.post('/new',function(req, res, next) {
  var nome = req.body.nome;
  var numero = parseInt(req.body.numero);
  global.db.inserir({nome, numero}, (error) => {
    if(error){
      return console.log(error);
    }res.redirect('/');
  })

router.get('/edit/:id', function(req, res){
  var id = req.params.id;
  global.db.buscarPorId(id, (error, docs) => {
    if(error){
      return console.log(error);
    }
    res.render('new', {title: 'Editar Empresa',
                dados: docs[0],
                action:  '/edit/' + docs[0]._id});
    })
  })

  router.post('/edit/:id', function(req, res){
    var id = req.params.id;
    var nome = req.body.nome;
    var numero = parseInt(req.body.numero);
    global.db.atualizar(id, {nome, numero}, (error) => {
      if(error){
        return console.log(error);
      }res.redirect('/');
    })
  })
});

module.exports = router;
