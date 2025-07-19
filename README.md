# MERN Stack Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, blog post management, and advanced features.

## Features

- 🔐 **User Authentication**
  - JWT-based authentication
  - User registration and login
  - Protected routes
  - Role-based authorization (Admin/User)



- 📝 **Blog Post Management**
  - Create, read, update, and delete posts
  - Rich text editing
  - Featured image uploads
  - Category management
  - Comments system

 

- 🎨 **Modern UI/UX**
  - Responsive Material-UI design
  - Clean and intuitive interface
  - Optimistic updates
  - Loading states and error handling

- 🔍 **Advanced Features**
  - Post search functionality
  - Category filtering
  - Pagination
  - Image upload support
  - Comment system

## Technology Stack

- **Frontend:**
  - React.js with Vite
  - Material-UI for styling
  - React Router for navigation
  - React Context for state management
  - Axios for API calls

- **Backend:**
  - Node.js & Express.js
  - MongoDB Atlas for database
  - JWT for authentication
  - Multer for file uploads
  - Express Validator for input validation

## Project Structure

```
mern-blog/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context providers
│   │   ├── services/     # API services
│   │   └── hooks/        # Custom hooks
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utility functions
└── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Posts
- GET `/api/posts` - Get all posts (with pagination)
- GET `/api/posts/:id` - Get single post
- POST `/api/posts` - Create new post
- PUT `/api/posts/:id` - Update post
- DELETE `/api/posts/:id` - Delete post
- POST `/api/posts/:id/comments` - Add comment to post

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create new category
- PUT `/api/categories/:id` - Update category
- DELETE `/api/categories/:id` - Delete category

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Environment Setup
   - Create `.env` file in server directory with:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the application
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

5. Access the application
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Screenshots

### Home Page
![Home Page](./screenshots/home.png)
*Modern landing page with a welcoming message and clear call-to-action buttons for creating posts or viewing the blog*

### Create New Post
![Create Post](./screenshots/create-post.png)
*User-friendly post creation interface with fields for title, content, categories, and featured image URL*

### My Posts Dashboard
![My Posts](./screenshots/my-posts.png)
*Personal dashboard displaying user's posts with options to edit, delete, and view posts, including category tags*

### Authentication
![Login Page](./screenshots/login.png)
*Clean and minimalist login interface with email/password authentication and signup option*

### Features Showcased in Screenshots:
- 🎨 Modern and clean UI design with pink accent colors
- 📱 Fully responsive layout
- 🔐 User authentication system
- ✍️ Intuitive post creation and management
- 🏷️ Category system for organizing posts
- 💅 Consistent styling and branding throughout

## Future Improvements

- [ ] Add social authentication
- [ ] Implement rich text editor
- [ ] Add post analytics
- [ ] Add user profiles
- [ ] Implement real-time notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 