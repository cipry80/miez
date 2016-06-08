getAllProducts(query, limit,  skip, callback) {
  if(typeof query === 'function') {
    callback = query;
    query = {};
    limit = MAXLIMIT;
    skip = 0
  }
  if(typeof limit === 'function') {
    callback = limit;
    query = {};
    limit = ...
    skip = 0
  }
  if(limit > MAXLIMIT) {
    limit = MAXLIMIT;
  }
  Product.find(query).skip(skip).limit().exec(callback);
}
