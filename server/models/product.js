// Product model

var Model = require('./model.js');

var FlatStrategy = Model('Strategies', ['name', 'summary']);

var Source = Model('Sources', ['name', 'publication_year', 'authors']);
var Function = Model('Function', ['name']);
var Expert = Model('Expert', ['name']);
var User = Model('Users', ['name']);
var Media = Model('Media', ['filename', 'name', 'entity']);
var LivingSystem = Model('LivingSystem', ['name', 'taxon']);
var Condition = Model('Condition', []);

var entityName = 'InspiredSolutions';

var fields = ['name', 'headline', 'special_text', 'challenges_solved', 'how_is_it_different', 'biomimicry_story', 'product_type', 'patent_name', 'availability', 'company', 'phase', 'patent_number', 'company_website', 'strategy', 'consumer_products', 'keywords', 'status', 'timestamp'];

var relationships = {
    'strategies': {model: FlatStrategy, className: 'Strategy', edge: 'out("InspiredBy")'},
    'collectors': {
        model: User,
        className: 'Users',
        edge: 'in("Bookmarked")'
    },
    'media': {
        model: Media,
        className: 'Media',
        edge: 'out("HasMedia")'
    },
    'researchers': {
        model: Expert,
        className: 'Expert',
        edge: 'in("StudiedBy")'
    },
    'sources': {
        model: Source,
        className: 'Sources',
        edge: 'out("FeaturedIn")'
    },
    'mechanisms': {
        model: Function,
        className: 'Function',
        edge: 'out("HasMechanism")'
    },
    'designedsystems' : {
	model: Media,
	className: 'Media',
	edge: 'out("HasDesignedSystem")'
    },
    'outcomes': {
        model: Function,
        className: 'Function',
        edge: 'out("HasFunction")'
    },
    'conditions': {
        model: Condition,
        className: 'Condition',
        edge: 'out("HasConditions")'
    }
};

var Product = Model(entityName, fields, relationships);

module.exports = Product;
