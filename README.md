# Instagram Clone - Full Stack Application

A full-featured Instagram clone built with the MERN stack (MongoDB, Express, React, Node.js) with real-time messaging capabilities using Socket.io. This application includes all the core features of Instagram including posts, stories, loops (reels), messaging, notifications, and user authentication.

## 🌟 Features

### Authentication System
- User registration with email/password
- Secure login with JWT tokens
- Password reset functionality with OTP verification
- Cookie-based session management

### Social Features
- **Posts**: Create, like, save, and comment on posts with images/videos
- **Loops (Reels)**: Create and share short video content
- **Stories**: Post temporary content that disappears after 24 hours
- **Follow System**: Follow/unfollow other users
- **Feed**: Personalized feed showing posts from followed users

### Messaging
- Real-time private messaging between users
- Online/offline status indicators
- Message history with previous conversations
- Image sharing in messages

### User Profiles
- Edit profile information
- Profile picture upload
- View user profiles and their posts
- Follower/following lists
- Search users

### Notifications
- Real-time notifications for likes, comments, follows
- Notification history
- Mark as read functionality

## 📁 Project Structure

```
instagramClone/
├── Backend/                          # Node.js/Express Backend
│   ├── config/                       # Configuration files
│   │   ├── cloudinary.js            # Cloudinary configuration for media storage
│   │   ├── db.js                    # MongoDB database connection
│   │   ├── Mail.js                  # Email configuration for OTP
│   │   └── token.js                 # JWT token configuration
│   ├── controllers/                 # Route controllers (business logic)
│   │   ├── auth.controllers.js      # Authentication logic
│   │   ├── loop.controllers.js     # Loops/reels logic
│   │   ├── message.controllers.js   # Messaging logic
│   │   ├── post.controllers.js     # Posts logic
│   │   ├── story.controllers.js    # Stories logic
│   │   └── user.controllers.js      # User management logic
│   ├── middleware/                   # Custom middleware
│   │   ├── isAuth.js                # Authentication middleware
│   │   └── multer.js                # File upload middleware
│   ├── models/                      # MongoDB Mongoose models
│   │   ├── conversation.model.js    # Chat conversations
│   │   ├── loop.model.js           # Loops/reels data
│   │   ├── message.model.js        # Messages data
│   │   ├── notification.model.js   # Notifications data
│   │   ├── post.model.js           # Posts data
│   │   ├── story.model.js          # Stories data
│   │   └── user.model.js           # Users data
│   ├── public/                       # Static files (uploaded media)
│   ├── routes/                      # API route definitions
│   │   ├── auth.routes.js          # Auth routes
│   │   ├── loop.routes.js          # Loops routes
│   │   ├── message.routes.js       # Messages routes
│   │   ├── post.routes.js          # Posts routes
│   │   ├── story.routes.js         # Stories routes
│   │   └── user.routes.js          # User routes
│   ├── index.js                     # Main server entry point
│   ├── socket.js                    # Socket.io configuration
│   └── package.json                 # Backend dependencies
│
├── Frontend/                          # React Frontend (Vite)
│   ├── public/                      # Public static assets
│   ├── src/
│   │   ├── assets/                  # Images, logos, icons
│   │   ├── Components/              # Reusable React components
│   │   │   ├── Feed.jsx            # Main feed component
│   │   │   ├── FollowButton.jsx    # Follow/unfollow button
│   │   │   ├── LeftHome.jsx        # Left sidebar
│   │   │   ├── LoopCard.jsx        # Loop/reel card
│   │   │   ├── Nav.jsx             # Navigation bar
│   │   │   ├── NotificationCard.jsx # Notification item
│   │   │   ├── OnlineUser.jsx      # Online user indicator
│   │   │   ├── OtherUser.jsx       # Other user profile
│   │   │   ├── Post.jsx            # Post component
│   │   │   ├── ReceiverMessage.jsx # Message receiver
│   │   │   ├── RightHome.jsx       # Right sidebar
│   │   │   ├── SenderMessage.jsx   # Message sender
│   │   │   ├── StoryCard.jsx       # Story card
│   │   │   ├── StoryCardDp.jsx     # Story profile ring
│   │   │   └── VideoPlayer.jsx     # Video player
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useAllLoops.jsx     # Fetch all loops
│   │   │   ├── useAllNotification.jsx # Fetch notifications
│   │   │   ├── useAllPost.jsx      # Fetch all posts
│   │   │   ├── useAllStories.jsx   # Fetch all stories
│   │   │   ├── useCurrentUser.jsx  # Get current user
│   │   │   ├── useFollowingList.jsx # Get following list
│   │   │   ├── usePrevChatUsers.jsx # Get previous chats
│   │   │   └── useSuggestedUser.jsx # Get suggested users
│   │   ├── pages/                   # Page components
│   │   │   ├── EditProfile.jsx     # Edit profile page
│   │   │   ├── ForgotPassword.jsx  # Password recovery
│   │   │   ├── Home.jsx            # Home/Feed page
│   │   │   ├── Loops.jsx           # Loops/Reels page
│   │   │   ├── MessageArea.jsx     # Chat area
│   │   │   ├── Messages.jsx        # Messages list
│   │   │   ├── Notifications.jsx    # Notifications page
│   │   │   ├── Profile.jsx         # User profile
│   │   │   ├── Search.jsx          # Search page
│   │   │   ├── SignIn.jsx          # Login page
│   │   │   ├── SignUp.jsx          # Registration page
│   │   │   ├── Story.jsx           # Story viewer
│   │   │   └── Upload.jsx          # Upload content
│   │   ├── redux/                   # Redux state management
│   │   │   ├── LoopSlice.js        # Loops state
│   │   │   ├── messageSlice.js     # Messages state
│   │   │   ├── PostSlice.js        # Posts state
│   │   │   ├── socketSlice.js      # Socket state
│   │   │   ├── Store.js            # Redux store
│   │   │   ├── StorySlice.js       # Stories state
│   │   │   └── UserSlice.js        # User state
│   │   ├── App.jsx                 # Main App component
│   │   ├── App.css                  # Global styles
│   │   ├── index.css               # Tailwind imports
│   │   └── main.jsx                # React entry point
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── vite.config.js               # Vite configuration
│   └── eslint.config.js            # ESLint configuration
│
└── README.md                        # This file
```

## ⚙️ How It Works

### Backend Architecture
1. **Express Server**: Handles HTTP requests and routes
2. **MongoDB**: Stores all data (users, posts, messages, etc.)
3. **Socket.io**: Enables real-time communication
4. **Cloudinary**: Stores media files (images, videos)
5. **JWT**: Manages user authentication with cookies

### Frontend Architecture
1. **React + Vite**: Fast, modern frontend framework
2. **Redux Toolkit**: State management
3. **React Router**: Client-side routing
4. **Tailwind CSS**: Styling
5. **Socket.io Client**: Real-time updates

### Data Flow
1. User interacts with UI (React)
2. React dispatches Redux action
3. Redux thunk calls API endpoint (Axios)
4. Express server processes request
5. MongoDB performs database operations
6. Response sent back to client
7. Redux store updates, UI re-renders
8. For real-time: Socket.io broadcasts to relevant users

## 🔌 Socket Events

### Server → Client Events

| Event Name | Description | Data Format |
|-----------|-------------|-------------|
| `getOnlineUsers` | Emitted when users connect/disconnect | Array of user IDs |
| `likedPost` | When someone likes a post | `{ postId, likes: [] }` |
| `commentedPost` | When someone comments on a post | `{ postId, comments: [] }` |
| `likedLoop` | When someone likes a loop | `{ loopId, likes: [] }` |
| `commentedLoop` | When someone comments on a loop | `{ loopId, comments: [] }` |

### Client → Server Events

| Event Name | Description |
|-----------|-------------|
| Connection | User connects with their userId as query param |
| Disconnect | User disconnects, removes from online users |

## 🌐 API Routes

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | No |
| POST | `/signin` | Login user | No |
| POST | `/sendOtp` | Send OTP for password reset | No |
| POST | `/verifyOtp` | Verify OTP code | No |
| POST | `/resetPassword` | Reset user password | No |
| GET | `/signout` | Logout user | Yes |

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/current` | Get current user profile | Yes |
| GET | `/suggested` | Get suggested users to follow | Yes |
| GET | `/getProfile/:userName` | Get user profile by username | Yes |
| GET | `/follow/:targetUserId` | Follow/unfollow a user | Yes |
| GET | `/followingList` | Get list of users you follow | Yes |
| GET | `/search` | Search users by username | Yes |
| GET | `/getAllNotifications` | Get all notifications | Yes |
| POST | `/markAsRead` | Mark notifications as read | Yes |
| POST | `/editProfile` | Update user profile | Yes |

### Post Routes (`/api/post`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload` | Upload new post (image/video) | Yes |
| GET | `/getAll` | Get all posts for feed | Yes |
| GET | `/like/:postId` | Like/unlike a post | Yes |
| GET | `/saved/:postId` | Save/unsave a post | Yes |
| POST | `/comment/:postId` | Comment on a post | Yes |

### Loop/Reel Routes (`/api/loop`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload` | Upload new loop (video) | Yes |
| GET | `/getAll` | Get all loops | Yes |
| GET | `/like/:loopId` | Like/unlike a loop | Yes |
| POST | `/comment/:loopId` | Comment on a loop | Yes |

### Story Routes (`/api/story`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload` | Upload new story | Yes |
| GET | `/getByUserName/:userName` | Get stories by username | Yes |
| GET | `/getAll` | Get all stories | Yes |
| GET | `/view/:storyId` | Mark story as viewed | Yes |

### Message Routes (`/api/message`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/send/:receiverId` | Send message to user | Yes |
| GET | `/getAll/:receiverId` | Get messages with user | Yes |
| GET | `/prevChats/` | Get previous chat conversations | Yes |

## 🚀 How to Clone and Use

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository

```
bash
git clone <repository-url>
cd instagramClone
```

### Backend Setup

1. Navigate to backend directory:
```
bash
cd Backend
```

2. Install dependencies:
```
bash
npm install
```

3. Create a `.env` file in the Backend directory:
```
env
# Server Configuration
PORT=8000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (for OTP)
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

4. Start the backend server:
```
bash
# Development
npm run dev

# Production
npm start
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory (in a new terminal):
```
bash
cd Frontend
```

2. Install dependencies:
```
bash
npm install
```

3. Start the development server:
```
bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Environment Variables Needed

#### Backend (.env)
```
PORT=8000
MONGO_URI=mongodb://localhost:27017/instagramclone
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

## 💻 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Password Hashing**: bcryptjs

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Real-time Client**: Socket.io Client
- **Animations**: React Spinners

## 📝 API Documentation Notes

All protected routes require a JWT token stored in cookies. The token is automatically sent with each request via axios interceptors in the frontend.

### Response Format
All API responses follow this format:
```
json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

### Error Handling
Errors return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## 🔧 Additional Configuration

### CORS Configuration (Backend)
The backend is configured to accept requests from specific origins. Update `Backend/index.js` to change allowed origins:
```
javascript
app.use(cors({
  origin: "https://your-frontend-url.com",
  credentials: true,
}));
```

### Socket.io Configuration (Backend)
The socket.io server runs on the same port as the Express server and is configured in `Backend/socket.js`.

## 📄 License

This project is for educational purposes.

## 👤 Author

Feel free to reach out if you have any questions or suggestions!
