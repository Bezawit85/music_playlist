# 🐳 Docker Setup Guide - Musical MERN Stack Application

This guide will help you run the Musical application using Docker and Docker Compose.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29 or higher)

Verify installation:
```bash
docker --version
docker-compose --version
```

## 🏗️ Architecture

The application consists of 4 services:

1. **MongoDB** (Port 27017) - Database
2. **Backend API** (Port 5000) - Express.js REST API
3. **Frontend** (Port 3000) - React application
4. **Mongo Express** (Port 8081) - Database admin UI (optional)

## 🚀 Quick Start

### 1. Clone and Navigate to Project
```bash
cd c:\Users\Administrator\Music\musical
```

### 2. Environment Configuration

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

**Frontend (.env):**
```bash
cd ../frontend
cp .env.example .env
```

The default configuration works with Docker Compose. No changes needed for local development.

### 3. Build and Run All Services

From the project root directory:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

### 4. Access the Application

Once all services are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/songs
- **MongoDB**: localhost:27017
- **Mongo Express**: http://localhost:8081 (username: `admin`, password: `admin123`)

## 🛠️ Docker Commands

### Start Services
```bash
# Start all services
docker-compose up

# Start specific service
docker-compose up backend

# Start in background
docker-compose up -d
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database data)
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongo

# Follow logs (real-time)
docker-compose logs -f backend
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build backend

# Rebuild and start
docker-compose up --build
```

### Check Service Status
```bash
# List running containers
docker-compose ps

# Check health status
docker ps
```

### Execute Commands in Containers
```bash
# Access backend shell
docker-compose exec backend sh

# Access MongoDB shell
docker-compose exec mongo mongosh

# Run npm commands in backend
docker-compose exec backend npm run dev
```

## 📁 Project Structure

```
musical/
├── backend/
│   ├── Dockerfile              # Backend container configuration
│   ├── .dockerignore          # Files to exclude from Docker build
│   ├── .env                   # Backend environment variables
│   └── .env.example           # Backend environment template
├── frontend/
│   ├── Dockerfile             # Frontend container configuration
│   ├── nginx.conf             # Nginx configuration for production
│   ├── .dockerignore          # Files to exclude from Docker build
│   ├── .env                   # Frontend environment variables
│   └── .env.example           # Frontend environment template
├── docker-compose.yml         # Multi-container orchestration
└── DOCKER_README.md          # This file
```

## 🔧 Configuration Details

### Backend Environment Variables
```env
MONGO_URI=mongodb://mongo:27017/musical
PORT=5000
NODE_ENV=production
```

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:5000
```

### Docker Compose Services

#### MongoDB
- **Image**: mongo:7.0
- **Port**: 27017
- **Volumes**: Persistent data storage
- **Health Check**: Automatic service health monitoring

#### Backend
- **Build**: ./backend
- **Port**: 5000
- **Dependencies**: MongoDB (waits for healthy status)
- **Hot Reload**: Volume mounted for development

#### Frontend
- **Build**: Multi-stage build (Node.js + Nginx)
- **Port**: 3000 (mapped to internal port 80)
- **Production**: Optimized static file serving

#### Mongo Express
- **Image**: mongo-express:latest
- **Port**: 8081
- **Credentials**: admin / admin123

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
netstat -ano | findstr :5000
netstat -ano | findstr :3000
netstat -ano | findstr :27017

# Stop the process or change ports in docker-compose.yml
```

### Container Won't Start
```bash
# Check logs
docker-compose logs [service-name]

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Database Connection Issues
```bash
# Ensure MongoDB is healthy
docker-compose ps

# Check MongoDB logs
docker-compose logs mongo

# Restart MongoDB
docker-compose restart mongo
```

### Frontend Can't Connect to Backend
1. Verify backend is running: `docker-compose ps`
2. Check backend logs: `docker-compose logs backend`
3. Verify `VITE_API_URL` in frontend/.env
4. Rebuild frontend: `docker-compose build frontend`

### Clear Everything and Start Fresh
```bash
# Stop all containers
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Remove all volumes
docker volume prune

# Rebuild and start
docker-compose up --build
```

## 📊 Database Management

### Using Mongo Express (Web UI)
1. Navigate to http://localhost:8081
2. Login with `admin` / `admin123`
3. Select `musical` database
4. View and manage collections

### Using MongoDB Shell
```bash
# Access MongoDB shell
docker-compose exec mongo mongosh

# Switch to musical database
use musical

# View collections
show collections

# Query songs
db.songs.find()

# Count documents
db.songs.countDocuments()
```

## 🔒 Security Notes

For **production deployment**:

1. **Change default credentials** in docker-compose.yml
2. **Use environment files** for sensitive data
3. **Enable MongoDB authentication**
4. **Use secrets management** (Docker Secrets, AWS Secrets Manager)
5. **Remove Mongo Express** or secure it properly
6. **Use HTTPS** with SSL certificates
7. **Implement rate limiting** and security headers

## 📦 Production Deployment

### Build for Production
```bash
# Build optimized images
docker-compose -f docker-compose.yml build

# Tag images for registry
docker tag musical-backend:latest your-registry/musical-backend:v1.0
docker tag musical-frontend:latest your-registry/musical-frontend:v1.0

# Push to registry
docker push your-registry/musical-backend:v1.0
docker push your-registry/musical-frontend:v1.0
```

### Deployment Platforms

**Backend Options:**
- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Fly.io](https://fly.io/)
- AWS ECS/Fargate
- Google Cloud Run

**Frontend Options:**
- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- AWS S3 + CloudFront
- GitHub Pages

**Database Options:**
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Recommended)
- AWS DocumentDB
- DigitalOcean Managed MongoDB

## 🎯 Development Workflow

### Local Development with Hot Reload
```bash
# Start services with volume mounting
docker-compose up

# Backend changes will auto-reload (nodemon)
# Frontend changes require rebuild or use dev mode outside Docker
```

### Running Tests
```bash
# Backend tests
docker-compose exec backend npm test

# Frontend tests
docker-compose exec frontend npm test
```

### Accessing Logs
```bash
# Real-time logs for all services
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

## 🤝 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review service logs: `docker-compose logs [service-name]`
3. Ensure all prerequisites are installed
4. Verify environment variables are set correctly

---

**Happy Dockerizing! 🐳🎵**
