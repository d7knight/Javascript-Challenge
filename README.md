# Javascript Challenge 

# Instructions

1. In Linux or Windows make sure you have a recent version of Node (0.12.7)
2. Open a terminal and navigate to the root folder of the cloned repo
3. Run `npm install` 
4. Run `node .`
5. The output is in `./data/output.txt`

# Implementation Details
Language
- NodeJS, lodash library, bluebird library for promises

Algorithm  

1. Read in the Json objects from the files provided and create a Hashmap that maps a manufacturer to a list of products for that manufacturer. 
2. For each listing my algorithm uses the hashmap to retrieve all of the products from the listing's manufacturer.  
3. My algorithm then finds the first product in the list whose model name is in the listing. If a match is found then the listing is recorded as matching the product and the algorithm continues to match the rest of the listings.  
4. Writing the output Hashmap entries to output.txt as json objects. 

Edge Cases
- I checked for case insensitivity in the manufacturer and model when matching.
- I used a regex applied to model names to match model names that differ slightly extra underscores, hyphens and spaces.
- I noticed some of the names for manufactures in the listings were multiple words (for example Ricoh Cameras USA). I matched listing like this by considering the manufacturer as Ricoh and then continue attempting to match it to a product. 
