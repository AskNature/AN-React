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
        function: 'Loading...',
        name: 'Loading ...',
        description: 'Loading ...',
        living_system: 'Loading ...'
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
