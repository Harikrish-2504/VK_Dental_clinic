# Dental Clinic Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation description",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authentication Endpoints

### 1. Admin Login
**POST** `/auth/login`

Login with admin credentials to get JWT token.

**Request Body:**
```json
{
  "email": "admin@dentalclinic.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Admin",
    "email": "admin@dentalclinic.com",
    "role": "admin",
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get Current User
**GET** `/auth/me`

Get current logged-in user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Admin",
    "email": "admin@dentalclinic.com",
    "role": "admin",
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Update Profile
**PUT** `/auth/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "New Admin Name",
  "email": "newemail@dentalclinic.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "New Admin Name",
    "email": "newemail@dentalclinic.com",
    "role": "admin"
  }
}
```

---

## Gallery Endpoints

### 1. Get All Gallery Posts
**GET** `/gallery`

Get all active gallery posts with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:** `/gallery?page=1&limit=5`

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 5
    }
  },
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Beautiful Smile Transformation",
      "description": "Before and after dental treatment",
      "image": {
        "filename": "image-1640995200000-123456789.jpg",
        "path": "uploads/image-1640995200000-123456789.jpg",
        "mimetype": "image/jpeg",
        "size": 245760,
        "url": "http://localhost:5000/uploads/image-1640995200000-123456789.jpg"
      },
      "isActive": true,
      "createdBy": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "name": "Admin"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 2. Get Single Gallery Post
**GET** `/gallery/:id`

Get a specific gallery post by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Beautiful Smile Transformation",
    "description": "Before and after dental treatment",
    "image": {
      "filename": "image-1640995200000-123456789.jpg",
      "path": "uploads/image-1640995200000-123456789.jpg",
      "mimetype": "image/jpeg",
      "size": 245760,
      "url": "http://localhost:5000/uploads/image-1640995200000-123456789.jpg"
    },
    "isActive": true,
    "createdBy": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "name": "Admin"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Create Gallery Post
**POST** `/gallery`

Create a new gallery post with image upload. **Admin only**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `title` (required): Gallery post title
- `description` (optional): Gallery post description
- `image` (required): Image file (JPG, PNG, GIF, max 5MB)

**Response:**
```json
{
  "success": true,
  "message": "Gallery post created successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "New Gallery Post",
    "description": "Description of the post",
    "image": {
      "filename": "image-1640995200000-123456789.jpg",
      "path": "uploads/image-1640995200000-123456789.jpg",
      "mimetype": "image/jpeg",
      "size": 245760
    },
    "isActive": true,
    "createdBy": "64f8a1b2c3d4e5f6a7b8c9d1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Update Gallery Post
**PUT** `/gallery/:id`

Update an existing gallery post. **Admin only**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Gallery Title",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Gallery post updated successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Updated Gallery Title",
    "description": "Updated description",
    "image": {
      "filename": "image-1640995200000-123456789.jpg",
      "path": "uploads/image-1640995200000-123456789.jpg",
      "mimetype": "image/jpeg",
      "size": 245760
    },
    "isActive": true,
    "createdBy": "64f8a1b2c3d4e5f6a7b8c9d1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 5. Delete Gallery Post
**DELETE** `/gallery/:id`

Delete a gallery post and its associated image file. **Admin only**.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Gallery post deleted successfully"
}
```

---

## Services Endpoints

### 1. Get All Services
**GET** `/services`

Get all active services with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category (general, cosmetic, orthodontics, surgery, pediatric, emergency)
- `featured` (optional): Filter by featured status (true/false)

**Example:** `/services?category=cosmetic&featured=true&page=1&limit=5`

**Response:**
```json
{
  "success": true,
  "count": 3,
  "total": 15,
  "pagination": {
    "next": {
      "page": 2,
      "limit": 5
    }
  },
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Teeth Whitening",
      "description": "Professional teeth whitening service for a brighter smile",
      "price": 299,
      "duration": "1 hour",
      "category": "cosmetic",
      "isActive": true,
      "featured": true,
      "createdBy": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "name": "Admin"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 2. Get Single Service
**GET** `/services/:id`

Get a specific service by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Teeth Whitening",
    "description": "Professional teeth whitening service for a brighter smile",
    "price": 299,
    "duration": "1 hour",
    "category": "cosmetic",
    "isActive": true,
    "featured": true,
    "createdBy": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "name": "Admin"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Create Service
**POST** `/services`

Create a new dental service. **Admin only**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Root Canal Treatment",
  "description": "Complete root canal therapy to save infected teeth",
  "price": 899,
  "duration": "2 hours",
  "category": "general",
  "featured": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Root Canal Treatment",
    "description": "Complete root canal therapy to save infected teeth",
    "price": 899,
    "duration": "2 hours",
    "category": "general",
    "isActive": true,
    "featured": false,
    "createdBy": "64f8a1b2c3d4e5f6a7b8c9d1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Update Service
**PUT** `/services/:id`

Update an existing service. **Admin only**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Service Title",
  "description": "Updated service description",
  "price": 999,
  "duration": "1.5 hours",
  "category": "cosmetic",
  "featured": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service updated successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Updated Service Title",
    "description": "Updated service description",
    "price": 999,
    "duration": "1.5 hours",
    "category": "cosmetic",
    "isActive": true,
    "featured": true,
    "createdBy": "64f8a1b2c3d4e5f6a7b8c9d1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 5. Delete Service
**DELETE** `/services/:id`

Delete a service. **Admin only**.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

---

## Health Check

### Health Status
**GET** `/health`

Check if the API server is running.

**Response:**
```json
{
  "success": true,
  "message": "Dental Clinic API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

## Service Categories

Available service categories:
- `general` - General dentistry
- `cosmetic` - Cosmetic procedures
- `orthodontics` - Braces and alignment
- `surgery` - Oral surgery
- `pediatric` - Children's dentistry
- `emergency` - Emergency treatments

---

## Image Upload Requirements

For gallery image uploads:
- **Supported formats**: JPG, PNG, GIF
- **Maximum file size**: 5MB
- **Field name**: `image`
- **Storage**: Local uploads folder
- **Access**: Images are served at `/uploads/{filename}`

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Response when exceeded**:
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Environment Configuration

Required environment variables:
- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT secret key
- `JWT_EXPIRE`: JWT expiration time (default: 30d)
- `ADMIN_EMAIL`: Default admin email
- `ADMIN_PASSWORD`: Default admin password

---

## Default Admin Credentials

**⚠️ Change these in production!**
- **Email**: admin@dentalclinic.com
- **Password**: admin123

---

## Example Usage with JavaScript/Fetch

### Login Example
```javascript
const login = async () => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'admin@dentalclinic.com',
      password: 'admin123'
    })
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
  }
};
```

### Create Gallery Post Example
```javascript
const createGalleryPost = async (formData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:5000/api/gallery', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData // FormData with title, description, and image file
  });
  
  return await response.json();
};
```

### Get Services Example
```javascript
const getServices = async () => {
  const response = await fetch('http://localhost:5000/api/services?featured=true');
  return await response.json();
};
```