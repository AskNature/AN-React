'use strict';

var List = {

    'plural_name' : 'Biological Strategies',
    'singular_name' : 'Biological Strategy',
    'slug': 'b.strategy',
    'columns' : [
        {columnName:'masterid', displayName:'id', type:'hidden'},
        {columnName:'name', displayName:'Name', type:'link'},
        {columnName:'description', displayName:'Description', type:'longtext'},
        {columnName:'mechanisms', displayName:'Mechanisms', type:'list'},
        {columnName:'outcomes', displayName:'Outcomes', type:'list'},
        {columnName:'addedby', displayName:'Added By', type:'text'},
        {columnName:'timestamp', displayName:'Date Modified', type:'date'},
        {columnName:'flag_text', displayName:'Text', type:'boolean'},
        {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
        {columnName:'flag_media', displayName:'Media', type:'boolean'}
    ],
    'initialSort' : [
        'masterid',
        false
    ],
    'thumb' : [
        'media',
        'media_entity'
    ]
};

module.exports = List;
