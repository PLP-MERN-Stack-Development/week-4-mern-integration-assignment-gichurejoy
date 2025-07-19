import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import theme from './theme';

// Create a PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Register = React.lazy(() => import('./pages/Auth/Register'));
const Blog = React.lazy(() => import('./pages/Blog/BlogList'));
const PostDetail = React.lazy(() => import('./pages/Blog/PostDetail'));
const NewPost = React.lazy(() => import('./pages/Blog/NewPost'));
const EditPost = React.lazy(() => import('./pages/Blog/EditPost'));
const MyPosts = React.lazy(() => import('./pages/Blog/MyPosts'));

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            '*': {
              boxSizing: 'border-box',
              margin: 0,
              padding: 0,
            },
            '#root': {
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              width: '100%',
              maxWidth: '100vw',
              overflow: 'hidden',
            },
            body: {
              margin: 0,
              padding: 0,
              minHeight: '100vh',
              width: '100%',
              maxWidth: '100vw',
              overflow: 'hidden',
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
        <AuthProvider>
          <Layout>
            <React.Suspense
              fallback={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                  }}
                >
                  Loading...
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<PostDetail />} />
                <Route
                  path="/posts/new"
                  element={
                    <PrivateRoute>
                      <NewPost />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/posts/edit/:id"
                  element={
                    <PrivateRoute>
                      <EditPost />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-posts"
                  element={
                    <PrivateRoute>
                      <MyPosts />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </React.Suspense>
          </Layout>
        </AuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ThemeProvider>
    </Router>
  );
};

export default App;
