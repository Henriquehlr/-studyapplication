var conection = require("mongodb").MongoClient;
var idAlmoxarifado = require("mongodb").ObjectId;

conection.connect("mongodb://localhost/aumoxarifado", { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db("almoxarifado"))
    .catch(error => console.log(error))

function findAll(callback){
    global.conn.collection("dadosaumoxarifado").find({}).toArray(callback);
}

function inserir(almoxarifado, callback){
    global.conn.collection("dadosaumoxarifado").insertOne(almoxarifado, callback);
}

function deletar(id, callback){
    global.conn.collection("dadosaumoxarifado").remove({_id: new idAlmoxarifado(id)}, callback);
}

function buscarPorId(id, callback){
    global.conn.collection("dadosaumoxarifado").find(new idAlmoxarifado(id)).toArray(callback);
}

function atualizar(id, almoxarifado, callback){
        global.conn.collection("dadosaumoxarifado")
            .updateOne({_id: new idAlmoxarifado(id)},
                       {$set: {
                        descricao: almoxarifado.descricao, 
                        volume: almoxarifado.volume,
                        preco: almoxarifado.preco,
                        id: almoxarifado.id,
                        quantidade: almoxarifado.quantidade 
                       }}, callback);
}


module.exports = { findAll, inserir, buscarPorId, atualizar, deletar }