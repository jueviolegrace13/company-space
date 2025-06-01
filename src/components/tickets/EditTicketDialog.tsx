import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useTicketStore, Ticket } from '../../stores/ticketStore';

const editTicketSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
});

type EditTicketFormData = z.infer<typeof editTicketSchema>;

interface EditTicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket;
}

export function EditTicketDialog({ isOpen, onClose, ticket }: EditTicketDialogProps) {
  const updateTicket = useTicketStore((state) => state.updateTicket);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditTicketFormData>({
    resolver: zodResolver(editTicketSchema),
    defaultValues: {
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
    },
  });

  const onSubmit = async (data: EditTicketFormData) => {
    try {
      // In a real app, you would make an API call here
      updateTicket(ticket.id, {
        ...data,
      });

      onClose();
    } catch (error) {
      console.error('Failed to update ticket:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Title"
            error={errors.title?.message}
            {...register('title')}
          />

          <Textarea
            label="Description"
            error={errors.description?.message}
            {...register('description')}
          />

          <Select
            label="Status"
            options={[
              { value: 'open', label: 'Open' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
              { value: 'closed', label: 'Closed' },
            ]}
            error={errors.status?.message}
            {...register('status')}
          />

          <Select
            label="Priority"
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
              { value: 'urgent', label: 'Urgent' },
            ]}
            error={errors.priority?.message}
            {...register('priority')}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
            >
              Update Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}