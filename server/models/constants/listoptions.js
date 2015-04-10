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

var UserStatus = [
    {label: 'Participant (Probationary)', masterid:'participant-probationary'},
    {label: 'Participant', masterid:'participant'},
    {label: 'Editor', masterid:'editor'},
    {label: 'Admin', masterid:'admin'},
    {label: 'Owner', masterid:'owner'},
    {label: 'Watchlist', masterid:'watchlist'},
    {label: 'Revoked', masterid:'revoked'},
    {label: 'Spam', masterid:'spam'}
];

var License = [
    {label: 'PD - Public Domain', masterid:'pd'},
    {label: 'CC-by-nc-nd - Attribution Non-commercial No Derivatives', masterid:'CC-by-nc-nd'},
    {label: 'CC-by-nc-sa - Attribution Non-commercial Share Alike', masterid:'CC-by-nc-sa'},
    {label: 'CC-by-nc - Attribution Non-commercial', masterid:'CC-by-nc'},
    {label: 'CC-by-nd - Attribution No Derivatives', masterid:'CC-by-nd'},
    {label: 'CC-by-sa - Attribution Share Alike', masterid:'CC-by-sa'},
    {label: 'CC-by - Attribution', masterid:'CC-by'},
    {label: 'Copyright - All Rights Reserved', masterid:'Copyright'},
    {label: 'GFDL - Gnu Free Document License', masterid:'GFDL'}
];

module.exports = {
  ContentStatus : ContentStatus,
  UserStatus : UserStatus,
  License : License
};
