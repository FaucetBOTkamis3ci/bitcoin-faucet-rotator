var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var elixir = require('laravel-elixir');
var concatCSS = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var minifyJS = require('gulp-minify');

/**
 * Copy any needed files.
 *
 * Do a 'gulp copyfiles' after bower updates
 */
gulp.task("copyfiles", function() {

    gulp.src("resources/assets/css/table_sorter_themes/blue/*.gif")
        .pipe(gulp.dest("public/assets/css/table_sorter_themes/blue"));

    // Copy jQuery, Bootstrap, and FontAwesome
    gulp.src("vendor/bower_components/jquery/dist/jquery.js")
        .pipe(gulp.dest("resources/assets/js/jquery"));

    // JQuery UI //
    gulp.src("vendor/bower_components/jquery-ui/ui/**")
        .pipe(gulp.dest("resources/assets/js/jquery-ui/"));

    gulp.src("vendor/bower_components/jquery-ui/jquery-ui.js")
        .pipe(gulp.dest("resources/assets/js/jquery-ui"));

    gulp.src("vendor/bower_components/jquery-ui/themes/dark-hive/**")
        .pipe(gulp.dest("resources/assets/css/jquery-ui/dark-hive/"));

    gulp.src("vendor/bower_components/jquery-ui/themes/dark-hive/images/**")
        .pipe(gulp.dest("public/assets/css/jquery-ui/dark-hive/images"));

    gulp.src("vendor/bower_components/blockadblock/blockadblock.js")
        .pipe(gulp.dest("resources/assets/js/blockadblock"));

    // Bootstrap SASS Official //
    gulp.src("vendor/bower_components/bootstrap-sass-official/assets/stylesheets/**")
        .pipe(gulp.dest("resources/assets/sass/bootstrap-sass-official/"));

    gulp.src("vendor/bower_components/bootstrap-sass-official/assets/javascripts/**")
        .pipe(gulp.dest("resources/assets/js/bootstrap-sass-official/"));

    gulp.src("vendor/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**")
        .pipe(gulp.dest("resources/assets/css/fonts/bootstrap/"));

    gulp.src("resources/assets/css/fonts/bootstrap/**")
        .pipe(gulp.dest("public/assets/css/fonts/bootstrap/"));

    // Font Awesome //
    gulp.src("vendor/bower_components/font-awesome/css/font-awesome.css")
        .pipe(gulp.dest("resources/assets/css/font-awesome/"));

    gulp.src("vendor/bower_components/font-awesome/fonts/**")
        .pipe(gulp.dest("resources/assets/css/fonts"));

    gulp.src("vendor/bower_components/font-awesome/fonts/**")
        .pipe(gulp.dest("public/assets/css/fonts"));
});

/**
 * Default gulp is to run this elixir stuff
 */
elixir(function(mix) {

    // Combine needed Javascript/JQuery files
    mix.scripts([
            'js/jquery/jquery.js',
            'js/jquery-ui/jquery-ui.js',
            'js/bootstrap-sass-official/bootstrap.js',
            'js/blockadblock/blockadblock.js',
            'js/custom/jquery.simplemodal-1.4.4.js',
            'js/custom/jquery.tablesorter.js',
            'js/custom/laravel_delete_resource.js',
            'js/custom/modal_dialog.js',
            'js/custom/tablesorter_custom_code.js'
        ],
        'public/assets/js/freebtc.js',
        'resources/assets/'
    );

    // Compile Sass
    mix.sass('custom.scss', 'resources/assets/css/custom.css');
    mix.sass('bootstrap-sass-official.scss', 'resources/assets/css/bootstrap-sass-offical/bootstrap-sass-offical.css');

    // Combine CSS
    gulp.src('resources/assets/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concatCSS("freebtc.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/css/'));

});

gulp.task('minify', function(){

    // Minify CSS
    gulp.src('public/assets/css/freebtc.css')
        .pipe(minifyCSS())
        .pipe(rename('freebtc.min.css'))
        .pipe(gulp.dest('public/assets/css/'));

    // Minify Javascript/JQuery
    gulp.src('public/assets/js/freebtc.js')
        .pipe(minifyJS())
        .pipe(rename('freebtc.min.js'))
        .pipe(gulp.dest('public/assets/js/'));

    gulp.src('public/assets/js/rotator.js')
        .pipe(minifyJS())
        .pipe(rename('rotator.min.js'))
        .pipe(gulp.dest('public/assets/js/'));

    gulp.src('public/assets/js/paymentProcessorRotator.js')
        .pipe(minifyJS())
        .pipe(rename('paymentProcessorRotator.min.js'))
        .pipe(gulp.dest('public/assets/js/'));
});