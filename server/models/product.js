// Product model

var Model = require('./model.js');

var FlatStrategy = Model('Strategies', ['name', 'summary']);

var entityName = 'InspiredSolutions';

var fields = ['name', 'headline', 'special_text', 'challenges_solved', 'how_is_it_different', 'biomimicry_story', 'product_type', 'patent_name', 'availability', 'company', 'phase', 'patent_number', 'company_website', 'strategy', 'consumer_products', 'keywords', 'status', 'timestamp'];

var relationships = {'Strategies': {model: FlatStrategy, edge: 'out("InspiredBy")'}};

var Product = Model(entityName, fields, relationships);

module.exports = Product;
