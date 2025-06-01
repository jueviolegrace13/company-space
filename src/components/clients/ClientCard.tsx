import React from 'react';
import { format } from 'date-fns';
import { Mail, Phone, Calendar, Ticket } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ClientCardProps {
  client: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatarUrl?: string;
    createdAt: string;
    status: 'active' | 'inactive' | 'pending';
    openTickets: number;
  };
  onViewDetails?: () => void;
  onContact?: () => void;
}

export function ClientCard({ client, onViewDetails, onContact }: ClientCardProps) {
  const statusConfig = {
    active: { label: 'Active', variant: 'success' as const },
    inactive: { label: 'Inactive', variant: 'default' as const },
    pending: { label: 'Pending', variant: 'warning' as const },
  };
  
  const { label, variant } = statusConfig[client.status];
  const formattedDate = format(new Date(client.createdAt), 'MMM d, yyyy');
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-center space-x-4">
          <Avatar 
            src={client.avatarUrl} 
            name={client.name} 
            size="lg" 
          />
          
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
              <Badge variant={variant} className="ml-2">
                {label}
              </Badge>
            </div>
            
            <div className="mt-1 flex flex-col space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                <span>{client.email}</span>
              </div>
              
              {client.phone && (
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{client.phone}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Client since {formattedDate}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Ticket className="h-4 w-4 mr-2" />
                <span>{client.openTickets} open tickets</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-gray-50 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onContact}
        >
          Contact
        </Button>
        
        <Button
          variant="primary"
          size="sm"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}