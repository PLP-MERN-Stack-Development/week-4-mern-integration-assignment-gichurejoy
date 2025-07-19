import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Grid,
    CircularProgress,
    Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { postService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const MyPosts = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data } = await postService.getPosts();
            // Filter posts by current user
            setPosts(data.data.filter((post) => post.author._id === user._id));
        } catch (error) {
            toast.error('Failed to fetch posts');
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            await postService.deletePost(postId);
            toast.success('Post deleted successfully');
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (error) {
            toast.error('Failed to delete post');
            console.error('Error deleting post:', error);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1">
                    My Posts
                </Typography>
                <Button
                    component={RouterLink}
                    to="/posts/new"
                    variant="contained"
                    color="primary"
                >
                    Create New Post
                </Button>
            </Box>

            {posts.length === 0 ? (
                <Typography variant="h6" color="text.secondary" align="center">
                    You haven't created any posts yet.
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid item xs={12} md={6} key={post._id}>
                            <Card>
                                {post.featuredImage && (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={post.featuredImage}
                                        alt={post.title}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {post.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        paragraph
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {post.content}
                                    </Typography>

                                    <Box sx={{ mb: 2 }}>
                                        {post.categories.map((category) => (
                                            <Chip
                                                key={category._id}
                                                label={category.name}
                                                size="small"
                                                sx={{ mr: 1, mb: 1 }}
                                            />
                                        ))}
                                    </Box>

                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                        {new Date(post.createdAt).toLocaleDateString()} •{' '}
                                        {post.comments.length} comments
                                    </Typography>

                                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                        <Button
                                            component={RouterLink}
                                            to={`/posts/edit/${post._id}`}
                                            startIcon={<EditIcon />}
                                            variant="outlined"
                                            size="small"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(post._id)}
                                            startIcon={<DeleteIcon />}
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            component={RouterLink}
                                            to={`/blog/${post._id}`}
                                            variant="outlined"
                                            size="small"
                                            sx={{ ml: 'auto' }}
                                        >
                                            View
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default MyPosts; 