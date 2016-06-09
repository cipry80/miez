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

  addProduct(data, callback) {
    Product.create(data, callback};
    }

    getProductBySku (sku, callback) {
      // .getProductBySku(sku, function(err, product) { ... });
      Product.findOne({sku: sku}, callback);
    }

    updateProduct (sku, data, callback) {
      // find by sku
      if(!sku) {
        let noSku = new Error ('Sku is required');
        noSku.type = "Sku_required";
        return callback(noSku);
      }

      this.findProductBySKU(sku, (err, product) => {
        if (err) throw err;
        _.assign(data, callback);
        console.log(data);
        product.save(data, callback);
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
      // find product by sku
      this.findProductBySKU(sku, (err, product) => {
        if (err) throw err;
        // remove product
        product.remove( sku, callback)
      });
      
    }

    module.exports=ProductService;
