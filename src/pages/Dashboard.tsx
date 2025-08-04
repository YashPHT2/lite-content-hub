import { FileText, Plus, TrendingUp, Eye } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/cms-hero.jpg';

export const Dashboard = () => {
  const { posts } = usePosts();
  const navigate = useNavigate();

  const totalPosts = posts.length;
  const recentPosts = posts.slice(0, 5);
  const tagsCount = new Set(posts.filter(p => p.tag).map(p => p.tag)).size;

  const stats = [
    {
      title: 'Total Posts',
      value: totalPosts,
      icon: FileText,
      color: 'text-cms-primary',
    },
    {
      title: 'Unique Tags',
      value: tagsCount,
      icon: TrendingUp,
      color: 'text-cms-accent',
    },
    {
      title: 'Recent Activity',
      value: recentPosts.length,
      icon: Eye,
      color: 'text-cms-success',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your content management dashboard
          </p>
        </div>
        <Button 
          onClick={() => navigate('/posts/new')}
          className="bg-cms-primary hover:bg-cms-primary-dark"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Posts
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/posts')}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div 
                  key={post.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {post.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground ml-4">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hero Section - Empty State */}
      {totalPosts === 0 && (
        <Card className="relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <CardContent className="relative text-center py-16">
            <FileText className="mx-auto h-16 w-16 text-cms-primary mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Welcome to Mini CMS</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your lightweight content management system is ready. Start creating and managing your posts with our intuitive dashboard.
            </p>
            <Button 
              onClick={() => navigate('/posts/new')}
              size="lg"
              className="bg-cms-primary hover:bg-cms-primary-dark"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Post
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};