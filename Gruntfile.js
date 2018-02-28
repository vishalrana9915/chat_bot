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
            'public/build/jsFile/output.min.js': ['public/js/**.js']
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
                }
    });
 
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

 
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        /*'copy' , 'useminPrepare', 'concat',*/ 'uglify' , 'cssmin'/*, 'usemin'*/
    ]);
};