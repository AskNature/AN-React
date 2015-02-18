'use strict';

var Defaults = {

    route: '/',

    page: {
        title: 'Home',
        description: 'A React + Flux application',
        keywords: null

    },

    user: {
        loggedIn: false
    },

    outcome: {
      results : [
      {
        name: 'Loading ...',
        description: 'Loading ...',
        parent: 'Loading ...',
        children: 'Loading ...'
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
          functions: [],
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
        function: 'Loading ...',
        name: 'Loading ...',
        description: 'Loading ...',
        inspiredby: 'Loading ...'
      }
      ]
    }


};

module.exports = Defaults;
