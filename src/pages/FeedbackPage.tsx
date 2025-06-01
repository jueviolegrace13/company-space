import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { FeedbackCard } from '../components/feedback/FeedbackCard';
import { MessageSquarePlus, Search, Filter } from 'lucide-react';

// Mock data for demonstration
const mockFeedback = [
  {
    id: 'FDB-001',
    content: 'The customer support team has been exceptional in helping us resolve our technical issues. Their quick response time and thorough explanations have made a significant difference in our operations.',
    rating: 5,
    createdAt: new Date().toISOString(),
    client: {
      id: 'CLT-001',
      name: 'John Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    commentsCount: 3,
    likesCount: 8,
    isPublic: true,
  },
  {
    id: 'FDB-002',
    content: 'Great platform overall, but there\'s room for improvement in the reporting features. Would love to see more customization options.',
    rating: 4,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    client: {
      id: 'CLT-002',
      name: 'Sarah Johnson',
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    commentsCount: 1,
    likesCount: 4,
    isPublic: true,
  },
  {
    id: 'FDB-003',
    content: 'The new features added in the latest update have significantly improved our workflow. Especially love the automated notifications.',
    rating: 5,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    client: {
      id: 'CLT-003',
      name: 'Michael Brown',
      avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    commentsCount: 2,
    likesCount: 6,
    isPublic: true,
  },
];

export function FeedbackPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [ratingFilter, setRatingFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('recent');

  const filteredFeedback = mockFeedback
    .filter(feedback => {
      const matchesSearch = 
        feedback.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.client.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRating = ratingFilter === 'all' || feedback.rating === parseInt(ratingFilter);
      
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'popular') {
        return b.likesCount - a.likesCount;
      }
      return 0;
    });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Feedback</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage feedback from your clients
            </p>
          </div>
          <Button
            onClick={() => {/* Handle new feedback */}}
            leftIcon={<MessageSquarePlus className="h-5 w-5" />}
          >
            Request Feedback
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search feedback..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-5 w-5 text-gray-400" />}
                />
              </div>
              <div className="flex items-center gap-4">
                <Select
                  options={[
                    { value: 'all', label: 'All Ratings' },
                    { value: '5', label: '5 Stars' },
                    { value: '4', label: '4 Stars' },
                    { value: '3', label: '3 Stars' },
                    { value: '2', label: '2 Stars' },
                    { value: '1', label: '1 Star' },
                  ]}
                  value={ratingFilter}
                  onChange={(value) => setRatingFilter(value)}
                />
                <Select
                  options={[
                    { value: 'recent', label: 'Most Recent' },
                    { value: 'rating', label: 'Highest Rated' },
                    { value: 'popular', label: 'Most Popular' },
                  ]}
                  value={sortBy}
                  onChange={(value) => setSortBy(value)}
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

        <div className="space-y-6">
          {filteredFeedback.map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              onLike={() => {/* Handle like */}}
              onComment={() => {/* Handle comment */}}
              onReport={() => {/* Handle report */}}
            />
          ))}
          {filteredFeedback.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">No feedback found matching your criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}