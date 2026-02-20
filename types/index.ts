import { Types } from 'mongoose';

// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'lawyer' | 'paralegal';
  phone?: string;
  specialization?: string;
  barCouncilId?: string;
  avatar?: string;
  createdAt: Date;
}

// Case Types
export interface Case {
  _id: string;
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
  assignedLawyer: User | string;
  opponent?: string;
  court?: string;
  filingDate: Date;
  nextHearingDate?: Date;
  description?: string;
  documents: Document[];
  notes: Note[];
  timeline: TimelineEvent[];
  createdAt: Date;
  updatedAt: Date;
}

// Document Types
export interface Document {
  title: string;
  url: string;
  publicId: string;
  category: string;
  uploadedAt: Date;
}

// Note Types
export interface Note {
  content: string;
  createdBy: User | string;
  createdAt: Date;
}

// Timeline Event Types
export interface TimelineEvent {
  event: string;
  date: Date;
  description?: string;
}

// Notification Types
export interface Notification {
  _id: string;
  user: string | User;
  type: 'case_update' | 'hearing_reminder' | 'document_upload' | 'case_assigned';
  title: string;
  message: string;
  relatedCase?: string | Case;
  read: boolean;
  createdAt: Date;
}

// Dashboard Stats Types
export interface DashboardStats {
  totalCases: number;
  activeCases: number;
  casesByStatus: Array<{ _id: string; count: number }>;
  casesByType: Array<{ _id: string; count: number }>;
  casesByPriority: Array<{ _id: string; count: number }>;
  upcomingHearings: Case[];
  monthlyTrends: Array<{
    _id: { year: number; month: number };
    count: number;
  }>;
  outcomes: Array<{ _id: string; count: number }>;
}

// Pagination Types
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}