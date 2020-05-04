var conection = require("mongodb").MongoClient;
var idEmpresa = require("mongodb").ObjectId;

conection.connect("mongodb://localhost/empresa", { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db("empresa"))
    .catch(error => console.log(error))

function findAll(callback){
    global.conn.collection("dadosempresa").find({}).toArray(callback);
}

function inserir(empresa, callback){
    global.conn.collection("dadosempresa").insertOne(empresa, callback);
}

function buscarPorId(id, callback){
    global.conn.collection("dadosempresa").find(new idEmpresa(id)).toArray(callback);
}

function atualizar(id, empresa, callback){
        global.conn.collection("dadosempresa")
            .updateOne({_id: new idEmpresa(id)},
                       {$set: {
                            nome: empresa.nome,
                            numero: empresa.numero
                       }}, callback);
}


module.exports = { findAll, inserir, buscarPorId, atualizar }