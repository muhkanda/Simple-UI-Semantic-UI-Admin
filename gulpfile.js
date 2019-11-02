var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sassGlob    = require('gulp-sass-glob');
var inject      = require('gulp-inject');
var browserSync = require('browser-sync').create();
var del         = require('del');
var paths       = {
    css         : {
        src     : 'app/scss/*.scss',
        dest    : 'dist/css/'
    },
    js          : {
        src     : 'app/js/*.js',
        dest    : 'dist/js/'
    },
    html        : {
        src     : 'app/*.html',
        dest    : 'dist/*.html'
    },
    builds      : {
        src     : 'app',
        dest    : 'dist'
    },
    images      : {
        src     : 'app/images/**/*.*',
        dest    : 'dist/images'
    },
    fomantic    : {
        src     : 'node_modules/fomantic-ui/dist/**/*.*',
        dest    : 'dist/vendors/fomantic-ui/',
        css     : 'dist/vendors/fomantic-ui/semantic.min.css',
        js      : 'dist/vendors/fomantic-ui/semantic.min.js'
    },
    jquery      : {
        src     : 'node_modules/jquery/dist/**/*.*',
        dest    : 'dist/vendors/jquery/',
        js      : 'dist/vendors/jquery/jquery.min.js'
    },
    chartJs     : {
        src     : 'node_modules/chart.js/dist/**/*.*',
        dest    : 'dist/vendors/chart.js/',
        js      : 'dist/vendors/chart.js/Chart.min.js',
        utils   : 'dist/vendors/chart.js/Chart.utils.js',
        example : 'dist/vendors/chart.js/Chart.example.js'
    },
    dataTables  : {
        // - Source
        src     : 'node_modules/datatables.net/**/*.*',
        semantic: 'node_modules/datatables.net-se/**/*.*',
        dtbRes  : 'node_modules/datatables.net-responsive/**/*.*',
        dtbresSe: 'node_modules/datatables.net-responsive-se/**/*.*',
        dtbBtn  : 'node_modules/datatables.net-buttons/**/*.*',
        dtbbtnSe: 'node_modules/datatables.net-buttons-se/**/*.*',
        // - Destination
        dest    : 'dist/vendors/datatables.net/',
        destSe  : 'dist/vendors/datatables.net/datatables.net-se/',
        destRes : 'dist/vendors/datatables.net/datatables.net-responsive/',
        destrSe : 'dist/vendors/datatables.net/datatables.net-responsive-se/',
        destBtn : 'dist/vendors/datatables.net/datatables.net-buttons/',
        destbtSe: 'dist/vendors/datatables.net/datatables.net-buttons-se/'
    },
    jsZip       : {
        src     : 'node_modules/jszip/dist/**/*.*',
        dest    : 'dist/vendors/jszip/'
    },
    pdfMake     : {
        src     : 'node_modules/pdfmake/build/**/*.*',
        dest    : 'dist/vendors/pdfmake/'
    }
};

function cpFomantic(done){
    del.sync(paths.fomantic.dest);
    gulp.src(paths.fomantic.src)
    .pipe(gulp.dest(paths.fomantic.dest));
    done()
}

function cpDatatables(done){
    del.sync(paths.dataTables.dest);
    // - Datatables
    gulp.src(paths.dataTables.src)
    .pipe(gulp.dest(paths.dataTables.dest));
    // - Datatables Semantic
    gulp.src(paths.dataTables.semantic)
    .pipe(gulp.dest(paths.dataTables.destSe));
    // - Datatables Responsive
    gulp.src(paths.dataTables.dtbRes)
    .pipe(gulp.dest(paths.dataTables.destRes));
    // - Datatables Responsive Semantic
    gulp.src(paths.dataTables.dtbresSe)
    .pipe(gulp.dest(paths.dataTables.destrSe));
    // - Datatables Button
    gulp.src(paths.dataTables.dtbBtn)
    .pipe(gulp.dest(paths.dataTables.destBtn));
    // - Datatables Button Semantic
    gulp.src(paths.dataTables.dtbbtnSe)
    .pipe(gulp.dest(paths.dataTables.destbtSe));
    done()
}

function cpjsZip(done){
    del.sync(paths.jsZip.dest);
    gulp.src(paths.jsZip.src)
    .pipe(gulp.dest(paths.jsZip.dest));
    done()
}

function cppdfMake(done){
    del.sync(paths.pdfMake.dest);
    gulp.src(paths.pdfMake.src)
    .pipe(gulp.dest(paths.pdfMake.dest));
    done()
}

function cpImg(done){
    del.sync(paths.images.dest);
    gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
    done()
}

function cpJs(done){
    del.sync(paths.js.dest);
    gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest));
    done()
}

function cpJquery(done){
    del.sync(paths.jquery.dest);
    gulp.src(paths.jquery.src)
    .pipe(gulp.dest(paths.jquery.dest));
    done()
}

function cpChartJs(done){
    del.sync(paths.chartJs.dest);
    gulp.src(paths.chartJs.src)
    .pipe(gulp.dest(paths.chartJs.dest));
    done()
}

function cssStyles(){
	return gulp.src(paths.builds.src + '/scss/main.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream())
}

function reload(done){
    browserSync.reload()
    done()
}

function styleInject(done){
	var targetFiles     = gulp.src(paths.html.src);
	var injectFiles     = gulp.src([
        paths.jquery.js, // - Jquery
        paths.fomantic.css, paths.fomantic.js, // - Fomantic-UI
        paths.chartJs.js, paths.chartJs.utils, paths.chartJs.example, // - ChartJS
        // - DataTables
        paths.dataTables.dest + 'js/jquery.dataTables.min.js', 
        paths.dataTables.destSe + '**/*.min.*',
        paths.dataTables.destRes + 'js/dataTables.responsive.min.js',
        paths.dataTables.destrSe + '**/*.min.*',
        paths.dataTables.destBtn + 'js/dataTables.buttons.min.js',
        paths.dataTables.destBtn + 'js/buttons.!(flash).min.js',
        paths.dataTables.destbtSe + '**/*.min.*',
        // - End DataTables
        paths.jsZip.dest + 'jszip.min.js', // - JsZip
        paths.pdfMake.dest + '**/!(pdfmake).js', // - PdfMake
        paths.css.dest + 'main.css', paths.js.dest + 'main.js' // - Simple-UI
        ]);
    var injectOptions   = {
        addRootSlash: false,
        ignorePath: [paths.builds.dest]
    };
  	return targetFiles.pipe(inject(injectFiles, injectOptions))
    .pipe(gulp.dest(paths.builds.dest))
    done()
}

function suWatch(){
    browserSync.init({
        server: {
            baseDir : paths.builds.dest
        }
    });
    gulp.watch(paths.css.src, cssStyles);
    gulp.watch(paths.html.src, styleInject);
    gulp.watch(paths.html.dest, reload);
    gulp.watch(paths.jquery.src, cpJquery);
    gulp.watch(paths.fomantic.src, cpFomantic);
    gulp.watch([
        paths.dataTables.src,
        paths.dataTables.semantic,
        paths.dataTables.dtbRes,
        paths.dataTables.dtbresSe,
        paths.dataTables.dtbBtn,
        paths.dataTables.destbtSe
        ], cpDatatables);
    gulp.watch(paths.jsZip.src, cpjsZip);
    gulp.watch(paths.pdfMake.src, cppdfMake);
    gulp.watch(paths.js.src, cpJs);
    gulp.watch(paths.js.src, reload);
    gulp.watch(paths.chartJs.src, cpChartJs);
    gulp.watch(paths.images.src, cpImg);
}

function suDev(done){
    gulp.series([
        cpJquery,
        cpFomantic,
        cpDatatables,
        cpjsZip,
        cppdfMake,
        cpJs,
        cpChartJs,
        cpImg
        ])();
    gulp.series(styleInject);
    done()
}

exports.simpleui = gulp.series(suDev, suWatch, reload);