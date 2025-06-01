import React from 'react';
import { Ban as Bar } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TicketCard } from '../components/tickets/TicketCard';
import { FeedbackCard } from '../components/feedback/FeedbackCard';
import { useAuth } from '../contexts/AuthContext';
import { useCompany } from '../contexts/CompanyContext';

export function DashboardPage() {
  const { user } = useAuth();
  const { company } = useCompany();

  // Mock data
  const recentTickets = [
    {
      id: 'TCK-1234',
      title: 'Need help with account settings',
      description: 'I cannot find where to change my notification preferences. Can someone please help me navigate to the right section?',
      status: 'open' as const,
      priority: 'medium' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewed: false,
      client: {
        id: 'CLT-001',
        name: 'John Smith',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    },
    {
      id: 'TCK-1233',
      title: 'Integration with third-party app',
      description: 'We are trying to connect your API with our CRM system but getting authentication errors. Please advise on the correct authentication process.',
      status: 'in_progress' as const,
      priority: 'high' as const,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      viewed: true,
      client: {
        id: 'CLT-002',
        name: 'Emma Johnson',
        avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      assignedTo: {
        id: 'AGT-001',
        name: 'Michael Brown',
        avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
      },
    },
  ];

  const recentFeedback = [
    {
      id: 'FDB-001',
      content: 'The support team was incredibly helpful and resolved my issue quickly. I especially appreciate the follow-up to ensure everything was working properly.',
      rating: 5,
      createdAt: new Date().toISOString(),
      client: {
        id: 'CLT-003',
        name: 'Sarah Williams',
        avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
      commentsCount: 2,
      likesCount: 5,
      isPublic: true,
    },
  ];

  const stats = [
    {
      title: 'Total Clients',
      value: '42',
      change: '+12%',
      positive: true,
    },
    {
      title: 'Open Tickets',
      value: '7',
      change: '-3%',
      positive: true,
    },
    {
      title: 'Average Response Time',
      value: '1.4h',
      change: '-15%',
      positive: true,
    },
    {
      title: 'Client Satisfaction',
      value: '94%',
      change: '+2%',
      positive: true,
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with {company?.name || 'your company'} today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-5">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <div className="mt-2 flex items-baseline justify-between">
                  <h3 className="text-2xl font-semibold text-gray-900">{stat.value}</h3>
                  <Badge
                    variant={stat.positive ? 'success' : 'error'}
                    className="flex items-center"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tickets */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-5">
                <div>
                  <CardTitle>Recent Tickets</CardTitle>
                  <CardDescription>Latest support requests from clients</CardDescription>
                </div>
                <Badge>{recentTickets.length}</Badge>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-4">
                {recentTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
                {recentTickets.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recent tickets</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Feedback & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="p-5">
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Latest client testimonials</CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                {recentFeedback.map((feedback) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} />
                ))}
                {recentFeedback.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recent feedback</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-5">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors text-gray-800 font-medium">
                  <div className="flex items-center">
                    <Bar className="h-5 w-5 mr-3 text-primary-500" />
                    Add New Client
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors text-gray-800 font-medium">
                  <div className="flex items-center">
                    <Bar className="h-5 w-5 mr-3 text-primary-500" />
                    Create Support Ticket
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors text-gray-800 font-medium">
                  <div className="flex items-center">
                    <Bar className="h-5 w-5 mr-3 text-primary-500" />
                    View Reports
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors text-gray-800 font-medium">
                  <div className="flex items-center">
                    <Bar className="h-5 w-5 mr-3 text-primary-500" />
                    Update Branding
                  </div>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}