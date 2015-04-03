'use strict';

var Placeholders = {


    user: {
        results : [
          {
            name: 'Username',
            has_media: 'Add Media',
            friends: 'Add Friends',
            activities: 'What are you interested in?'
          }
        ]

    },

    fm: {
      results : [
      {
        name: 'Add a FM name',
        description: 'Add a short paragraph describing this FM in general terms.',
        short_name: '',
        parent: 'What other phenomena is this similar to?',
        has_function: 'What content features this FM as an outcome?',
        has_mechanism: 'What content features this FM as a mechanism?',
        media: 'Add Media'
      }
      ]
    },

    strategy: {
      results : [
      {
          name: 'Add a short phrase highlighting a mechanism and outcome',
          description: 'Add 1-2 sentences that briefly summarize the mechanism/s used by the living system/s to affect an outcome in response to environmental context.',
          media: 'Add Media',
          outcomes: 'Add an Outcome',
          mechanisms: 'Add a Mechanism',
          conditions: 'Add a Condition',
          living_system: 'Add a Living System',
          products: 'Add an Inspired Solution',
          sources: 'Add a Reference Source',
          experts: 'Add a Related Research Lab',
      }
      ]
    },

    product: {
      results : [
      {
        name: 'Add a short phrase highlighting a mechanism and outcome',
        description: 'Add 1-2 sentences that briefly summarize the mechanism/s used by the living system/s to affect an outcome in response to environmental context.',
        inspiredby: 'Add an Inspiring Biological Strategy',
        media: 'Add Media',
        outcomes: 'Add an Outcome',
        mechanisms: 'Add a Mechanism',
        conditions: 'Add a Condition',
        researchers: 'Add a Related Researcher',
        sources: 'Add a Reference Source',
        designedsystems: 'Add a Designed System'
        }
      ]
    },

    collection: {
      results : [
        {
          name: 'What is this collection\'s name?',
          description: 'What\'s your collection about?',
          privacy: 'Keep it private?'
        }
      ]
    },

    condition: {
      results : [
        {
          name: 'Add a short name identifying this contextual condition'
        }
      ]
    },

    livingsystem: {
      results : [
        {
          name: ''
        }
      ]
    },

    researcher: {
      results : [
        {
          name: 'What\'s the name of this individual or group?',
          studies: 'What content is their focus of study?'
        }
      ]
    },

    source: {
      results : [
        {
          name: 'Add the name of the reference source',
          featured_in: 'Add content that references this source?',
        }
      ]
    },

    media: {
      results : [
        {
          name: 'Add a short caption for this image.',
          has_media: 'Add this image to your content',
        }
      ]
    },


};

module.exports = Placeholders;
