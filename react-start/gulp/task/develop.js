/**
 * Created by ywbshiwo on 15/11/26.
 */
var gulp = require("gulp");
var babel = require("gulp-babel");
var bs = require("browser-sync").create();
var exec = require("child_process").exec;




gulp.task('default',['wacth-jsx','bs-watch'],function(){
    bs.init({
        server: "./../react-start"
    });
});

gulp.task('wacth-jsx', function () {

    //babel --optional es7.objectRestSpread src -d dist -w"
    //return gulp.watch(['src/js/**/*.jsx','!src/js/lib'], function (event) {
    //    var path = event.path.replace(process.cwd()+"/","");
    //
    //    //这里的命令行不如babel原来的明显,可以将就着用
    //    var cmd = "babel --optional es7.objectRestSpread "+path+" -d dist";
    //    console.log(cmd);
    //    exec(cmd, function (err) {
    //        if(err){
    //            console.log(err);
    //            //cb(err);
    //            return;
    //        }
    //        //cb();
    //    });
    //});
});

gulp.task("bs-watch",['watch-html','watch-css','watch-js']);

gulp.task("watch-html", function () {
    bs.watch("*.html").on("change", bs.reload);
});

gulp.task("watch-css", function () {
    bs.watch("dist/css/**/*.css").on("change", bs.reload);
});

gulp.task("watch-js", function () {
    bs.watch(['dist/js/**/*.js']).on("change", bs.reload);
});