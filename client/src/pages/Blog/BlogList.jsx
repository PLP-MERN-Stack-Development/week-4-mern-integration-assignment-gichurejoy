import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Pagination,
    CircularProgress,
    Chip,
    IconButton,
    InputAdornment,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
} from '@mui/icons-material';
import { postService, categoryService } from '../../services/api';
import { toast } from 'react-toastify';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchCategories();
        fetchPosts();
    }, [page]);

    const fetchCategories = async () => {
        try {
            const { data } = await categoryService.getCategories();
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const { data } = await postService.getPosts(page);
            setPosts(data.data);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error('Failed to fetch posts');
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        // Implement search functionality here
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        // Implement category filter here
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
        <Container maxWidth={false} sx={{ py: 4, width: '100%', px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
            <Box sx={{ mb: 4, width: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Blog Posts
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        mb: 4,
                        width: '100%',
                    }}
                >
                    <TextField
                        placeholder="Search posts..."
                        variant="outlined"
                        size="small"
                        sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 200 } }}
                        value={searchTerm}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }} size="small">
                        <InputLabel>Filter by Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            label="Filter by Category"
                            fullWidth
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {posts.length === 0 ? (
                <Typography variant="h6" color="text.secondary" align="center">
                    No posts found.
                </Typography>
            ) : (
                <>
                    <Grid container spacing={4} sx={{ width: '100%' }}>
                        {posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 4px 20px rgba(233, 30, 99, 0.15)',
                                        },
                                    }}
                                >
                                    {post.featuredImage ? (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={post.featuredImage}
                                            alt={post.title}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                height: 200,
                                                backgroundColor: 'primary.light',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography variant="h6" color="primary.contrastText">
                                                {post.title[0].toUpperCase()}
                                            </Typography>
                                        </Box>
                                    )}
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {post.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mb: 2,
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
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography variant="caption" color="text.secondary">
                                                By {post.author?.username || 'Unknown'} •{' '}
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </Typography>
                                            <Button
                                                component={RouterLink}
                                                to={`/blog/${post._id}`}
                                                variant="outlined"
                                                size="small"
                                            >
                                                Read More
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                        />
                    </Box>
                </>
            )}
        </Container>
    );
};

export default BlogList; 