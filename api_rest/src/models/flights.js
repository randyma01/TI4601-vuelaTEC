import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FlightSchema = new Schema({});

export default mongoose.model('Flights', FlightSchema);
