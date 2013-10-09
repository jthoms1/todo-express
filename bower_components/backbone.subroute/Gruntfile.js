module.exports = function ( grunt ) {
    grunt.initConfig( {

        pkg: grunt.file.readJSON( 'package.json' ),
        uglify: {
            dist: {
                options: {
                    report: "gzip"                    
                },
                src: '<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'backbone.subroute.js', 'spec/js/*.js']
        },
        connect: {
            uses_defaults: {}
        },
        jasmine: {
            all: {
                src: 'backbone.subroute.js',
                options: {
                    host : 'http://127.0.0.1:8000/',
                    vendor: ['lib/underscore.js', 'lib/backbone.js', 'spec/lib/sinon-1.3.4.js', 'spec/lib/jasmine-sinon.js'],
                    specs: 'spec/js/*specs.js',
                    helpers: 'spec/js/*helper.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: '.istanbul/coverage.json',
                        report: {
                            type: 'text-summary',
                            options: {
                                dir: 'spec'
                            }
                        },
                        thresholds: {
                            lines: 85,
                            statements: 85,
                            branches: 66,
                            functions: 83
                        }
                    }
                }
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-jasmine' );

    grunt.registerTask( 'lint', ['jshint'] );
    grunt.registerTask( 'travis', ['jshint', 'connect', 'jasmine'] );
    
    grunt.registerTask( 'default', ['jshint', 'uglify', 'connect', 'jasmine'] );
};
