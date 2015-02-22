'use strict';

var Defaults = {

    route: '/',

    page: {
        title: 'Home',
        description: 'A React + Flux application',
        keywords: null

    },

    user: {
        loggedIn: false,
        results : [
          {
            name: 'Username'
          }
        ]

    },

    phenomenon: {
      results : [
      {
        name: 'Loading..',
        description: '',
        short_name: '',
        parent: '',
        children: [],
        has_function: [],
        groupid: ''
      }
      ]
    },

    strategy: {
      results : [
      {
          name: 'Nature is Coming...',
          description: '...and She\'s Pissed',
          masterid: 'masterid',
          media: [],
          brief: 'Brief goes here',
          outcomes: [],
          mechanisms: [],
          conditions: [],
          living_system: [],
          products: [],
          sources: ['Loading'],
          collectors: [],
          experts: [],
          keywords: 'Tag1, tag2',
          created_by: []
      }
      ]
    },

    product: {
      results : [
      {
        outcomes: [],
        name: 'Loading ...',
        description: 'Loading ...',
        inspiredby: [],
        keywords: 'Tag1,Tag2',
        collectors: [],
        media: [],
        researchers: [],
        sources: []
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
          name: 'Loading...'
        }
      ]
    },

    researcher: {
      results : [
        {
          name: 'Loading...'
        }
      ]
    },

    source: {
      results : [
        {
          name: 'Loading...'
        }
      ]
    },

    media: {
      results : [
        {
          name: 'Loading...'
        }
      ]
    },


};

module.exports = Defaults;
