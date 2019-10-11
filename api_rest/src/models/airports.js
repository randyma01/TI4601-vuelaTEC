import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AirportSchema = new Schema({});

export default mongoose.model('Airport', AirportSchema);
