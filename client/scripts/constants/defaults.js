'use strict';

var Defaults = {

    route: '/',

    page: {
        title: 'Home',
        description: 'A React + Flux application',
        keywords: null

    },

    relationshipList: {
	results: []
    },

    user: {
        loggedIn: false,
        results : [
          {
            name: 'Username',
            flagged: [],
            media: [],
            media_name: [],
            media_entity: [],
            media_id: [],
            added_media: [],
            collected: [],
            friends: [],
            roles: '1,2',
            activities: '1,2'
          }
        ]

    },

    phenomenon: {
      results : [
      {
        name: 'Loading..',
        description: '',
        short_name: '',
        parent: [],
        children: [],
        has_function: [],
        groupname: '',
        groupid: '',
        media: [],
        media_name: [],
        media_entity: [],
        media_id: []
      }
      ]
    },

    strategy: {
      results : [
      {
          name: 'Nature is Coming...',
          description: '...and She\'s Pissed',
          masterid: '',
          media: [],
          media_name: [],
          media_entity: [],
          media_id: [],
          outcomes: [],
          outcomes_id: [],
          mechanisms: [],
          mechanisms_id: [],
          conditions: [],
          living_system: [],
          living_system_taxon: [],
          living_system_id: [],
          products: [],
          product_masterid: [],
          sources: [],
          sources_authors: [],
          sources_year: [],
          sources_id: [],
          collectors: [],
          experts: [],
          keywords: 'Tag1, tag2',
          created_by: []
      }
      ]
    },

    strategyNew: {
	name: 'Loading...',
	description: 'Nature is coming...',
	products: []
    },

    product: {
      results : [
      {
        name: 'Loading ...',
        description: '',
        inspiredby: [],
        inspiredby_id: [],
        keywords: 'Tag1, Tag2',
        collectors: [],
        media: [],
        media_name: [],
        media_entity: [],
        media_id: [],
        outcomes: [],
        outcomes_id: [],
        mechanisms: [],
        conditions: [],
        researchers: [],
        sources: [],
        designedsystems: []
        }
      ]
    },

    collection: {
      results : [
        {
          name: 'Loading...'
        }
      ]
    },

    condition: {
      results : [
        {
          name: 'Loading...'
        }
      ]
    },

    livingsystem: {
      results : [
        {
          name: 'Loading...',
          children: [],
          parent: [],
          has_living_system: [],
          has_media: []
        }
      ]
    },

    researcher: {
      results : [
        {
          name: 'Loading...',
          collected: [],
          studies: []
        }
      ]
    },

    source: {
      results : [
        {
          name: 'Loading...',
          collected: [],
          featured_in: [],
          keywords: 'Tag1,Tag2',
          status: '',
          type: '',
          featured_count: ''
        }
      ]
    },

    media: {
      results : [
        {
          name: 'Loading...',
          added_media: [],
          has_media: [],
          keywords: '1,2'
        }
      ]
    },


};

module.exports = Defaults;
