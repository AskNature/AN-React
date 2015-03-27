'use strict';

var ContentStatus = [
    {label: 'Published', masterid:'published'},
    {label: 'Duplicate', masterid:'duplicate'},
    {label: 'Flagged for Review', masterid:'flagged-for-review'},
    {label: 'Spam', masterid:'spam'},
    {label: 'Under Review', masterid:'under-review'},
    {label: 'Archived', masterid:'archived'},
    {label: 'Draft', masterid:'draft'},
    {label: 'Ready for Review', masterid:'ready-for-review'},
    {label: 'Incomplete Entry', masterid:'incomplete-entry'}
];

// Todo: Add UserStatus

module.exports = {
  'ContentStatus' : ContentStatus
};
