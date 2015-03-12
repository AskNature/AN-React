// Strategy model

var Model = require('./model.js');

// Models to link
var InspiredSolution = Model('InspiredSolutions', ['name', 'headline','both("HasMedia")[0].filename']);
var Source = Model('Sources', ['name', 'publication_year', 'authors']);
var Function = Model('Function', ['name']);
var Expert = Model('Expert', ['name']);
var User = Model('Users', ['name']);
var Media = Model('Media', ['filename', 'name', 'entity']);
var LivingSystem = Model('LivingSystem', ['name', 'taxon']);
var Condition = Model('Condition', []);

var entityName = 'Strategy';

var fields = ['name', 'status', 'summary', 'special_text', 'brief', 'timestamp', 'created_by', 'entered_by', 'date_entered', 'additional_functions', 'keywords', 'common_name', 'scientific_name', 'other_names', 'additional_taxa', 'additional_reference', 'applications_sector', 'applications', 'source', 'source_citation', 'pages_of_excerpt', 'image_file_name', 'video_url', 'pdf_file_name', 'application_1', 'application_2', 'application_3', 'editor_comments', 'other_names', 'additional_taxa', 'general_strategy'];

var relationships = {
    'products': {
	model: InspiredSolution,
	className: 'InspiredSolutions',
	edge: 'in("InspiredBy")'
    },
    'sources': {
	model: Source,
	className: 'Sources',
	edge: 'out("FeaturedIn")'
    },
    'functions': {
	model: Function,
	className: 'Function',
	edge: 'out("HasFunction")'
    },
    'experts': {
	model: Expert,
	className: 'Expert',
	edge: 'in("StudiedBy")'
    },
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
    'contributors': {
	model: User,
	className: 'Users',
	edge: 'in("Created")'
    },
    'living_systems': {
	model: LivingSystem,
	className: 'LivingSystem',
	edge: 'out("HasLivingSystem")'
    },
    'mechanisms': {
	model: Function,
	className: 'Function',
	edge: 'out("HasMechanism")'
    },
    'conditions': {
        model: Condition,
	className: 'Condition',
	edge: 'out("HasConditions")'
    }
};

var Strategy = Model(entityName, fields, relationships);

module.exports = Strategy;
