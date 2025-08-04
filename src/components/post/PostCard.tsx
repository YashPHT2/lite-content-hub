import { Edit, Trash2, Eye, Calendar, Tag } from 'lucide-react';
import { Post } from '@/types/post';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  onView: (post: Post) => void;
}

export const PostCard = ({ post, onEdit, onDelete, onView }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
            {post.title}
          </CardTitle>
          {post.tag && (
            <Badge variant="secondary" className="ml-2 shrink-0">
              <Tag className="w-3 h-3 mr-1" />
              {post.tag}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {post.description}
        </p>
        
        <div className="flex items-center text-xs text-muted-foreground mt-4 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            Created: {formatDate(post.createdAt)}
          </div>
          {post.updatedAt !== post.createdAt && (
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Updated: {formatDate(post.updatedAt)}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(post)}
          className="flex-1"
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(post)}
          className="flex-1"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(post)}
          className="text-cms-danger hover:text-cms-danger hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};