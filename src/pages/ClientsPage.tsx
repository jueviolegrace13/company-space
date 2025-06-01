import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ClientCard } from '../components/clients/ClientCard';
import { UserPlus, Search, Filter } from 'lucide-react';

// Mock data for demonstration
const mockClients = [
  {
    id: 'client-1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: '2024-01-15T08:00:00.000Z',
    status: 'active' as const,
    openTickets: 2,
  },
  {
    id: 'client-2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: '2024-02-01T10:30:00.000Z',
    status: 'active' as const,
    openTickets: 1,
  },
  {
    id: 'client-3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: '2024-02-10T14:15:00.000Z',
    status: 'pending' as const,
    openTickets: 0,
  },
];

export function ClientsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'active' | 'inactive' | 'pending'>('all');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your client relationships and support tickets
            </p>
          </div>
          <Button
            onClick={() => {/* Handle new client */}}
            leftIcon={<UserPlus className="h-5 w-5" />}
          >
            Add New Client
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-5 w-5 text-gray-400" />}
                />
              </div>
              <div className="flex items-center gap-4">
                <select
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
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

        <div className="grid grid-cols-1 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onViewDetails={() => {/* Handle view details */}}
              onContact={() => {/* Handle contact */}}
            />
          ))}
          {filteredClients.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">No clients found matching your criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}