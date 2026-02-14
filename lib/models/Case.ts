import mongoose from 'mongoose';

const CaseSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  caseType: { 
    type: String, 
    enum: ['Criminal', 'Civil', 'Family', 'Corporate', 'Labour', 'Tax'],
    required: true 
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
    name: { type: String, required: true },
    email: String,
    phone: String,
    address: String
  },
  assignedLawyer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  opponent: String,
  court: String,
  filingDate: { type: Date, required: true },
  nextHearingDate: Date,
  description: String,
  documents: [{
    title: String,
    url: String,
    category: String,
    uploadedAt: Date
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
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Case || mongoose.model('Case', CaseSchema);