# System Architecture

# AyurScan

### Enterprise AI-Powered Medicinal Plant Intelligence Platform

---

# Document Information

| Field | Details |
|--------|---------|
| Document | System Architecture |
| Version | 1.0 |
| Standard | C4 Model |
| Author | Shrasti Chaudhary |
| Date | July 2026 |

---

# 1. Purpose

This document describes the overall architecture of AyurScan. It explains the major software components, how they communicate, deployment strategy, and architectural decisions.

The architecture follows modern software engineering principles with clear separation of responsibilities between the frontend, backend, AI service, and database.

---

# 2. Architectural Goals

The architecture is designed to achieve the following objectives:

- High Accuracy AI Prediction
- Modular Design
- Scalability
- Security
- Maintainability
- High Performance
- Easy Deployment
- Production Readiness

---

# 3. Architectural Style

AyurScan follows a **Microservice Architecture**.

Major services include:

- Frontend Service
- Backend Service
- AI Inference Service
- Database Service

Each service has a single responsibility and communicates through REST APIs.

---

# 4. Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | Next.js + TypeScript |
| Backend | NestJS |
| AI Service | FastAPI |
| AI Framework | TensorFlow |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT |
| Documentation | Swagger |
| Containerization | Docker |
| Version Control | Git |

---

# 5. High-Level Architecture

```text
                        User
                          │
                          ▼
                 Next.js Frontend
                          │
              HTTPS REST API Calls
                          │
                          ▼
                 NestJS Backend API
                 ┌────────┴─────────┐
                 ▼                  ▼
          PostgreSQL DB      FastAPI AI Service
                                   │
                                   ▼
                           TensorFlow Model
```

---

# 6. Component Responsibilities

## Frontend

Responsibilities:

- User Interface
- Authentication
- Image Upload
- Display Predictions
- Scan History
- Favorites

Technology:

- Next.js
- TypeScript
- Tailwind CSS

---

## Backend

Responsibilities:

- Authentication
- Authorization
- User Management
- Plant Information
- Scan History
- API Gateway

Technology:

- NestJS

---

## AI Service

Responsibilities:

- Image Preprocessing
- AI Inference
- Confidence Score
- Grad-CAM Generation

Technology:

- FastAPI
- TensorFlow
- OpenCV

---

## Database

Responsibilities:

- User Data
- Plant Information
- Prediction History
- Favorites

Technology:

- PostgreSQL

---

# 7. Data Flow

Step 1

User uploads a plant image.

↓

Step 2

Frontend sends image to Backend.

↓

Step 3

Backend forwards image to FastAPI.

↓

Step 4

FastAPI preprocesses image.

↓

Step 5

TensorFlow predicts plant.

↓

Step 6

Confidence Score generated.

↓

Step 7

Grad-CAM generated.

↓

Step 8

Backend fetches plant information.

↓

Step 9

Response returned to frontend.

---

# 8. Security Architecture

Security mechanisms include:

- JWT Authentication
- Password Hashing (bcrypt)
- Protected REST APIs
- Input Validation
- Role-Based Access Control (Admin/User)

---

# 9. Deployment Architecture

Deployment uses Docker Compose.

Containers:

- Frontend
- Backend
- AI Service
- PostgreSQL

All services communicate over a Docker network.

---

# 10. Scalability

The architecture supports:

- Independent service deployment
- Future AI model upgrades
- Horizontal backend scaling
- Cloud deployment
- Additional medicinal plant classes

---

# 11. Architectural Decisions

| Decision | Reason |
|----------|--------|
| PostgreSQL | Structured relational data |
| FastAPI | High-performance AI inference |
| NestJS | Modular backend architecture |
| Docker | Consistent deployments |
| Prisma | Type-safe ORM |
| TensorFlow | Reliable Deep Learning framework |

---

# 12. Future Architecture

Future versions may introduce:

- Redis Cache
- AWS S3 Storage
- Kubernetes
- RabbitMQ
- Prometheus
- Grafana
- CI/CD Pipelines

---

# 13. Conclusion

The architecture emphasizes modularity, scalability, and maintainability. By separating the AI inference service from the application backend, AyurScan supports future expansion while keeping the system easy to manage and deploy.