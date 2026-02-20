'use client';

import { useRouter } from 'next/navigation';
import { CaseForm } from '@/components/forms/case-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useCases } from '@/hooks/useCases';
import Link from 'next/link';

export default function NewCasePage() {
  const router = useRouter();
  const { createCase } = useCases();

  const handleSubmit = async (data: any) => {
    await createCase.mutateAsync(data);
    router.push('/dashboard/cases');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/cases">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Case</h1>
          <p className="text-muted-foreground">
            Fill in the details to register a new case
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Details</CardTitle>
          <CardDescription>
            Enter all relevant information for this case
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CaseForm
            onSubmit={handleSubmit}
            isLoading={createCase.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}