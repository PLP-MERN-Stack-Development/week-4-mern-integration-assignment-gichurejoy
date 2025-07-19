import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { postService, categoryService } from '../../services/api';
import { toast } from 'react-toastify';

const NewPost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categories: [],
        featuredImage: '',
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await categoryService.getCategories();
            setCategories(data.data);
        } catch (error) {
            toast.error('Failed to fetch categories');
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error('Please fill in all required fields');
            return;
        }

        setSubmitting(true);
        try {
            await postService.createPost(formData);
            toast.success('Post created successfully');
            navigate('/blog');
        } catch (error) {
            toast.error('Failed to create post');
            console.error('Error creating post:', error);
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

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create New Post
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    required
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    required
                    multiline
                    rows={8}
                    label="Content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Categories</InputLabel>
                    <Select
                        multiple
                        name="categories"
                        value={formData.categories}
                        onChange={handleChange}
                        renderValue={(selected) =>
                            selected
                                .map(
                                    (id) =>
                                        categories.find((category) => category._id === id)?.name || ''
                                )
                                .join(', ')
                        }
                    >
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Featured Image URL"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    margin="normal"
                    helperText="Enter the URL of your featured image"
                />

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Creating...' : 'Create Post'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/blog')}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default NewPost; 