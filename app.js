
var listings=[];
var products={};
var results=[];
var Promise = require('bluebird');

var LISTINGS_FILENAME='./data/listings.txt';
var PRODUCTS_FILENAME='./data/products.txt';
var OUTPUT_FILENAME='./data/output.txt';

var dataAccess=require('./data-access');
var _=require('lodash');

dataAccess.clearFile(OUTPUT_FILENAME);
var listingPromise=dataAccess.readLineByLine(LISTINGS_FILENAME,function(line){

    listings.push(JSON.parse(line));
});

var productsPromise=dataAccess.readLineByLine(PRODUCTS_FILENAME,function(line){
    var product=JSON.parse(line);
    var manufacturer=product.manufacturer;
    if(products[manufacturer]==null){
        products[manufacturer]=[];
    }
    products[manufacturer].push(product);

});


Promise.join(listingPromise,productsPromise).then(function(){
    _.each(listings,function(listing){
        var possibleProducts=products[listing.manufacturer];
        _.each(possibleProducts, function(product){
            var model=product.model;
            if(listing.title.indexOf(model)!=-1){
               if(product.listings==null){
                   product.listings=[];
                   results.push({
                       product_name:  product.product_name,
                       listings:  product.listings
                   });
               }
                product.listings.push(listing);
                return false;
            }
        })

    });

    _.each(results,function(result){
        dataAccess.writeLine(OUTPUT_FILENAME,JSON.stringify(result));

    })

});
