const path = require('path');

const gulp = require('gulp');

const clean = require('gulp-rimraf');

const dot = require('dot');
const template = require('gulp-dot-template');
const prettifyHtml = require('gulp-html-prettify');

const cssimport = require('gulp-cssimport');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const rootFolder = 'www';
const distFolder = 'dist';
// const rootStaticFolder = path.join(rootFolder, 'static');
const staticFolders = ['static', 'img', 'i', 'font'];

const readFiles = require('./gulp/my-gulp-util').readFiles;

gulp.task('clean', function () {
    return gulp.src(path.join(distFolder, '**', '*'), {read: false})
        .pipe(clean({force: true}));
});


gulp.task('dot', function (cb) {

    readFiles(path.join(rootFolder, 'chunks'), {test: /\.dot$/})
        .then(chunks =>
            gulp.src(path.join(rootFolder, '*.html'))
                .pipe(template({chunks, dot}))
                .pipe(gulp.dest(distFolder))
                .on('end', cb)
        );

});

gulp.task('prettify-html', function () {
    return gulp.src(path.join(distFolder, '*.html'))
        .pipe(prettifyHtml({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest(distFolder));
});

gulp.task('html', gulp.series('dot', 'prettify-html'));

gulp.task('watch:html', function () {
    gulp.watch([path.join(rootFolder, '**', '*.html'), path.join(rootFolder, '**', '*.dot')], gulp.series('html'));
});


gulp.task('import-css', function () {
    return gulp.src(path.join(rootFolder, 'css', 'main', 'main.scss'))
        .pipe(cssimport({}))
        .pipe(gulp.dest(path.join(distFolder, 'css')));
});

gulp.task('sass', function () {
    return gulp.src(path.join(distFolder, 'css', 'main.scss'))
        .pipe(clean({force: true}))
        .pipe(sass())
        .pipe(gulp.dest(path.join(distFolder, 'css')));
});


gulp.task('autoprefix', function () {
    return gulp.src(path.join(distFolder, 'css', 'main.css'))
        .pipe(autoprefixer({
            browsers: ['last 4 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
        .pipe(gulp.dest(path.join(distFolder, 'css')));
});

gulp.task('css', gulp.series('import-css', 'sass', 'autoprefix'));

gulp.task('watch:css', function () {
    gulp.watch(path.join(rootFolder, '**', '*.scss'), gulp.series('css'));
});


gulp.task('js', function () {
    return gulp.src(path.join(rootFolder, 'js', '**', '*')).pipe(gulp.dest(path.join(distFolder, 'js')));
});

gulp.task('watch:js', function () {
    gulp.watch(path.join(rootFolder, 'js', '**', '*'), gulp.series('js'));
});


gulp.task('copy-data', function () {
    return Promise
        .all(staticFolders.map(folder => {
                return new Promise((resolve, reject)=> {
                    gulp
                        .src(path.resolve(rootFolder, folder, '**', '*'))
                        .pipe(gulp.dest(path.resolve(distFolder, folder)))
                        .on('end', resolve)
                        .on('error', reject);
                })
            })
        );
});

gulp.task('watch:copy-data', function () {
    gulp.watch(
        staticFolders.map(folder => path.resolve(rootFolder, folder, '**', '*')),
        gulp.series('copy-data')
    );
});


gulp.task('default', gulp.parallel('html', 'css', 'js', 'copy-data'));
gulp.task('watch', gulp.series('default', gulp.parallel('watch:html', 'watch:css', 'watch:js', 'watch:copy-data')));
