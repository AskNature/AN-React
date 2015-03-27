'use strict';

var ContentStatus = [
    {label: 'Published', masterid:'published'},
    {label: 'Draft', masterid:'draft'},
    {label: 'Ready for Review', masterid:'ready-for-review'},
    {label: 'Flagged for Review', masterid:'flagged-for-review'},
    {label: 'Under Review', masterid:'under-review'},
    {label: 'Archived', masterid:'archived'},
    {label: 'Spam', masterid:'spam'},
    {label: 'Duplicate', masterid:'duplicate'},
    {label: 'Incomplete Entry', masterid:'incomplete-entry'}
];

// Todo: Add UserStatus

module.exports = {
  'ContentStatus' : ContentStatus
};
