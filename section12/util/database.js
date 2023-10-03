const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri =
  "mongodb+srv://davidvarga986:UwjKb0KM1Yhrmqnf@cluster0.pcnh7wy.mongodb.net/?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected!");
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
