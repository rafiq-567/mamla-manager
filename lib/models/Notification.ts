import mongoose, { Document, Model, Types } from 'mongoose';

export interface INotification extends Document {
  user: Types.ObjectId;
  type: 'case_update' | 'hearing_reminder' | 'document_upload' | 'case_assigned';
  title: string;
  message: string;
  relatedCase?: Types.ObjectId;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new mongoose.Schema<INotification>({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['case_update', 'hearing_reminder', 'document_upload', 'case_assigned'],
    required: true
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  relatedCase: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Case'
  },
  read: { type: Boolean, default: false }
}, { timestamps: true });

NotificationSchema.index({ user: 1, read: 1, createdAt: -1 });

const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;