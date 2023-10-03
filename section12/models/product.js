const e = require("express");
const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    // this._id = new mongodb.ObjectId(this.id);
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // update the product
      const updateData = { ...this };
      delete updateData._id;
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // insert the product
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log("save result:", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("products:", products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log("product:", product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//     unique: true,
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Product;

// // const db = require("../util/database");
// // const Cart = require("./cart");

// // module.exports = class Product {
// //   constructor(id, title, imageUrl, description, price) {
// //     this.id = id;
// //     this.title = title;
// //     this.imageUrl = imageUrl;
// //     this.description = description;
// //     this.price = price;
// //   }

// //   save() {
// //     return db.execute(
// //       "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
// //       [this.title, this.price, this.imageUrl, this.description]
// //     );
// //   }

// //   static deleteById(id) {}

// //   static fetchAll() {
// //     return db.execute("SELECT * FROM products");
// //   }

// //   static findById(id) {
// //     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
// //   }
// // };
