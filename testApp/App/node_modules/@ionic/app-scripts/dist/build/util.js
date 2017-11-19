"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var Constants = require("../util/constants");
var glob_util_1 = require("../util/glob-util");
var helpers_1 = require("../util/helpers");
function scanSrcTsFiles(context) {
    var srcGlob = path_1.join(context.srcDir, '**', '*.ts');
    var globs = [srcGlob];
    var deepLinkDir = helpers_1.getStringPropertyValue(Constants.ENV_VAR_DEEPLINKS_DIR);
    // these two will only not be equal in some weird cases like for building Ionic's demos with our current repository set-up
    if (deepLinkDir !== context.srcDir) {
        globs.push(path_1.join(deepLinkDir, '**', '*.ts'));
    }
    return glob_util_1.globAll(globs).then(function (results) {
        var promises = results.map(function (result) {
            var promise = helpers_1.readFileAsync(result.absolutePath);
            promise.then(function (fileContent) {
                context.fileCache.set(result.absolutePath, { path: result.absolutePath, content: fileContent });
            });
            return promise;
        });
        return Promise.all(promises);
    });
}
exports.scanSrcTsFiles = scanSrcTsFiles;
