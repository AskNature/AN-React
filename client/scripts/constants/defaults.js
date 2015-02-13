'use strict';

var Defaults = {

    route: '/',

    page: {
        title: 'Home',
        description: 'A React + Flux application',
        keywords: null

    },

    user: {
	username: 'john.smith',
	firstName: 'John',
	lastName: 'Smith',
	email: 'john.smith@website.com',
  loggedIn: true
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
        description: '',
        living_system: [],
        masterid: '',
        status: ''
      }
      ]
    },

    strategy_detail: {
      results : [
      {
          name: 'Nature is Coming...',
          summary: '...and She\'s Pissed',
          masterid: 'masterid',
          media: [],
          brief: 'Brief goes here',
          functions: [],
          living_system: [],
          products: [],
          sources: ['Loading'],
          collectors: [],
          experts: [],
          keywords: 'Tag1, tag2'
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
