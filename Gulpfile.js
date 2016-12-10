'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');

//Build css
gulp.task('sass', () => {
    return gulp.src('./app/public/sass/**/*.sass')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(gulp.dest('./app/public/css/'))
});

gulp.task('default', () => {
    gulp.watch('./app/public/sass/**/*.sass', ['sass']);
});