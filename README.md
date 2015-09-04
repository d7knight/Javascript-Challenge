# Sortable Challenge
Instructions
1. In Linux or Windows make sure you have a recent version of Node (0.12.7)
2. Open a terminal and navigate to the root folder of the cloned repo
3. Run `npm install` 
4. Run `node .`
5. The output is in `./data/output.txt`

# Implementation Details
Language
- NodeJS, lodash library, bluebird library for promises

Implementation
- I created a Hashmap that maps a manufacturer to a list of products for that 
 manufacturer. 
- Later for each listing I use the hashmap to retrieve the products from the listing's manufacturer.  
- I then simply try to find the first product in the list whose model name is in the listing.

Edge Cases
- I checked for case insensitivity in the manufacturer and model when matching.
- I used a regex applied to model names to match model names that differ slightly extra underscores, hyphens and spaces.
- I noticed some of the names for manufactures in the listings were multiple words (for example Ricoh Cameras USA). I matched listing like this by considering the manufacturer as Ricoh and then continue attempting to match it to a product. 
