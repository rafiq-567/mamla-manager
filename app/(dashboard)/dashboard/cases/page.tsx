'use client';

import { useState } from 'react';
import { CaseCard } from '@/components/case-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCases } from '@/hooks/useCases';
import { LoadingSpinner } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CaseForm } from '@/components/forms/case-form';

export default function CasesPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [caseType, setCaseType] = useState('');
  const [priority, setPriority] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [page, setPage] = useState(1);
  const [editingCase, setEditingCase] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);

  const { cases, pagination, isLoading, updateCase, deleteCase } = useCases({
    page,
    search,
    status,
    caseType,
    priority,
    sortBy,
    sortOrder: 'desc',
  });

  const handleEdit = (caseData: any) => {
    setEditingCase(caseData);
  };

  const handleUpdate = async (data: any) => {
    await updateCase.mutateAsync({ id: editingCase._id, data });
    setEditingCase(null);
  };

  const handleDeleteClick = (id: string) => {
    setCaseToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (caseToDelete) {
      await deleteCase.mutateAsync(caseToDelete);
      setIsDeleteDialogOpen(false);
      setCaseToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cases</h1>
          <p className="text-muted-foreground">
            Manage and track all your legal cases
          </p>
        </div>
        <Link href="/dashboard/cases/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by case number, title, or client..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All Statuses</SelectItem>
            <SelectItem value="Filed">Filed</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Won">Won</SelectItem>
            <SelectItem value="Lost">Lost</SelectItem>
            <SelectItem value="Settled">Settled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={caseType} onValueChange={setCaseType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All Types</SelectItem>
            <SelectItem value="Criminal">Criminal</SelectItem>
            <SelectItem value="Civil">Civil</SelectItem>
            <SelectItem value="Family">Family</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
            <SelectItem value="Labour">Labour</SelectItem>
            <SelectItem value="Tax">Tax</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Newest First</SelectItem>
            <SelectItem value="filingDate">Filing Date</SelectItem>
            <SelectItem value="nextHearingDate">Hearing Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases Grid */}
      {isLoading ? (
        <LoadingSpinner className="min-h-[400px]" />
      ) : cases.length === 0 ? (
        <EmptyState
          title="No cases found"
          description="Try adjusting your filters or create a new case"
          action={{
            label: 'Create Case',
            onClick: () => (window.location.href = '/dashboard/cases/new'),
          }}
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((caseItem: any) => (
              <CaseCard
                key={caseItem._id}
                case={caseItem}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.pages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingCase} onOpenChange={() => setEditingCase(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Case</DialogTitle>
          </DialogHeader>
          {editingCase && (
            <CaseForm
              defaultValues={{
                ...editingCase,
                filingDate: new Date(editingCase.filingDate)
                  .toISOString()
                  .split('T')[0],
                nextHearingDate: editingCase.nextHearingDate
                  ? new Date(editingCase.nextHearingDate)
                      .toISOString()
                      .split('T')[0]
                  : '',
              }}
              onSubmit={handleUpdate}
              isLoading={updateCase.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Case</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this case? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteCase.isPending}
            >
              {deleteCase.isPending && (
                <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
              )}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}