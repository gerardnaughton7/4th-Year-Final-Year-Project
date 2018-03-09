import * as mongoose from 'mongoose'

// Interface Image Model for TypeScript
export interface ImageModelInterface extends mongoose.Document {
    filename: string; 
    adID: string;
    created: Date;
};

// Actual DB model
export var imageSchema = new mongoose.Schema({
    filename: String,
    adID: String,
    created: { type: Date, default: Date.now }
});

export const Image = mongoose.model<ImageModelInterface>('Image', imageSchema);
