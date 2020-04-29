var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((error, docs) =>{
    if(error){return console.log(error);}
    res.render('index', { title: 'lista de empresas', dados : docs})
  })
});

router.get('/new',function(req, res, next) {
  res.render('new', { title: 'novo cadastro'});
})

module.exports = router;
