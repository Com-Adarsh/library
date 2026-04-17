# API Documentation - The IMSC Commons

## Base URL
```
https://imsc-commons.vercel.app/api
```

---

## Endpoints

### Resources

#### `GET /api/resources`
Get all approved resources with optional filters.

**Query Parameters:**
- `subject` (optional): Filter by subject name
- `semester` (optional): Filter by semester (1-10)
- `category` (optional): Filter by category (question_paper, textbook, student_notes)

**Example:**
```bash
GET /api/resources?subject=Physics&semester=1&category=question_paper
```

**Response:**
```json
{
  "resources": [
    {
      "id": "uuid",
      "title": "Mid-semester Physics Exam 2024",
      "subject": "Physics",
      "semester": 1,
      "category": "question_paper",
      "file_url": "https://...",
      "file_size_mb": 2.5,
      "description": "...",
      "upload_at": "2024-04-15",
      "download_count": 234
    }
  ]
}
```

---

#### `POST /api/resources`
Create a new resource (requires authentication).

**Authentication:** Supabase JWT Token required

**Request Body:**
```json
{
  "title": "Document Title",
  "subject": "Physics",
  "semester": 1,
  "category": "question_paper",
  "file_url": "https://storage-url.../file.pdf",
  "file_size_mb": 2.5,
  "description": "Optional description",
  "uploader_id": "user-uuid"
}
```

**Response:** `201 Created`
```json
{
  "resource": { ... }
}
```

---

#### `GET /api/resources/[id]`
Get specific resource details.

**Response:**
```json
{
  "resource": { ... }
}
```

---

#### `PUT /api/resources/[id]`
Update resource (owner only).

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated Description",
  "category": "textbook"
}
```

---

#### `DELETE /api/resources/[id]`
Delete resource (owner only).

**Response:** `204 No Content`

---

### Threads (Discussions)

#### `GET /api/threads`
Get all discussion threads.

**Query Parameters:**
- `subject` (optional): Filter by subject

**Response:**
```json
{
  "threads": [
    {
      "id": "uuid",
      "title": "How to solve...",
      "content": "Thread content here",
      "author_id": "user-uuid",
      "subject": "Mathematics",
      "created_at": "2024-04-15T10:00:00Z",
      "view_count": 150
    }
  ]
}
```

---

#### `POST /api/threads`
Create new discussion thread (requires authentication).

**Request Body:**
```json
{
  "title": "Question Title",
  "content": "Detailed question here",
  "subject": "Physics",
  "author_id": "user-uuid"
}
```

**Response:** `201 Created`

---

#### `GET /api/threads/[id]`
Get specific thread with all details.

---

#### `PUT /api/threads/[id]`
Update thread (author only).

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

---

#### `DELETE /api/threads/[id]`
Delete thread (author only - soft delete).

---

### Comments

#### `GET /api/threads/[id]/comments`
Get all comments on a thread.

**Response:**
```json
{
  "comments": [
    {
      "id": "uuid",
      "thread_id": "uuid",
      "content": "Comment text",
      "author_id": "user-uuid",
      "created_at": "2024-04-15T10:00:00Z"
    }
  ]
}
```

---

#### `POST /api/comments`
Add comment to thread (requires authentication).

**Request Body:**
```json
{
  "thread_id": "uuid",
  "content": "Your comment here",
  "author_id": "user-uuid"
}
```

**Response:** `201 Created`

---

#### `DELETE /api/comments`
Delete comment (author only - soft delete).

**Request Body:**
```json
{
  "id": "uuid"
}
```

---

### Leaderboard

#### `GET /api/leaderboard`
Get top contributors.

**Query Parameters:**
- `limit` (optional, default: 10): Number of results

**Response:**
```json
{
  "contributors": [
    {
      "id": "uuid",
      "name": "John Doe",
      "avatar_url": "https://...",
      "contribution_count": 45
    }
  ]
}
```

---

### Users

#### `GET /api/users/[id]`
Get user profile.

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "contributor",
    "avatar_url": "https://...",
    "bio": "Computer Science student",
    "contribution_count": 10,
    "created_at": "2024-01-15T00:00:00Z"
  }
}
```

---

#### `PUT /api/users/[id]`
Update user profile (self only).

**Request Body:**
```json
{
  "name": "New Name",
  "bio": "Updated bio",
  "avatar_url": "https://..."
}
```

---

### News

#### `GET /api/news`
Get cached science news articles.

**Query Parameters:**
- `category` (optional): Physics, Chemistry, Biology, Environment, Photonics

**Response:**
```json
{
  "articles": [
    {
      "id": "unique-id",
      "title": "Article Title",
      "description": "Article summary",
      "source": { "name": "Science Daily" },
      "image": "https://...",
      "url": "https://...",
      "category": "Physics",
      "published_at": "2024-04-15"
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Authentication

### Using Supabase Auth Token

Add to request headers:
```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

**Example with cURL:**
```bash
curl -X POST https://imsc-commons.vercel.app/api/threads \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"title":"...","content":"...","subject":"...","author_id":"..."}'
```

**Example with JavaScript:**
```typescript
const response = await fetch('/api/threads', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

---

## Rate Limiting

- **Free Tier**: 30 requests per minute per IP
- **Pro Tier**: unlimited

---

## Webhooks (Advanced)

Supabase can send webhooks on database changes. Configure in:
Supabase Dashboard → Database → Webhooks

---

**Version**: 1.0  
**Last Updated**: April 15, 2026
