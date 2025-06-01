import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { TicketCard } from '../components/tickets/TicketCard';
import { CreateTicketDialog } from '../components/tickets/CreateTicketDialog';
import { EditTicketDialog } from '../components/tickets/EditTicketDialog';
import { DeleteTicketDialog } from '../components/tickets/DeleteTicketDialog';
import { Plus, Search, Filter } from 'lucide-react';
import { useTicketStore, Ticket } from '../stores/ticketStore';

export function TicketsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [priorityFilter, setPriorityFilter] = React.useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const tickets = useTicketStore((state) => state.tickets);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.client.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleEditClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDeleteDialogOpen(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and respond to client support requests
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            leftIcon={<Plus className="h-5 w-5" />}
          >
            Create Ticket
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-5 w-5 text-gray-400" />}
                />
              </div>
              <div className="flex items-center gap-4">
                <Select
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'open', label: 'Open' },
                    { value: 'in_progress', label: 'In Progress' },
                    { value: 'resolved', label: 'Resolved' },
                    { value: 'closed', label: 'Closed' },
                  ]}
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value)}
                />
                <Select
                  options={[
                    { value: 'all', label: 'All Priority' },
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                    { value: 'urgent', label: 'Urgent' },
                  ]}
                  value={priorityFilter}
                  onChange={(value) => setPriorityFilter(value)}
                />
                <Button
                  variant="outline"
                  leftIcon={<Filter className="h-5 w-5" />}
                >
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={() => handleEditClick(ticket)}
              onDelete={() => handleDeleteClick(ticket)}
            />
          ))}
          {filteredTickets.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">No tickets found matching your criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <CreateTicketDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      {selectedTicket && (
        <>
          <EditTicketDialog
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedTicket(null);
            }}
            ticket={selectedTicket}
          />

          <DeleteTicketDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => {
              setIsDeleteDialogOpen(false);
              setSelectedTicket(null);
            }}
            ticketId={selectedTicket.id}
          />
        </>
      )}
    </Layout>
  );
}