import mongoose, { Document, Model, Types } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  nid?: string;
  assignedLawyer: Types.ObjectId;
  cases: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new mongoose.Schema<IClient>({
  name: { 
    type: String, 
    required: [true, 'Client name is required'],
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: String,
  nid: String,
  assignedLawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case'
  }]
}, { timestamps: true });

ClientSchema.index({ assignedLawyer: 1 });
ClientSchema.index({ name: 'text', email: 'text' });

const Client: Model<IClient> = mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

export default Client;