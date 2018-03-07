//Visit this for jshint -https://github.com/jshint/jshint/blob/4c2d091b7e50ce2681ee48a104578bb969c189ae/examples/.jshintrc#L79
// var requirejsCompileSkip    = require('./tasks/requirejs-compile-skip.json');
var pkg                     = require('./package.json');
var buildnumber             = pkg.buildnum;
var buildversion            = 'build_v' + buildnumber;
var buildpath               = 'public/build_v' + buildnumber + '/';
var pub                     = pkg.nextprint.public;  // "../public/"
var tmp                     = pkg.nextprint.temp;    // "../public/tmp/"
var bld                     = pkg.nextprint.build;   // "../public/build/"
var api                     = pkg.nextprint.api;     // "../public/api/"
var less                    = pkg.nextprint.less;    // "../less-files"
var css                     = pkg.nextprint.css;     // "../public/styles/css"
var idx                     = pkg.nextprint.index;   // "../public/index.html"
var production              = true;
module.exports = function (grunt) {
 



    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist"],
 
        copy: {
            main: {
                expand: true,
                cwd: 'public/',
                src: ['**', 'js/**', '!dist/**', '!build/**','!**/*.css'],
                dest: 'public/build/copyFile'
            }
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            },
             public: {
            files: {
            'public/build/jsFile/output.min.js': ['public/js/**.js','public/js/**/*.js']
             }
            }   
        },
        cssmin: {
              target: {
                files: [{
                  expand: true,
                  cwd: 'public/dist/css',
                  src: ['*.css', '!*.min.css'],
                  dest: 'public/build/tempFile',
                  ext: '.min.css'
                }]
                    }
                },
        jshint: {
            options: {
                  curly: true,
                  eqeqeq: true,
                  eqnull: true,
                  browser: true,
                  node: true, //it will remove errors like require, process is not defined
                  expr: true, // it will remove error like,Expected an assignment or function call and instead saw an expression.
                  eqeqeq: false, // errors like Expected '===' and instead saw '=='.
                  globals: {
                    jQuery: true
                  },
                  esversion: 6 //will process es6 functions
                },
                all: ['server.js','lib/**/*.js','lib/**.js']
                
            },

    // 'xsltproc' : grunt-xsltproc
    // Description: Creates JSON files from processed XML via XSLT
    xsltproc: {
      en_us: {
        options: {
          stylesheet: api + 'langs/api/langs-transformation/language-to-json-update.xsl',
          stringparams: {
            'lang': 'en-us'
          }
        },
        files: {
          'public/api/langs/en-us.json': [api + 'langs/api/language.xml']
        }
      },
      fr_ca: {
        options: {
          stylesheet: api + 'langs/api/langs-transformation/language-to-json-update.xsl',
          stringparams: {
            'lang': 'fr-ca'
          }
        },
        files: {
          'public/api/langs/fr-ca.json': [api + 'langs/api/language.xml']
        }
      },
      en_ca: {
        options: {
          stylesheet: api + 'langs/api/langs-transformation/language-to-json-update.xsl',
          stringparams: {
            'lang': 'en-ca'
          }
        },
        files: {
          'public/api/langs/en-ca.json': [api + 'langs/api/language.xml']
        }
      }

    },
    });
 
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-xsltproc');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        /*'copy' , 'useminPrepare', 'concat',*/ 'uglify' , 'cssmin' , 'jshint' ,'xsltproc'/*, 'usemin'*/
    ]);
};