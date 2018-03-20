// Gulp.js configuration
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {
});	
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:4009",
        files: ["public/*.html"],
        browser: "chrome",
        port: 3009,
	});
});
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('scripts', function() {
    return gulp.src('public/app/auth/**/*.*')
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/build'));
});

gulp.task('scripts-watch', ['scripts'], browserSync.reload);
 gulp.watch("public/app/auth/**/*.*", ['scripts-watch', browserSync.reload]);
 gulp.watch("public/dist/css/*.css",[browserSync.reload])