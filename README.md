# 🎵 Musical - MERN Stack Song Management Application

A full-stack web application for managing songs with comprehensive statistics, built with MongoDB, Express.js, React, and Node.js.

## ✨ Features

### Backend (REST API)
- ✅ **CRUD Operations**: Create, Read, Update, Delete songs
- ✅ **Song Management**: Track Title, Artist, Album, and Genre
- ✅ **Statistics API**: Generate comprehensive statistics including:
  - Total number of songs, artists, albums, genres
  - Songs per genre
  - Songs and albums per artist
  - Songs per album
  - And more custom statistics

### Frontend (React + TypeScript)
- ✅ **Song List**: View all songs in a beautiful interface
- ✅ **Add/Edit/Delete**: Full CRUD functionality with forms
- ✅ **Statistics Dashboard**: Visual display of all statistics
- ✅ **Real-time Updates**: Changes reflect immediately without page reload
- ✅ **Filter by Genre**: Filter songs by genre (Bonus feature)
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Modern UI**: Styled with Emotion and Styled System

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Docker** - Containerization

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **Redux Saga** - Side effects management
- **Emotion** - CSS-in-JS styling
- **Styled System** - Design system utilities
- **Vite** - Build tool and dev server

## 🚀 Getting Started

### Option 1: Docker (Recommended)

The easiest way to run the entire application with all services.

#### Prerequisites
- Docker Desktop installed
- Docker Compose installed

#### Quick Start
```bash
# Clone the repository
cd c:\Users\Administrator\Music\musical

# Start all services (production mode)
docker-compose up --build

# Or start in development mode with hot reload
docker-compose -f docker-compose.dev.yml up --build
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/songs
- Mongo Express: http://localhost:8081 (admin/admin123)

For detailed Docker instructions, see [DOCKER_README.md](./DOCKER_README.md)

### Option 2: Manual Setup

#### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

#### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start the server
npm start

# Or for development with hot reload
npm run dev
```

Backend will run on http://localhost:5000

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your backend API URL

# Start the development server
npm run dev

# Or build for production
npm run build
npm run preview
```

Frontend will run on http://localhost:5173 (dev) or http://localhost:4173 (preview)

## 📁 Project Structure

```
musical/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── index.js         # Entry point
│   ├── Dockerfile       # Backend container config
│   └── package.json     # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── features/    # Redux slices and sagas
│   │   ├── config/      # Configuration files
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Entry point
│   ├── Dockerfile       # Frontend container config
│   ├── nginx.conf       # Nginx configuration
│   └── package.json     # Frontend dependencies
│
├── docker-compose.yml       # Production Docker setup
├── docker-compose.dev.yml   # Development Docker setup
├── DOCKER_README.md         # Docker documentation
└── README.md               # This file
```

## 🔌 API Endpoints

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/:id` - Get a specific song
- `POST /api/songs` - Create a new song
- `PUT /api/songs/:id` - Update a song
- `DELETE /api/songs/:id` - Delete a song

### Statistics
- `GET /api/songs/statistics` - Get comprehensive statistics

### Example Request
```bash
# Create a song
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "genre": "Rock"
  }'
```

## 🎨 Frontend Features

### State Management
- **Redux Toolkit** for centralized state
- **Redux Saga** for async operations
- Automatic state updates after CRUD operations

### Styling
- **Emotion** for component styling
- **Styled System** for consistent design
- Responsive and mobile-friendly

### Type Safety
- Full TypeScript implementation
- Minimal use of `any` type
- Type-safe Redux actions and state

## 📊 Statistics Examples

The application generates various statistics:

```json
{
  "totalSongs": 150,
  "totalArtists": 45,
  "totalAlbums": 60,
  "totalGenres": 8,
  "songsByGenre": [
    { "genre": "Rock", "count": 45 },
    { "genre": "Pop", "count": 30 }
  ],
  "songsByArtist": [
    { "artist": "Queen", "songCount": 12, "albumCount": 3 }
  ],
  "songsByAlbum": [
    { "album": "A Night at the Opera", "count": 12 }
  ]
}
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚢 Deployment

### Backend Deployment Options
- **Render**: Free tier available, easy Docker deployment
- **Railway**: Simple deployment with MongoDB support
- **Heroku**: Classic PaaS option
- **AWS ECS/Fargate**: Enterprise-grade container service

### Frontend Deployment Options
- **Vercel**: Optimized for React/Vite (Recommended)
- **Netlify**: Easy static site hosting
- **AWS S3 + CloudFront**: Scalable static hosting
- **GitHub Pages**: Free hosting for static sites

### Database Options
- **MongoDB Atlas**: Managed MongoDB (Recommended)
- **AWS DocumentDB**: MongoDB-compatible service
- **DigitalOcean Managed MongoDB**: Simple managed database

### Deployment Steps

1. **Deploy Database**
   - Create MongoDB Atlas cluster (free tier available)
   - Get connection string

2. **Deploy Backend**
   ```bash
   # Example for Render
   - Connect GitHub repository
   - Select Docker deployment
   - Add environment variables (MONGO_URI, PORT)
   - Deploy
   ```

3. **Deploy Frontend**
   ```bash
   # Example for Vercel
   cd frontend
   npm run build
   vercel --prod
   # Set VITE_API_URL to your backend URL
   ```

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://mongo:27017/musical
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB connection failed**: Check MONGO_URI in .env
- **Port already in use**: Change PORT in .env or kill process
- **CORS errors**: Verify CORS configuration in backend

### Frontend Issues
- **API calls failing**: Check VITE_API_URL in .env
- **Build errors**: Clear node_modules and reinstall
- **Type errors**: Run `npm run build` to check TypeScript errors

### Docker Issues
- **Container won't start**: Check logs with `docker-compose logs`
- **Port conflicts**: Change ports in docker-compose.yml
- **Database connection**: Ensure MongoDB container is healthy

See [DOCKER_README.md](./DOCKER_README.md) for detailed Docker troubleshooting.

## 📝 Development Workflow

### With Docker (Recommended)
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down
```

### Without Docker
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - MongoDB (if local)
mongod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Developed as part of the Addis Software Test Project

## 🙏 Acknowledgments

- MERN Stack community
- Redux Toolkit and Redux Saga documentation
- Docker and containerization best practices
- All open-source contributors

---

**Built with ❤️ using the MERN Stack**
