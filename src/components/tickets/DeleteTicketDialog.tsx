import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTicketStore } from '../../stores/ticketStore';

interface DeleteTicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
}

export function DeleteTicketDialog({ isOpen, onClose, ticketId }: DeleteTicketDialogProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deleteTicket = useTicketStore((state) => state.deleteTicket);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // In a real app, you would make an API call here
      deleteTicket(ticketId);
      onClose();
    } catch (error) {
      console.error('Failed to delete ticket:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Delete Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Are you sure you want to delete this ticket? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            isLoading={isDeleting}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}