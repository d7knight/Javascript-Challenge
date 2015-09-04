
var listings=[];
var products={};
var results=[];
var Promise = require('bluebird');

var LISTINGS_FILENAME='./data/listings.txt';
var PRODUCTS_FILENAME='./data/products.txt';
var OUTPUT_FILENAME='./data/output.txt';

var dataAccess=require('./data-access');
var _=require('lodash');

var listingPromise=dataAccess.readLineByLine(LISTINGS_FILENAME,function(line){

    listings.push(JSON.parse(line));
});
function convertManufacturer(manufacturer){
    manufacturer=manufacturer.split(/\s/)[0];
    return manufacturer.toLowerCase();

}
var productsPromise=dataAccess.readLineByLine(PRODUCTS_FILENAME,function(line){
    var product=JSON.parse(line);
    var manufacturer=convertManufacturer(product.manufacturer);
    if(products[manufacturer]==null){
        products[manufacturer]=[];
    }
    products[manufacturer].push(product);

});



Promise.join(listingPromise,productsPromise).then(function(){
    _.each(listings,function(listing){
        var possibleProducts=products[convertManufacturer(listing.manufacturer)];
        _.each(possibleProducts, function(product){
            var model=product.model;

            var seperator='(\\s|-|_)*';
            model=model.replace(/\s/, seperator);
            model=model.replace('_',seperator);
            model=model.replace('-', seperator);

            var regex=new RegExp('[\\s-_]'+model+'[\\s-_]','i');

            if(listing.title.match(regex)){
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


        dataAccess.writeOutput(OUTPUT_FILENAME,results);



});

