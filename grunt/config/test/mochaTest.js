var taskConfig = function(grunt) {
    grunt.config.set('mochaTest', {
	test: {
	    options: {
		reporter: 'spec',
		captureFile: 'mocha_results.log',
		quiet: false,
		clearRequireCache: false
	    },
	    src: ['test/api/*.js']
	}
    });
};

module.exports = taskConfig;
