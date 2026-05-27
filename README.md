# Signage Server

NestJS backend server for the Signage platform with PostgreSQL and Cloudflare R2 storage.

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL (Neon)
- **Storage**: Cloudflare R2 (S3-compatible)
- **ORM**: TypeORM

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `R2_ACCOUNT_ID` - Cloudflare account ID
- `R2_ACCESS_KEY_ID` - R2 access key
- `R2_SECRET_ACCESS_KEY` - R2 secret key
- `R2_BUCKET_NAME` - R2 bucket name
- `R2_PUBLIC_URL` - Public URL for R2 assets

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

## API Endpoints

### Health Check
```
GET /health
```

### Devices

#### Register Device
```
POST /api/devices
Content-Type: application/json

{
  "machine_address": "192.168.1.100",
  "name": "Lobby Display",
  "metadata": {
    "location": "Building A"
  }
}
```

#### List All Devices
```
GET /api/devices
```

#### Get Device by ID
```
GET /api/devices/:id
```

#### Update Device
```
PUT /api/devices/:id
```

#### Delete Device
```
DELETE /api/devices/:id
```

## Project Structure

```
src/
├── device/           # Device module
│   ├── dto/          # Data transfer objects
│   ├── entities/     # TypeORM entities
│   ├── device.controller.ts
│   ├── device.module.ts
│   └── device.service.ts
├── storage/          # Cloudflare R2 storage module
│   ├── storage.module.ts
│   └── storage.service.ts
├── app.controller.ts
├── app.module.ts
└── main.ts
```
