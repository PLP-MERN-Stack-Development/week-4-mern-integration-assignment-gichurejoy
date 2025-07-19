import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Create as CreateIcon,
  Article as ArticleIcon,
  ExitToApp as LogoutIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Blog', path: '/blog' },
  ];

  const isActive = (path) => location.pathname === path;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 700 }}>
        MERN Blog
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              textAlign: 'center',
              bgcolor: isActive(item.path) ? '#FCE4EC' : 'transparent',
              color: isActive(item.path) ? 'primary.main' : 'inherit',
              '&:hover': {
                bgcolor: '#FCE4EC',
              },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {user ? (
          <>
            <ListItem component={RouterLink} to="/posts/new">
              <ListItemIcon>
                <CreateIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary="New Post" />
            </ListItem>
            <ListItem component={RouterLink} to="/my-posts">
              <ListItemIcon>
                <ArticleIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary="My Posts" />
            </ListItem>
            <ListItem onClick={handleLogout} sx={{ cursor: 'pointer' }}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem component={RouterLink} to="/login">
              <ListItemIcon>
                <LoginIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem component={RouterLink} to="/register">
              <ListItemIcon>
                <RegisterIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            MERN Blog
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{
                    position: 'relative',
                    color: isActive(item.path) ? 'primary.main' : 'inherit',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: 2,
                      backgroundColor: 'primary.main',
                      transform: isActive(item.path) ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
              {user ? (
                <>
                  <Button
                    component={RouterLink}
                    to="/posts/new"
                    variant="contained"
                    startIcon={<CreateIcon />}
                    sx={{ ml: 2 }}
                  >
                    New Post
                  </Button>
                  <IconButton onClick={handleMenuOpen} color="inherit">
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 32,
                        height: 32,
                      }}
                    >
                      {user.username[0].toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        width: 200,
                        mt: 1,
                        '& .MuiMenuItem-root': {
                          '&:hover': {
                            bgcolor: '#FCE4EC',
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem disabled>
                      <Typography variant="body2" color="text.secondary">
                        Signed in as {user.username}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      component={RouterLink}
                      to="/my-posts"
                      onClick={handleMenuClose}
                    >
                      <ListItemIcon>
                        <ArticleIcon fontSize="small" sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      My Posts
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    startIcon={<LoginIcon />}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    startIcon={<RegisterIcon />}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#FCE4EC',
          width: '100%'
        }}
      >
        <Container maxWidth={false}>
          <Typography variant="body2" color="primary.dark" align="center">
            © {new Date().getFullYear()} MERN Blog. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 