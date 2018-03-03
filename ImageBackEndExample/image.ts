import * as mongoose from 'mongoose'

// Interface for TS
export interface IImageModel extends mongoose.Document {
    filename: string; 
    originalName: string; 
    desc: string;
    roomType: string;
    college: string; 
    eircode: string;
    location: string; 
    price: string; 
    availabilty: string;
    email: string;
    phone: string;
    howContact: string;
    parking: string;
		
    created: Date;
  };

  // Actual DB model
export var imageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    desc: String,
	roomType: String,
	college: String,
	eircode: String,
	location: String, 
	price: String,
	availabilty: String,
	email: String,
	phone: String,
	howContact: String,
	parking: String,
	
    created: { type: Date, default: Date.now }
});

export const Image = mongoose.model<IImageModel>('Image', imageSchema);

