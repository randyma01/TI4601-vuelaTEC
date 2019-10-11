import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdministratorSchema = new Schema({});

export default mongoose.model('Administrator', AdministratorSchema);
