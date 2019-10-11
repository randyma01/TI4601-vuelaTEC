import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PassengerSchema = new Schema({});

export default mongoose.model('Passenger', PassengerSchema);
