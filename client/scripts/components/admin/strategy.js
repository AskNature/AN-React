'use strict';

var List = {

    'plural_name' : 'Biological Strategies',
    'singular_name' : 'Biological Strategy',
    'store' : require('../../stores/admin/strategies'),
    'actions' : require('../../actions/strategies'),
    'columns' : [
        {columnName:'masterid', displayName:'id', type:'hidden'},
        {columnName:'name', displayName:'Name', type:'link'},
        {columnName:'description', displayName:'Description', type:'longtext'},
        {columnName:'mechanisms', displayName:'Mechanisms', type:'list'},
        {columnName:'outcomes', displayName:'Outcomes', type:'list'},
        {columnName:'addedby', displayName:'Added By', type:'text'},
        {columnName:'timestamp', displayName:'Date Modified', type:'date'},
        {columnName:'is_deleted', displayName:'Archived', type:'boolean'},
        {columnName:'flag_text', displayName:'Text', type:'boolean'},
        {columnName:'flag_tags', displayName:'Tags', type:'boolean'},
        {columnName:'flag_media', displayName:'Media', type:'boolean'}
    ],
    'initialSort' : [
        'timestamp',
        false
    ],
    'thumb' : [
        'media',
        'media_id',
        'media_entity'
    ]
};

module.exports = List;
