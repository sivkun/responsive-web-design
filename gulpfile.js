var gulp = require('gulp');
var rev = require('gulp-rev'); //给文件加版本号,hash码
var revReplace = require('gulp-rev-replace'); //文件名改变，在引用的地方改变名字
var useref = require('gulp-useref'); //解析优化html中的代码块，将多个css或js合成一个文件
var filter = require('gulp-filter');
var uglify = require('gulp-uglify'); //压缩js
var csso = require('gulp-csso'); //压缩css

gulp.task('default', function() {
    var jsFilter = filter('**/*.js', { restore: true });
    var cssFilter = filter('**/*.css', { restore: true });
    var indexHtmlFilter = filter(['**/**', '!**/index.html'], { restore: true });

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});
