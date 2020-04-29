var conection = require("mongodb").MongoClient;

conection.connect("mongodb://localhost/empresa", { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db("empresa"))
    .catch(error => console.log(error))

function findAll(callback){
    global.conn.collection("dadosempresa").find({}).toArray(callback);
}

module.exports = { findAll }