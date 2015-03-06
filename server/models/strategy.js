// Strategy model

var Model = require('./model.js');

var InspiredSolution = Model('InspiredSolutions', ['name', 'headline']);

var entityName = 'Strategy';

var fields = ['name', 'status', 'summary', 'special_text', 'brief', 'timestamp', 'created_by', 'entered_by', 'date_entered', 'additional_functions', 'keywords', 'common_name', 'scientific_name', 'other_names', 'additional_taxa', 'additional_reference', 'applications_sector', 'applications', 'source', 'source_citation', 'pages_of_excerpt', 'image_file_name', 'video_url', 'pdf_file_name', 'application_1', 'application_2', 'application_3', 'editor_comments'];

var relationships = {'Products': {model: InspiredSolution, className: 'InspiredSolutions', edge: 'in("InspiredBy")'}};

var Strategy = Model(entityName, fields, relationships);

module.exports = Strategy;
