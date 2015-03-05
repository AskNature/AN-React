// Strategy model

var Model = require('./model.js');

var entityName = 'InspiredSolutions';

var fields = ['name', 'headline', 'special_text', 'challenges_solved', 'how_is_it_different', 'biomimicry_story', 'product_type', 'patent_name', 'availability', 'company', 'phase', 'patent_number', 'company_website', 'strategy', 'consumer_products', 'keywords', 'status', 'timestamp'];

var Product = Model(entityName, fields);

module.exports = Product;
