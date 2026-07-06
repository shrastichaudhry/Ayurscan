# Deployment Guide

# AyurScan

### Enterprise AI-Powered Medicinal Plant Intelligence Platform

---

# Document Information

| Field | Details |
|--------|---------|
| Document | Deployment Guide |
| Version | 1.0 |
| Deployment | Docker Compose |
| Author | Shrasti |
| Date | July 2026 |

---

# 1. Purpose

This document describes the deployment strategy for AyurScan. It defines the application architecture, containerization approach, environment configuration, and deployment process for local development and future production environments.

---

# 2. Deployment Architecture

AyurScan follows a containerized microservice architecture.

The application consists of four primary services:

- Frontend Service
- Backend Service
- AI Service
- PostgreSQL Database

All services communicate through a private Docker network.

---

# 3. Deployment Architecture Diagram

```text
                    User
                      │
                      ▼
              Next.js Frontend
                      │
               REST API (HTTPS)
                      │
                      ▼
              NestJS Backend API
              ┌────────┴─────────┐
              ▼                  ▼
        PostgreSQL         FastAPI AI Service
```

---

# 4. Deployment Technologies

| Component | Technology |
|-----------|------------|
| Frontend | Next.js |
| Backend | NestJS |
| AI Service | FastAPI |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT |
| Containerization | Docker |
| Orchestration | Docker Compose |

---

# 5. Docker Containers

| Container | Purpose |
|-----------|---------|
| frontend | User Interface |
| backend | REST API |
| ai-service | AI Model Inference |
| postgres | Database |

---

# 6. Environment Variables

## Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## Backend

```env
PORT=3001
DATABASE_URL=postgresql://postgres:password@postgres:5432/ayurscan
JWT_SECRET=your-secret-key
AI_SERVICE_URL=http://ai-service:8000
```

## AI Service

```env
MODEL_PATH=models/efficientnetb0.keras
```

## PostgreSQL

```env
POSTGRES_DB=ayurscan
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```

---

# 7. Local Development Deployment

Prerequisites:

- Git
- Docker Desktop
- Docker Compose

Deployment Steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Configure the `.env` files.
4. Start all services using Docker Compose.
5. Verify all containers are running.
6. Open the frontend in the browser.

---

# 8. Docker Network

All containers communicate over an isolated Docker bridge network.

Communication Flow:

```text
Frontend
     │
     ▼
Backend
     │
 ┌───┴────┐
 ▼        ▼
Database  AI Service
```

---

# 9. Health Checks

The following health checks should be available:

- Frontend Health
- Backend Health
- AI Service Health
- Database Health

---

# 10. Logging Strategy

Application logs should be maintained separately for:

- Frontend
- Backend
- AI Service
- Database

Future versions may integrate centralized logging.

---

# 11. Backup Strategy

Database:

- Daily Backup
- Weekly Full Backup
- Monthly Archive

AI Model:

- Versioned model storage
- Backup of trained models

---

# 12. Security Considerations

Deployment includes:

- JWT Authentication
- Password Hashing (bcrypt)
- Environment Variables
- Protected REST APIs
- Input Validation

Future Enhancements:

- HTTPS
- Reverse Proxy
- Rate Limiting
- Secrets Management

---

# 13. Production Deployment Roadmap

Future deployment targets include:

- AWS EC2
- Docker Swarm
- Kubernetes
- GitHub Actions CI/CD
- Nginx Reverse Proxy

---

# 14. Deployment Checklist

- Docker Installed
- Docker Compose Installed
- Environment Variables Configured
- Database Running
- AI Model Available
- API Accessible
- Frontend Connected
- Health Checks Passing

---

# 15. Conclusion

The deployment strategy ensures portability, scalability, and consistency across development and production environments through Docker-based containerization. The modular architecture allows independent deployment and future cloud migration with minimal changes.