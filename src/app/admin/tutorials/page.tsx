'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle, Loader2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tutorial } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function ManageTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTutorials = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tutorials');
      if (!response.ok) throw new Error('Failed to fetch tutorials');
      const data = await response.json();
      setTutorials(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load tutorials. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, [toast]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tutorial?')) return;

    try {
      const response = await fetch(`/api/tutorials/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete tutorial');
      toast({ title: 'Success', description: 'Tutorial deleted successfully.' });
      fetchTutorials(); // Refresh list
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not delete tutorial. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-headline text-3xl font-bold">Tutorial Management</h1>
            <p className="text-muted-foreground">Create, update, and manage all tutorials.</p>
          </div>
          <Button asChild>
            <Link href="/admin/tutorials/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Tutorial
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Published Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tutorials.map((tutorial) => (
                    <TableRow key={tutorial.id}>
                      <TableCell className="font-medium">{tutorial.title}</TableCell>
                      <TableCell>{tutorial.author}</TableCell>
                      <TableCell>
                        {new Date(tutorial.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                               <Link href={`/admin/tutorials/${tutorial.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(tutorial.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
