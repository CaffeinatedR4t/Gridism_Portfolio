# Gridism Portfolio — Backend

A lightweight Go backend that handles contact form submissions from the Gridism portfolio frontend. It validates incoming data, then sends a styled HTML notification email via SMTP.

## Quick Start

### 1. Prerequisites

- [Go 1.22+](https://go.dev/dl/) installed
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) (or another SMTP provider)

### 2. Configure Environment

```bash
cd Backend
cp .env.example .env
```

Open `.env` and fill in your SMTP credentials:

```env
PORT=8080
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
NOTIFY_EMAIL=your-email@gmail.com
ALLOWED_ORIGINS=http://localhost:3000
```

### 3. Install Dependencies

```bash
go mod tidy
```

### 4. Run

```bash
go run main.go
```

The server starts on `http://localhost:8080`.

## API Endpoints

| Method | Endpoint        | Description                  |
|--------|-----------------|------------------------------|
| `POST` | `/api/contact`  | Submit a contact form        |
| `GET`  | `/api/health`   | Health check (`{"status":"ok"}`) |

### `POST /api/contact`

**Request Body (JSON):**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "company": "Acme Inc.",
  "social": "@janedoe",
  "message": "Hello! I'd love to collaborate."
}
```

| Field     | Type   | Required |
|-----------|--------|----------|
| `name`    | string | ✅       |
| `email`   | string | ✅       |
| `company` | string | ❌       |
| `social`  | string | ✅       |
| `message` | string | ✅       |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Missing required fields: name, email"
}
```

## Project Structure

```
Backend/
├── main.go              # Entry point — server, CORS, routing
├── handlers/
│   └── contact.go       # Request handlers (contact + health)
├── models/
│   └── contact.go       # Data structs (ContactForm, ContactResponse)
├── services/
│   └── email.go         # SMTP email sending logic
├── go.mod               # Go module definition
├── .env.example         # Example environment config
└── README.md            # This file
```

## License

Part of the Gridism Portfolio project.
