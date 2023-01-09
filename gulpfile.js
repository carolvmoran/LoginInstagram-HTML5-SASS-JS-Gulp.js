const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const connect = require("gulp-connect");

const paths = {
    html: {
        all: "src/templates/**/*.html",
    },
    styles: {
        all: "src/styles/**/*.scss",
        main: "src/styles/main.scss",
    },
    scripts: {
        all: "src/scripts/**/*.js",
        main: "src/scripts/app.js",
    },
    images: {
        all: "src/assets/**",
    },
    output: "dist",
};

function server() {
    connect.server({
        root: paths.output,
        livereload: true,
        port: 3000,
    });
}
function sentinel() {
    watch(paths.html.all, { ignoreInitial: false }, html);
    watch(paths.styles.all, { ignoreInitial: false }, styles);
    watch(paths.scripts.all, { ignoreInitial: false }, scripts);
    watch(paths.images.all, { ignoreInitial: false }, moveImages);
}
function html() {
    return src(paths.html.all).pipe(dest(paths.output)).pipe(connect.reload());
}
function styles() {
    return src(paths.styles.main)
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(dest(paths.output))
        .pipe(connect.reload());
}

function scripts() {
    return browserify(paths.scripts.main)
        .transform(
            babelify.configure({
                presets: ["@babel/preset-env"],
            })
        )
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest(paths.output))
        .pipe(connect.reload());
}
function moveImages() {
    return src(paths.images.all).pipe(dest(paths.output));
}

exports.default = parallel(server, sentinel);
