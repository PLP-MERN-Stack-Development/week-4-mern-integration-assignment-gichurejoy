import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Divider,
    TextField,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { postService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const { data } = await postService.getPost(id);
            setPost(data.data);
        } catch (error) {
            toast.error('Failed to fetch post');
            console.error('Error fetching post:', error);
            navigate('/blog');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            await postService.deletePost(id);
            toast.success('Post deleted successfully');
            navigate('/blog');
        } catch (error) {
            toast.error('Failed to delete post');
            console.error('Error deleting post:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setSubmitting(true);
        try {
            await postService.addComment(id, { content: comment });
            toast.success('Comment added successfully');
            setComment('');
            fetchPost(); // Refresh post to show new comment
        } catch (error) {
            toast.error('Failed to add comment');
            console.error('Error adding comment:', error);
        } finally {
            setSubmitting(false);
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

    if (!post) {
        return (
            <Container>
                <Typography variant="h5" color="error" align="center">
                    Post not found
                </Typography>
            </Container>
        );
    }

    const isAuthor = user && post.author._id === user._id;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Card>
                {post.featuredImage && (
                    <CardMedia
                        component="img"
                        height="400"
                        image={post.featuredImage}
                        alt={post.title}
                    />
                )}
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        By {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>

                    {isAuthor && (
                        <Box sx={{ mt: 2, mb: 3 }}>
                            <Button
                                startIcon={<EditIcon />}
                                variant="outlined"
                                onClick={() => navigate(`/posts/edit/${id}`)}
                                sx={{ mr: 2 }}
                            >
                                Edit
                            </Button>
                            <Button
                                startIcon={<DeleteIcon />}
                                variant="outlined"
                                color="error"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Box>
                    )}

                    <Typography variant="body1" paragraph sx={{ mt: 3 }}>
                        {post.content}
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" gutterBottom>
                        Comments ({post.comments.length})
                    </Typography>

                    {user ? (
                        <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 4 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                disabled={submitting}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 2 }}
                                disabled={submitting || !comment.trim()}
                            >
                                {submitting ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Please log in to comment.
                        </Typography>
                    )}

                    <List>
                        {post.comments.map((comment, index) => (
                            <ListItem key={comment._id || index} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar>{comment.author.username[0].toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography component="span" variant="subtitle2">
                                            {comment.author.username}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {comment.content}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="caption" color="text.secondary">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PostDetail; 