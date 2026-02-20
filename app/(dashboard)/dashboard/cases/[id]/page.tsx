'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCase } from '@/hooks/useCases';
import { LoadingPage } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CaseStatusBadge } from '@/components/case-status-badge';
import { PriorityBadge } from '@/components/priority-badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  FileText,
  MessageSquare,
  Upload,
  Download,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CldUploadWidget } from 'next-cloudinary';

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: caseData, isLoading, refetch } = useCase(params.id as string);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setIsAddingNote(true);
    try {
      await axios.post(`/api/cases/${params.id}/notes`, {
        content: newNote,
      });
      toast.success('Note added successfully');
      setNewNote('');
      refetch();
    } catch (error) {
      toast.error('Failed to add note');
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleDocumentUpload = async (result: any) => {
    setIsUploadingDoc(true);
    try {
      await axios.post(`/api/cases/${params.id}/documents`, {
        title: result.info.original_filename,
        url: result.info.secure_url,
        publicId: result.info.public_id,
        category: 'General',
      });
      toast.success('Document uploaded successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to upload document');
    } finally {
      setIsUploadingDoc(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!caseData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Case not found</p>
        <Link href="/dashboard/cases">
          <Button className="mt-4">Back to Cases</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link href="/dashboard/cases">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{caseData.title}</h1>
              <CaseStatusBadge status={caseData.status} />
              <PriorityBadge priority={caseData.priority} />
            </div>
            <p className="text-muted-foreground">Case #{caseData.caseNumber}</p>
          </div>
        </div>
        <Button onClick={() => router.push(`/dashboard/cases`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Case
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-semibold">{caseData.client.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Case Type</p>
                <p className="font-semibold">{caseData.caseType}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Filed Date</p>
                <p className="font-semibold">
                  {format(new Date(caseData.filingDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Next Hearing</p>
                <p className="font-semibold">
                  {caseData.nextHearingDate
                    ? format(new Date(caseData.nextHearingDate), 'MMM dd, yyyy')
                    : 'Not scheduled'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="documents">
            Documents ({caseData.documents?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="notes">
            Notes ({caseData.notes?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Court</p>
                  <p className="font-medium">{caseData.court || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Opponent</p>
                  <p className="font-medium">{caseData.opponent || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Lawyer</p>
                  <p className="font-medium">{caseData.assignedLawyer?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {format(new Date(caseData.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>

              {caseData.description && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm leading-relaxed">{caseData.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{caseData.client.name}</p>
                </div>
                {caseData.client.email && (
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{caseData.client.email}</p>
                  </div>
                )}
                {caseData.client.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{caseData.client.phone}</p>
                  </div>
                )}
                {caseData.client.address && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{caseData.client.address}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-end">
            <CldUploadWidget
              uploadPreset="legalflow_docs"
              onSuccess={handleDocumentUpload}
            >
              {({ open }) => (
                <Button onClick={() => open()} disabled={isUploadingDoc}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              )}
            </CldUploadWidget>
          </div>

          {caseData.documents && caseData.documents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {caseData.documents.map((doc: any, index: number) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <FileText className="h-8 w-8 text-primary mb-2" />
                        <p className="font-medium truncate">{doc.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(doc.uploadedAt), 'MMM dd, yyyy')}
                        </p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-muted rounded">
                          {doc.category}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => window.open(doc.url, '_blank')}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No documents uploaded yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={4}
              />
              <Button onClick={handleAddNote} disabled={isAddingNote || !newNote.trim()}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </CardContent>
          </Card>

          {caseData.notes && caseData.notes.length > 0 ? (
            <div className="space-y-4">
              {caseData.notes.map((note: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          {note.createdBy?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{note.createdBy?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(note.createdAt), 'MMM dd, yyyy h:mm a')}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{note.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notes added yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          {caseData.timeline && caseData.timeline.length > 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {caseData.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        {index !== caseData.timeline.length - 1 && (
                          <div className="w-px h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {format(new Date(event.date), 'MMM dd, yyyy')}
                        </p>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No timeline events yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}