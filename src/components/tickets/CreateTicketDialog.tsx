import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useTicketStore } from '../../stores/ticketStore';

const createTicketSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  clientId: z.string().min(1, 'Client is required'),
});

type CreateTicketFormData = z.infer<typeof createTicketSchema>;

interface CreateTicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTicketDialog({ isOpen, onClose }: CreateTicketDialogProps) {
  const addTicket = useTicketStore((state) => state.addTicket);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      priority: 'medium',
    },
  });

  const onSubmit = async (data: CreateTicketFormData) => {
    try {
      // In a real app, you would make an API call here
      addTicket({
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: 'open',
        client: {
          id: data.clientId,
          name: 'John Smith', // This would come from the API
          avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
      });

      reset();
      onClose();
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Create New Ticket</h2>
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

          <Select
            label="Client"
            options={[
              { value: 'CLT-001', label: 'John Smith' },
              { value: 'CLT-002', label: 'Sarah Johnson' },
            ]}
            error={errors.clientId?.message}
            {...register('clientId')}
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
              Create Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}