'use strict';

var Defaults = {

    route: '/',

    page: {
        title: 'Home',
        description: 'A React + Flux application',
        keywords: null

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
        function: [],
        name: 'Loading ...',
        description: 'Loading ...',
        living_system: [],
        masterid: 'Loading ...'
      }
      ]
    },

    strategy_detail: {
      results : [
      {
          name: 'Nature is Coming...',
          summary: 'Abstract',
          masterid: 'masterid',
          media: [],
          brief: 'Brief goes here',
          functions: [],
          living_systems: []
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
