//Visit this for jshint -https://github.com/jshint/jshint/blob/4c2d091b7e50ce2681ee48a104578bb969c189ae/examples/.jshintrc#L79
 var requirejsCompileSkip    = require('./Grunt/tasks/requirejs-compile-skip.json');
var pkg                     = require('./package.json');
var buildnumber             = pkg.buildnum;
var buildversion            = 'build_v' + buildnumber;
var buildpath               = 'public/build_v' + buildnumber + '/';
var pub                     = pkg.nextprint.public;  // "public/"
var tmp                     = pkg.nextprint.temp;    // "public/tmp/"
var bld                     = pkg.nextprint.build;   // "public/build/"
var api                     = pkg.nextprint.api;     // "public/api/"
var less                    = pkg.nextprint.less;    // "less-files"
var css                     = pkg.nextprint.css;     // "public/styles/css"
var idx                     = pkg.nextprint.index;   // "public/index.html"
var production              = false;
module.exports = function (grunt) {
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //clear :post
        //Descrition: Erase temp directory
        clean: {
            //Erase the temp and build dirs
            pre:{
                options: {
                    force: true
                },
                src: [
                    'public/build_v*',
                    tmp
                ]
            },
            //Erase temp directory
            post:{
                 options: {
                    force: true
                },
                src: [
                    tmp
                ]
            }
        },
 
        /*
        *copy:post
        *Description: copy lazy minifyed files to build dir
        */
        copy: {
            pre: {
                expand:true,
                cwd: pub+'app/',
                src:[
                    '**'
                ],
                dest:tmp
            },
            post: {
                  expand:true,
                cwd: tmp,
                src:[
                    '*/**',
                    'rconfig.js',
                    '!**/*.tpl.html'
                ],
                dest: buildpath //SSM 062016
                //dest: bld
            }
        },
        
        
        requirejs: {
            compile: {
                options: {
                    baseUrl: tmp,
                    paths: requirejsCompileSkip,
                    mainConfigFile: tmp + 'rconfig.js',
                    name: "main",
                    optimize: "none",
                    uglify2: {
                        mangle: false
                    },
                    out: buildpath + "main.js",
                    
                    done: function(done,output){
                        console.log("done requirejs")
                        done();
                    }
                }
            }
        },
        
        //description: switch back to lazy-loading
        turnOnPotatoDeclaration: {
            tmp: {
                expand: true,
                src: [
                    tmp+ '*/**/*.js',
                    tmp+ 'app.js'
                ]
            }
        },
        
        //'html2js'
        //Description: concatenate a;; *.tpl.html template to one angular module
        html2js: {
            options: {
                base: tmp,
                module: 'smart-templates',
                singleModule: true,
                
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false,
                    removeComments: true,
                    removeRedundantAttributes: false
                },
                rename: function(moduleName){
                    return buildversion + '/'+moduleName
                }
            },
            main: {
                src :[tmp + '**/*.tpl.html'],
                dest: [tmp + 'smart-templates.js']
            }
        },
        	//'addIncludes'
		// Description: additional includes for build (templates from prev step -- html2js)
		addIncludes: {
			options: {
				appFile: tmp + 'app.js',
				includesFile: tmp + 'includes.js'
			},
			templates: {
				options: {
					angularModule: true,
					wrapToDefine: true,
					name: 'smart-templates',
					injectToApp: true
				},
				src: [
					tmp + 'smart-templates.js'
				]

			}

		},
        //'uglify',
		//Description: minification
		uglify: {
			tmp: {
				expand: true,
				cwd: tmp,
				src: [
					'**/*.js'
				],
				dest: tmp,
				ext: '.js'
			}
		},
        //clean:post
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
        //For converting Yaml file to json use grunt-yaml
     yaml: {
        your_target: {
            options: {
//                ignored: /^_/,
                space: 4,
                customTypes: {
                    '!include scalar': function(value, yamlLoader) {
                    return yamlLoader(value);
                    },
                    '!max sequence': function(values) {
                    return Math.max.apply(null, values);
                    },
                    '!extend mapping': function(value, yamlLoader) {
                    return _.extend(yamlLoader(value.basePath), value.partial);
                }
            }
      },
      files: [
        {src: ['api/swagger/*.yaml'], dest: 'api/dist/swagger.json'}
      ]
    },
  },
        //'htmlmin' : grunt-contrib-htmlmin
		//Description: minify html
		htmlmin: {

			development: {
				options: {
					collapseBooleanAttributes: true,
					removeRedundantAttributes: true,
					preventAttributesEscaping: true,
					caseSensitive: true
				},
				files: [{
					expand: true,
					cwd: pub + 'app/modules',
					src: ['**/*.html', '**/*.tpl.html'],
					//dest: bld + 'modules'
					dest: buildpath + 'modules'
				}]
			},

			production: {
				options: {
					collapseWhitespace: true,
					removeComments: true,
					collapseBooleanAttributes: true,
					removeRedundantAttributes: true,
					preventAttributesEscaping: true,
					caseSensitive: true
				},
				files: [{
					expand: true,
					cwd: pub + 'app/modules',
					src: ['**/*.html', '**/*.tpl.html'],
					//dest: bld + 'modules'
					dest: buildpath + 'modules'
				},
				{
					expand: true,
					cwd: pub + 'app/layout',
					src: ['**/*.html', '**/*.tpl.html'],
					//dest: bld + 'layout'
					dest: buildpath + 'layout'
				},
				{
					expand: true,
					cwd: pub + 'app/components',
					src: ['**/*.html', '**/*.tpl.html'],
					//dest: bld + 'dashboard'
					dest: buildpath + 'components'
				},
				{
					expand: true,
					cwd: pub + 'app/auth',
					src: ['**/*.html', '**/*.tpl.html'],
					//dest: bld + 'auth'
					dest: buildpath + 'auth'
				}]
			}
		},
        // 'string-replace' : grunt-string-replace
		// Description: Replaces strings on files by using string or regex patterns.
		// Attempts to be a String.prototype.replace adapter task for your grunt project.
		'string-replace': {
			dist: {
				files: {
					'<%= srconfig.dist %>' : '<%= srconfig.src %>'
				},
				options: {
					replacements: [
						{
							pattern: /build_v(\d+)/ig,
							replacement: buildversion
						}
					]
				}
			}
		},

		// 'buildnumber' : grunt-build-number
		// Description: Adds a build number to the package.json (or other files)
		buildnumber: {
			options: {
				field: 'buildnum'
			},
			files: [
				'package.json'
			]
		},

    });
 
    grunt.loadNpmTasks('grunt-string-replace');

	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadNpmTasks('grunt-contrib-copy');
    
	grunt.loadNpmTasks('grunt-contrib-requirejs');
    
    grunt.loadNpmTasks('grunt-html2js');

	grunt.loadNpmTasks('grunt-contrib-htmlmin');
    
    grunt.loadNpmTasks('grunt-build-number');

	grunt.loadNpmTasks('grunt-xsltproc');
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.loadNpmTasks('grunt-yaml');
    
    grunt.loadTasks('tasks');

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'uglify' ,
        'cssmin' ,
        'jshint' ,
        'xsltproc',
        'yaml',
        'buildnumber',
		'clean:pre',
		'copy:pre',
		'turnOffPotatoDeclaration',
        'html2js',
        'requirejs',
		'copy:post',
		'clean:post',
		'htmlmin:production',
		'string-replace'
    ]);
    
    grunt.registerTask('htmlminProduction', [
		'htmlmin:production'
	]);

	grunt.registerTask('htmlminDevelopment', [
		'htmlmin:development'
	]);
};