'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import include from 'gulp-file-include';
import connect from  'gulp-connect';
import gulpAmpValidator from  'gulp-amphtml-validator';
import del from 'del';

//const es6에 도입된 읽기전용 값은 상수를 선언할때 사용합니다.
const DIR = {
    SRC: 'src',
    DIST: 'dist'
};

const SRC = {
    JS: DIR.SRC + '/js/*.js',
    DATA: DIR.SRC + '/data/*',
    CSS: DIR.SRC + '/css/*.css',
    SCSS: DIR.SRC + '/scss/*.scss',
    HTML: DIR.SRC + '/*.html',
    AMP: DIR.SRC + '/*.amp.html',
    INC: DIR.SRC + '/inc/*',
    IMAGES: DIR.SRC + '/img/*'
};

const DIST = {
    JS: DIR.DIST + '/js',
    DATA: DIR.DIST + '/data',
    CSS: DIR.DIST + '/css',
    SCSS: DIR.DIST + '/css',
    HTML: DIR.DIST + '/',
    IMAGES: DIR.DIST + '/img'
};

gulp.task('connect', () => {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 3000
    });
});

gulp.task('js', () => {
   return gulp.src(SRC.JS)
       .pipe(uglify())
       .pipe(gulp.dest(DIST.JS));
});

gulp.task('data', () => {
    return gulp.src(SRC.DATA)
        .pipe(gulp.dest(DIST.DATA));
});

gulp.task('css', () => {
    return gulp.src(SRC.CSS)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(DIST.CSS));
});

gulp.task('sass', () => {
    return  gulp.src(SRC.SCSS)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(DIST.SCSS))
        .pipe(connect.reload());
});

gulp.task('html', () => {
    return gulp.src(SRC.HTML)
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin(/*{collapseWhitespace: true}*/))
        .pipe(gulp.dest(DIST.HTML))
        .pipe(connect.reload());
});

gulp.task('amphtml:validate', () => {
    return gulp.src(SRC.AMP)
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulpAmpValidator.validate())
        .pipe(gulpAmpValidator.format())
        .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('inc', ()=> {
    return gulp.src(SRC.INC)
        .pipe(gulp.dest(DIST.HTML))
        .pipe(connect.reload());
});

gulp.task('img', () => {
    return gulp.src(SRC.IMAGES)
        .pipe(imagemin())
        .pipe(gulp.dest(DIST.IMAGES));
});

gulp.task('clean', () => {
    return del.sync([DIR.DIST]);
});

gulp.task('watch', () => {
    gulp.watch(SRC.JS, ['js']);
    gulp.watch(SRC.DATA, ['data']);
    gulp.watch(SRC.CSS, ['css']);
    gulp.watch(SRC.SCSS, ['sass']);
    gulp.watch(SRC.HTML, ['html']);
    gulp.watch(SRC.INC, ['html']);
    gulp.watch(SRC.IMAGES, ['img']);
});

gulp.task('default', ['connect', 'clean', 'js', 'data', 'css', 'sass', 'html', 'amphtml:validate', 'img', 'watch'], () => {
   return gutil.log('gulp is running');
});