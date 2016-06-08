'use strict';
const MAXLIMIT = 50;
const SKIP = 0;
const _ = require('lodash');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

Class ProductService {
  constructor() {
    //constructor
  }

  addProduct(productData, callback) {
    Product.create(productData, (err, product) => {
      if  (err && (11000 === err.code || 11001 === err.code)) {
        return res.status(400).json({ message: 'Duplicate product' });
      }
      console.log(productData);

      if  (err) {
        return callback(err);
      }

      callback(null, product);
    });
  }
  getProductBySku (sku, callback) {

    Product.findOne({sku: sku}, (err, product) => {
      if (err) {
        next(err);
      } else if (product) {
        callback(null, product);
        next();
      } else {
        next(new Error('failed to find product'));
      }
    });
  }

  updateProduct (sku, productData, callback) {
    productData.save((err, updatedProduct) => {
      if (err) {
        return callback(err);
      }
      callback(null, updatedProduct);
    });
  }

  getAllProducts(query, limit,  skip, callback) {
    if(typeof query === 'function') {
      callback = query;
      query = {};
      limit = MAXLIMIT;
      skip = 0;
    }
    if(typeof limit === 'function') {
      callback = limit;
      query = {};
      limit = MAXLIMIT;
      skip = 0;
    }
    if(limit > MAXLIMIT) {
      limit = MAXLIMIT;
    }
    Product.find(query).skip(skip).limit().exec(callback);
  }

  deleteProduct: function (sku, callback) {
    ?.remove( err => {
      if (err) {
        return next(err);
      }

      res.status(204).json();
    });
  }
}

module.exports=ProductService;
