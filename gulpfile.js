const postcss = require('gulp-postcss'),
  gulp = require('gulp'),
  runSequence = require('run-sequence'),
  atImport = require('postcss-import'),
  cssnext = require('postcss-cssnext'),
  mixins = require('postcss-mixins'),
  assets = require('postcss-assets'),
  utils = require('postcss-utilities'),
  nested = require('postcss-nested'),
  cssnano = require('gulp-cssnano'),
  realFavicon = require('gulp-real-favicon'),
  browserSync = require('browser-sync'),
  fs = require('fs'),
  reload = browserSync.reload,
  watch = require('gulp-watch');

// Builds css from source
gulp.task('css', function() {
  var plugins = [
    atImport(),
    cssnext({ browsers: ['last 2 versions'] }),
    assets({ loadPaths: ['./images/'] }),
    mixins(),
    utils(),
    nested()
  ];
  return gulp.src('src/*.css').pipe(postcss(plugins)).pipe(cssnano()).pipe(gulp.dest('css'));
});

// Serve in browsers
gulp.task('serve', ['css'], function() {
  browserSync.init({
    server: './',
    reloadDelay: 300
  });
  gulp.watch('src/**/*.css', ['css']).on('change', reload);
  gulp.watch('**/*.html').on('change', reload);
});

// Favicon

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon(
    {
      masterPicture: './images/master-favicon.png',
      dest: './favicon',
      iconsPath: './favicon',
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#ffffff',
          margin: '14%',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#2b5797',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          }
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: '#ffffff',
          manifest: {
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 57.03125,
          themeColor: '#5bbad5'
        }
      },
      settings: {
        compression: 2,
        scalingAlgorithm: 'NearestNeighbor',
        errorOnImageTooSmall: false
      },
      markupFile: FAVICON_DATA_FILE
    },
    function() {
      done();
    }
  );
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', ['generate-favicon'], function() {
  return gulp
    .src(['*.html'])
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
      )
    )
    .pipe(gulp.dest('./'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
});

//default task
gulp.task('default', function(callback) {
  runSequence('css', callback);
});
//Watch tasks
gulp.task('watch', function() {
  runSequence('browserSync', 'watch-css');
  global.watch = true;
  gulp.watch([fullPath.src], ['watch-styles']).on('change', reload);
});
