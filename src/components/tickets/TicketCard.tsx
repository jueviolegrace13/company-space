import React from 'react';
import { format } from 'date-fns';
import { MessageSquare, CheckCircle, AlertCircle, Clock, Edit, Trash2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { truncateText } from '../../lib/utils';
import { Ticket } from '../../stores/ticketStore';

interface TicketCardProps {
  ticket: Ticket;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TicketCard({ ticket, onEdit, onDelete }: TicketCardProps) {
  const statusConfig = {
    open: { 
      label: 'Open', 
      variant: 'warning' as const,
      icon: <AlertCircle className="h-4 w-4 mr-1" /> 
    },
    in_progress: { 
      label: 'In Progress', 
      variant: 'primary' as const,
      icon: <Clock className="h-4 w-4 mr-1" /> 
    },
    resolved: { 
      label: 'Resolved', 
      variant: 'success' as const,
      icon: <CheckCircle className="h-4 w-4 mr-1" /> 
    },
    closed: { 
      label: 'Closed', 
      variant: 'default' as const,
      icon: <CheckCircle className="h-4 w-4 mr-1" /> 
    },
  };

  const priorityConfig = {
    low: { label: 'Low', variant: 'default' as const },
    medium: { label: 'Medium', variant: 'primary' as const },
    high: { label: 'High', variant: 'warning' as const },
    urgent: { label: 'Urgent', variant: 'error' as const },
  };

  const { label: statusLabel, variant: statusVariant, icon: statusIcon } = statusConfig[ticket.status];
  const { label: priorityLabel, variant: priorityVariant } = priorityConfig[ticket.priority];
  const formattedDate = format(new Date(ticket.createdAt), 'MMM d, yyyy');

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {ticket.title}
              {!ticket.viewed && (
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary-500"></span>
              )}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {truncateText(ticket.description, 120)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Badge variant={statusVariant} className="flex items-center">
              {statusIcon}
              {statusLabel}
            </Badge>
            <Badge variant={priorityVariant}>{priorityLabel}</Badge>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <Avatar 
              src={ticket.client.avatarUrl} 
              name={ticket.client.name} 
              size="sm" 
            />
            <span className="ml-2 text-sm text-gray-600">{ticket.client.name}</span>
          </div>
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>ID: {ticket.id.substring(0, 8)}</span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            leftIcon={<Edit className="h-4 w-4" />}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            leftIcon={<Trash2 className="h-4 w-4" />}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}