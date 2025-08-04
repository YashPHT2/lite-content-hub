import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Post, PostFormData } from '@/types/post';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PostFormProps {
  post?: Post;
  onSave: (data: PostFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export const PostForm = ({ post, onSave, onCancel, isEdit = false }: PostFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    description: '',
    tag: '',
  });
  const [errors, setErrors] = useState<Partial<PostFormData>>({});

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        tag: post.tag || '',
      });
    }
  }, [post]);

  const validate = (): boolean => {
    const newErrors: Partial<PostFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    onSave({
      title: formData.title.trim(),
      description: formData.description.trim(),
      tag: formData.tag?.trim() || undefined,
    });

    toast({
      title: isEdit ? 'Post Updated' : 'Post Created',
      description: `Your post has been ${isEdit ? 'updated' : 'created'} successfully.`,
    });
  };

  const handleChange = (field: keyof PostFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter post title..."
              className={errors.title ? 'border-cms-danger' : ''}
            />
            {errors.title && (
              <p className="text-sm text-cms-danger">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter post description..."
              className={`min-h-32 resize-none ${errors.description ? 'border-cms-danger' : ''}`}
            />
            {errors.description && (
              <p className="text-sm text-cms-danger">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag" className="text-sm font-medium">
              Tag / Category
            </Label>
            <Input
              id="tag"
              value={formData.tag}
              onChange={(e) => handleChange('tag', e.target.value)}
              placeholder="Enter a tag or category (optional)..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-cms-primary hover:bg-cms-primary-dark"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEdit ? 'Update Post' : 'Create Post'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};