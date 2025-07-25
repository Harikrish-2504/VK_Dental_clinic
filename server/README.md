# Dental Clinic Backend API

A production-ready MERN backend server for a dental clinic website with admin authentication, gallery management, and services management.

## Features

- 🔐 **Authentication & Authorization**: JWT-based admin authentication
- 🖼️ **Gallery Management**: Upload and manage gallery images with multer
- 🦷 **Services Management**: CRUD operations for dental services
- 🛡️ **Security**: Helmet, CORS, rate limiting, and input validation
- 📱 **Production Ready**: Error handling, logging, and environment configuration

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/profile` - Update user profile

### Gallery
- `GET /api/gallery` - Get all gallery posts (public)
- `POST /api/gallery` - Create gallery post (admin only, with image upload)
- `GET /api/gallery/:id` - Get single gallery post (public)
- `PUT /api/gallery/:id` - Update gallery post (admin only)
- `DELETE /api/gallery/:id` - Delete gallery post (admin only)

### Services
- `GET /api/services` - Get all services (public)
- `POST /api/services` - Create service (admin only)
- `GET /api/services/:id` - Get single service (public)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dental-clinic
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
ADMIN_EMAIL=admin@dentalclinic.com
ADMIN_PASSWORD=admin123
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Default Admin Credentials

- **Email**: admin@dentalclinic.com
- **Password**: admin123

**⚠️ Important**: Change these credentials in production!

## Image Upload

Images are uploaded to the `/uploads` directory using multer. The API returns full image URLs in responses.

**Image Requirements**:
- Format: JPG, PNG, GIF
- Max size: 5MB
- Single image per gallery post

## Authentication

All admin routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/dental-clinic |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRE` | JWT expiration time | 30d |
| `ADMIN_EMAIL` | Default admin email | Required |
| `ADMIN_PASSWORD` | Default admin password | Required |

## Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- JWT token authentication
- Password hashing with bcrypt
- File upload validation

## Project Structure

```
├── config/
│   ├── database.js          # Database connection
│   └── createAdmin.js       # Admin user creation
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── galleryController.js # Gallery CRUD operations
│   └── serviceController.js # Services CRUD operations
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── errorHandler.js     # Error handling middleware
│   └── upload.js           # File upload configuration
├── models/
│   ├── User.js             # User model
│   ├── Gallery.js          # Gallery model
│   └── Service.js          # Service model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── gallery.js          # Gallery routes
│   └── services.js         # Services routes
├── uploads/                # Image upload directory
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
└── server.js              # Main server file
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Success Responses

All success responses follow this format:

```json
{
  "success": true,
  "message": "Operation description",
  "data": { /* response data */ }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.