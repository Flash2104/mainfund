const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

function images() {
	return src('app/images/**/*')
		.pipe(imagemin(
			[
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [
						{ removeViewBox: true },
						{ cleanupIDs: false }
					]
				})
			]
		))
		.pipe(dest('dist/images'))
}

function cleanDist() {
	return del('dist')
}

//обновление 
function browsersync() {
	browserSync.init({
		server: {
			baseDir: "app/"
		}
	});
}

function scripts() {
	return src([
		// 'node_modules/jquery/dist/jquery.js',
		'app/js/jquery-1.10.2.min.js',
		'node_modules/slick-carousel/slick/slick.js',
		'app/js/jquery.magnific-popup.min.js',
		'app/js/main.js',
		'app/js/bootstrap.min.js',
		// 'app/js/yandex-map.js',
		'app/js/d3.v2.js',
		// 'app/js/d3-bootstrap-plugins.js',
		'app/js/d3-bootstrap-plugins-modelimg.js',
		'app/js/proizvodstvo.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

//конвертирует стили из scss в css
function styles() {
	//находим файл
	return src([
		'app/css/normalize.css',
		'app/css/magnific-popup.css',

		'app/css/proizvodstvo.css',
		// 'app/css/template.css',
		// 'node_modules/bootstrap/dist/css/bootstrap.min.css',
		'app/scss/style.scss',
		'node_modules/slick-carousel/slick/slick.css',
	])
		//конвертируем и сжимаем
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		//выкидываем
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function build() {
	return src([
		'app/css/style.min.css',
		'app/fonts/**/*',
		'app/js/main.min.js',
		'app/*.html'
	], { base: 'app' })
		.pipe(dest('dist'))
}

//отслеживает изменения
function watching() {
	watch(['app/scss/**/*.scss'], styles)
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
	watch(['app/*.html']).on('change', browserSync.reload)
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleanDist = cleanDist;

//по порядку удалить 
exports.build = series(cleanDist, images, build);
exports.images = images;

//запускать всё паралельно
exports.default = parallel(styles, scripts, browsersync, watching);