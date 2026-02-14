import mongoose, { Document, Model, Types } from 'mongoose';

export interface ICase extends Document {
  caseNumber: string;
  title: string;
  caseType: 'Criminal' | 'Civil' | 'Family' | 'Corporate' | 'Labour' | 'Tax';
  status: 'Filed' | 'In Progress' | 'Pending' | 'Won' | 'Lost' | 'Settled';
  priority: 'High' | 'Medium' | 'Low';
  client: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  assignedLawyer: Types.ObjectId;
  opponent?: string;
  court?: string;
  filingDate: Date;
  nextHearingDate?: Date;
  description?: string;
  documents: Array<{
    title: string;
    url: string;
    publicId: string;
    category: string;
    uploadedAt: Date;
  }>;
  notes: Array<{
    content: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
  }>;
  timeline: Array<{
    event: string;
    date: Date;
    description?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const CaseSchema = new mongoose.Schema<ICase>({
  caseNumber: { 
    type: String, 
    required: [true, 'Case number is required'],
    unique: true,
    trim: true
  },
  title: { 
    type: String, 
    required: [true, 'Case title is required'],
    trim: true
  },
  caseType: { 
    type: String, 
    enum: ['Criminal', 'Civil', 'Family', 'Corporate', 'Labour', 'Tax'],
    required: [true, 'Case type is required']
  },
  status: { 
    type: String, 
    enum: ['Filed', 'In Progress', 'Pending', 'Won', 'Lost', 'Settled'],
    default: 'Filed'
  },
  priority: { 
    type: String, 
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  client: {
    name: { type: String, required: [true, 'Client name is required'] },
    email: String,
    phone: String,
    address: String
  },
  assignedLawyer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'Assigned lawyer is required']
  },
  opponent: String,
  court: String,
  filingDate: { 
    type: Date, 
    required: [true, 'Filing date is required']
  },
  nextHearingDate: Date,
  description: String,
  documents: [{
    title: String,
    url: String,
    publicId: String,
    category: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  notes: [{
    content: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  timeline: [{
    event: String,
    date: Date,
    description: String
  }]
}, { timestamps: true });

// Index for faster queries
CaseSchema.index({ assignedLawyer: 1, status: 1 });
CaseSchema.index({ caseNumber: 1 });
CaseSchema.index({ 'client.name': 'text', title: 'text' });

const Case: Model<ICase> = mongoose.models.Case || mongoose.model<ICase>('Case', CaseSchema);

export default Case;