'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');

//Build css
gulp.task('sass', () => {
    return gulp.src('./stylesheets/**/*.sass')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(gulp.dest('./public/css/'))
});

gulp.task('default', () => {
    gulp.watch('./stylesheets/**/*.sass', ['sass']);
});