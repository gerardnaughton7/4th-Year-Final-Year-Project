"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var Constants = require("./constants");
var helpers_1 = require("./helpers");
function copySourcemaps(context, shouldPurge) {
    return helpers_1.readDirAsync(context.buildDir).then(function (fileNames) {
        var sourceMaps = fileNames.filter(function (fileName) { return fileName.endsWith('.map'); });
        var fullPaths = sourceMaps.map(function (sourceMap) { return path_1.join(context.buildDir, sourceMap); });
        var promises = [];
        var copyBeforePurge = helpers_1.getBooleanPropertyValue(Constants.ENV_VAR_MOVE_SOURCE_MAPS);
        for (var _i = 0, fullPaths_1 = fullPaths; _i < fullPaths_1.length; _i++) {
            var fullPath = fullPaths_1[_i];
            if (copyBeforePurge) {
                fs_extra_1.mkdirpSync(context.sourcemapDir);
                var relativeTo = path_1.relative(fullPath, context.sourcemapDir);
                var fileName = path_1.basename(fullPath);
                if (fileName.indexOf('vendor.js') < 0) {
                    promises.push(helpers_1.copyFileAsync(fullPath, path_1.join(context.sourcemapDir, fileName)));
                }
            }
            if (shouldPurge) {
                promises.push(helpers_1.unlinkAsync(fullPath));
            }
        }
        return Promise.all(promises);
    });
}
function purgeSourceMapsIfNeeded(context) {
    if (helpers_1.getBooleanPropertyValue(Constants.ENV_VAR_GENERATE_SOURCE_MAP)) {
        // keep the source maps and just return
        return copySourcemaps(context, false);
    }
    return copySourcemaps(context, true);
}
exports.purgeSourceMapsIfNeeded = purgeSourceMapsIfNeeded;
