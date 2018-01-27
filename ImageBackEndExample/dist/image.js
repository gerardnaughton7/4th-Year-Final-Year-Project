"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
;
// Actual DB model
exports.imageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    desc: String,
    created: { type: Date, default: Date.now }
});
exports.Image = mongoose.model('Image', exports.imageSchema);
//# sourceMappingURL=image.js.map