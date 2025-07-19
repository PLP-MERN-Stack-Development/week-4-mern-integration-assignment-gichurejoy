import { Typography, Button, Container, Box, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Create as CreateIcon, Article as ArticleIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            height: '100%',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(233, 30, 99, 0.15)',
            },
        }}
    >
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
            }}
        >
            <Box
                sx={{
                    mr: 2,
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: '#FCE4EC',
                    color: '#C2185B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Icon />
            </Box>
            <Typography variant="h6" component="h3" color="primary.dark">
                {title}
            </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
            {description}
        </Typography>
    </Paper>
);

const Home = () => {
    const { user } = useAuth();

    const features = [
        {
            icon: CreateIcon,
            title: 'Create and Share',
            description: 'Write engaging blog posts and share your thoughts with the world. Our rich text editor makes it easy to create beautiful content.',
        },
        {
            icon: ArticleIcon,
            title: 'Organize Content',
            description: 'Categorize your posts and make them easily discoverable. Add tags and manage your content efficiently.',
        },
    ];

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '80vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)',
                        opacity: 0.8,
                        zIndex: -1,
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '140%',
                        height: '140%',
                        transform: 'translate(-50%, -50%) rotate(-12deg)',
                        backgroundImage: 'linear-gradient(135deg, #E91E63 0%, #FF4081 100%)',
                        opacity: 0.1,
                        zIndex: -1,
                    },
                }}
            >
                <Container maxWidth={false} sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            py: 8,
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="h2"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #C2185B 30%, #E91E63 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 3,
                            }}
                        >
                            Welcome to MERN Blog
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            paragraph
                            sx={{ mb: 4, maxWidth: '600px' }}
                        >
                            Share your thoughts, ideas, and stories with the world. Join our community
                            of writers and readers today.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {user ? (
                                <>
                                    <Button
                                        component={RouterLink}
                                        to="/posts/new"
                                        variant="contained"
                                        size="large"
                                        startIcon={<CreateIcon />}
                                    >
                                        Create New Post
                                    </Button>
                                    <Button
                                        component={RouterLink}
                                        to="/blog"
                                        variant="outlined"
                                        size="large"
                                    >
                                        View Blog Posts
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        component={RouterLink}
                                        to="/register"
                                        variant="contained"
                                        size="large"
                                    >
                                        Get Started
                                    </Button>
                                    <Button
                                        component={RouterLink}
                                        to="/login"
                                        variant="outlined"
                                        size="large"
                                    >
                                        Sign In
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Box
                sx={{
                    py: 12,
                    width: '100%',
                    backgroundColor: 'background.default',
                }}
            >
                <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{
                            mb: 6,
                            color: 'primary.dark',
                            fontWeight: 700,
                        }}
                    >
                        Features
                    </Typography>
                    <Grid container spacing={4} sx={{ width: '100%' }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <FeatureCard {...feature} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Home; 