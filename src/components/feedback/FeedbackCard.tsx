import React from 'react';
import { format } from 'date-fns';
import { ThumbsUp, MessageSquare, Flag } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface FeedbackCardProps {
  feedback: {
    id: string;
    content: string;
    rating: number;
    createdAt: string;
    client: {
      id: string;
      name: string;
      avatarUrl?: string;
    };
    commentsCount: number;
    likesCount: number;
    isPublic: boolean;
  };
  onLike?: () => void;
  onComment?: () => void;
  onReport?: () => void;
}

export function FeedbackCard({ feedback, onLike, onComment, onReport }: FeedbackCardProps) {
  const formattedDate = format(new Date(feedback.createdAt), 'MMM d, yyyy');
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar 
            src={feedback.client.avatarUrl} 
            name={feedback.client.name} 
            size="md" 
          />
          
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">{feedback.client.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`h-5 w-5 ${
                        index < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.585l-7.07 3.712 1.35-7.87L.536 6.737l7.895-1.149L10 0l2.57 5.588 7.895 1.149-5.744 5.69 1.35 7.87z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">{formattedDate}</span>
              </div>
            </div>
            
            <p className="mt-2 text-gray-700">{feedback.content}</p>
            
            {!feedback.isPublic && (
              <Badge variant="default" className="mt-2">Private Feedback</Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center text-sm text-gray-500 hover:text-primary-600"
            onClick={onLike}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{feedback.likesCount}</span>
          </button>
          
          <button
            className="flex items-center text-sm text-gray-500 hover:text-primary-600"
            onClick={onComment}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{feedback.commentsCount}</span>
          </button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500"
          onClick={onReport}
        >
          <Flag className="h-4 w-4 mr-1" />
          <span className="text-sm">Report</span>
        </Button>
      </CardFooter>
    </Card>
  );
}