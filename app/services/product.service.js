'use strict';
const MAXLIMIT = 50;
const _ = require('lodash');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

Class ProductService {
  constructor(opts, ProductModel) {
    opts = opts || {};
    this.maxLimit = opts.maxLimit || MAXLIMIT;
    this.Product = ProductModel || Product;
  }

  addProduct(data, callback) {
    this.Product.create(data, callback};
    }

    getProductBySku (sku, callback) {
      // .getProductBySku(sku, function(err, product) { ... });
      this.Product.findOne({sku: sku}, callback);
    }

    updateProduct (sku, data, callback) {
      // find by sku
      if(!sku) {
        let noSku = new Error ('Sku is required');
        //noSku.type = "Sku_required";
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
        limit = this.maxLimit;
        skip = 0;
      }
      if(typeof limit === 'function') {
        callback = limit;
        query = {};
        limit = this.maxLimit;
        skip = 0;
      }
      if(limit > this.maxLimit) {
        limit = this.maxLimit;
      }
      this.Product.find(query).skip(skip).limit().exec(callback);
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
