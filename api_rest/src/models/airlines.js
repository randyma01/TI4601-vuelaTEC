import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AirlineSchema = new Schema({});

export default mongoose.model('Airline', AirlineSchema);
