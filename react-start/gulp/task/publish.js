/**
 * Created by ywbshiwo on 15/11/26.
 */
var gulp = require("gulp");
//var babel = require("gulp-babel");
//var react = require("gulp-react");
var exec = require("child_process").exec;

gulp.task('build-jsx',function(cb){
    //gulp-babel编译速度太慢
    //直接用命令行编译
    //return gulp.src(['src/js/**/*.jsx'])
    //    .pipe(react())
    //    .pipe(babel({
    //        presets: ['es2015']
    //    }))
    //    .pipe(gulp.dest("dist/js"));
    exec("babel --optional es7.objectRestSpread src -d dist", function (err) {
        if(err){
            console.log(err);
            cb(err);
            return;
        }
        cb();
    });
});
