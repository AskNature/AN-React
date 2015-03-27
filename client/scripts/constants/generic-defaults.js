'use strict';

var Defaults = {

    route: '/',

    page: {
        title: 'AskNature',
        description: 'Nature is Coming',
        keywords: ['biomimicry','design']
    },

    relationshipList: {
    results: [],
        boxvalue: ''
    },

    entity: {

        addedby_id: '',
        addedby_first: '',
        addedby_last: '',
        description: '',
        featured_count: '',
        groupid: '',
        groupname: '',
        headline: '',
        masterid: '',
        name: '',
        short_name: '',
        special_text: '',
        type: '',

        roles: ',',
        activities: ',',
        keywords: ',',

        flag_text: 0,
        flag_tags: 0,
        flag_media: 0,
        is_deleted: 0,

        collectors: [],
        collected: [],

        conditions: [],

        created_by: [],

        children: [],
        parent: [],

        designedsystems: [],

        experts: [],
        experts_institution: [],

        featured_in: [],

        flagged: [],
        friends: [],

        has_function: [],
        has_living_system: [],
        has_media: [],

        inspiredby: [],
        inspiredby_id: [],

        living_system: [],
        living_system_taxon: [],
        living_system_id: [],

        mechanisms: [],
        mechanisms_id: [],

        media: [],
        media_name: [],
        media_entity: [],
        media_id: [],
        added_media: [],

        outcomes: [],
        outcomes_id: [],

        products: [],
        product_masterid: [],

        sources: [],
        sources_authors: [],
        sources_year: [],
        sources_id: [],

        strategies: [],

        status: {value: null, options:[{value: 'test1', label: 'Test 1'}]},

        studies: []

    }
};

module.exports = Defaults;
