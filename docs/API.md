# ScholarForge API Documentation

## Quiz Management

### GET /api/quizzes
Get available quizzes by language and topic.

**Parameters:**
- `language` (optional): Filter by language code (e.g., "twi", "yoruba")
- `topic` (optional): Filter by topic/subject
- `difficulty` (optional): Filter by difficulty level

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "quiz_123",
      "title": "Basic Twi Grammar",
      "language": "twi",
      "topic": "grammar",
      "difficulty": "beginner",
      "questions": 10,
      "xp_reward": 50
    }
  ]
}
```

### POST /api/quizzes
Create a new quiz (QuizMaster only).

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "title": "Advanced Yoruba Vocabulary",
  "language": "yoruba",
  "topic": "vocabulary",
  "difficulty": "advanced",
  "questions": [
    {
      "question": "What does 'omo' mean in English?",
      "options": ["child", "house", "water", "food"],
      "correct": 0
    }
  ],
  "xp_reward": 100
}
```

### PUT /api/quizzes/:id
Update quiz content.

**Parameters:**
- `id`: Quiz ID to update

**Body:** Same as POST /api/quizzes

### DELETE /api/quizzes/:id
Delete a quiz (Admin only).

**Parameters:**
- `id`: Quiz ID to delete

## Translation Management

### POST /api/translate
Auto-translate quiz content using AI.

**Body:**
```json
{
  "content": "Hello, how are you?",
  "from_language": "en",
  "to_language": "twi",
  "context": "greeting"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "Hello, how are you?",
    "translated": "Wo ho te sɛn?",
    "confidence": 0.95,
    "needs_review": false
  }
}
```

### POST /api/suggestions
Submit translation suggestions.

**Body:**
```json
{
  "quiz_id": "quiz_123",
  "field": "question",
  "original_text": "What is your name?",
  "suggested_translation": "Wo din de sɛn?",
  "language": "twi",
  "reason": "More natural phrasing"
}
```

### GET /api/suggestions
Get pending suggestions for review.

**Parameters:**
- `language` (optional): Filter by language
- `status` (optional): Filter by status (pending, approved, rejected)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "suggestion_456",
      "quiz_id": "quiz_123",
      "field": "question",
      "original_text": "What is your name?",
      "suggested_translation": "Wo din de sɛn?",
      "language": "twi",
      "status": "pending",
      "submitted_by": "0x1234...",
      "submitted_at": "2025-08-08T10:30:00Z"
    }
  ]
}
```

## XP Rewards

### POST /api/rewards/xp
Award XP for quiz completion or contributions.

**Body:**
```json
{
  "user_address": "0x1234567890abcdef",
  "amount": 100,
  "reason": "Completed Advanced Twi Quiz",
  "activity_type": "quiz_completion",
  "quiz_id": "quiz_123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction_hash": "0xabcdef...",
    "new_balance": 550,
    "xp_awarded": 100
  }
}
```

### GET /api/leaderboard
Get leaderboards by language and globally.

**Parameters:**
- `type`: "global" or "language"
- `language` (required if type=language): Language code
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": {
    "leaderboard_type": "language",
    "language": "twi",
    "updated_at": "2025-08-08T12:00:00Z",
    "entries": [
      {
        "rank": 1,
        "address": "0x1234567890abcdef",
        "username": "TwiMaster",
        "xp_balance": 2500,
        "skills_earned": 5,
        "quizzes_completed": 25,
        "contributions": 12
      }
    ]
  }
}
```

## User Profile

### GET /api/profile/:address
Get user profile information.

**Parameters:**
- `address`: User's wallet address

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x1234567890abcdef",
    "username": "TwiMaster",
    "xp_balance": 2500,
    "skill_nfts": [
      {
        "token_id": 1,
        "skill_name": "Twi Grammar Master",
        "earned_at": "2025-08-01T14:30:00Z",
        "metadata_uri": "ipfs://Qm..."
      }
    ],
    "language_hero": ["twi"],
    "stats": {
      "quizzes_completed": 25,
      "languages_learned": 3,
      "contributions_made": 12,
      "xp_earned_total": 2500
    }
  }
}
```

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required field: language",
    "details": {
      "field": "language",
      "received": null,
      "expected": "string"
    }
  }
}
```

### Common Error Codes:
- `VALIDATION_ERROR`: Invalid request parameters
- `UNAUTHORIZED`: Missing or invalid authentication
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Authentication

Most endpoints require authentication using JWT tokens:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Roles:
- **Student**: Can take quizzes, submit suggestions, view leaderboards
- **QuizMaster**: Can create/edit quizzes, award XP, manage translations
- **Admin**: Full access to all endpoints including user management