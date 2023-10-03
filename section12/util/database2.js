const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://davidvarga986:UwjKb0KM1Yhrmqnf@cluster0.pcnh7wy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = {
  run: function () {
    return new Promise((resolve, reject) => {
      client
        .connect()
        .then(() => {
          return client.db("admin").command({ ping: 1 });
        })
        .then(() => {
          console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
          );
          resolve();
        })
        .catch((err) => {
          console.dir(err);
          reject(err);
        })
        .finally(() => {
          client.close();
        });
    });
  },
};
