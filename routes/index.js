var express = require('express');
var router = express.Router();

//Nome da pagina.
router.get('/', function (req, res) {
  global.db.findAll((error, docs) => {
    if (error) { return console.log(error); }
    res.render('index', { title: 'Bem Vindo', dados: docs, nav: '../views/components/nav.ejs' })
  })
});

router.get('/new', function (req, res, next) {
  res.render('new', {
    title: 'Novo Cadastro',
    dados: { descricao: "", volume: "", preco: 0, id: 0, quantidade: 0 },
    action: 'new',
    nav: '../views/components/nav.ejs'
  });
});

router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  global.db.deletar(id, (error) => {
    if (error) {
      return console.log(error);
    } res.redirect('/');
  })
});

router.post('/new', function (req, res, next) {
  var descricao = req.body.descricao;
  var volume = req.body.volume;
  var preco = parseInt(req.body.preco);
  var id = parseInt(req.body.id);
  var quantidade = parseInt(req.body.quantidade);
  global.db.inserir({ descricao, volume, preco, id, quantidade }, (error) => {
    if (error) {
      return console.log(error);
    } res.redirect('/');
  })
});
router.get('/edit/:id', function (req, res) {
  var id = req.params.id;
  global.db.buscarPorId(id, (error, docs) => {
    if (error) {
      return console.log(error);
    }
    res.render('new', {
      title: 'Editar Empresa',
      dados: docs[0],
      nav: '../views/components/nav.ejs',
      action: '/edit/' + docs[0]._id
    });
  })
})

router.post('/edit/:id', function (req, res) {

  var descricao = req.body.descricao;
  var volume = req.body.volume;
  var preco = parseInt(req.body.preco);
  var id = parseInt(req.body.id);
  var quantidade = parseInt(req.body.quantidade);

  var _id = req.params.id;

  global.db.atualizar(_id, { descricao, volume, preco, id, quantidade }, (error) => {
    if (error) {
      return console.log(error);
    } res.redirect('/');
  })
})



module.exports = router;
