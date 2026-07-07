# ADR-004: Deployment Strategy

---

## Status

Accepted

---

## Date

July 2026

---

## Author

Shrasti

---

# Context

AyurScan consists of multiple services that must work together reliably:

- Frontend
- Backend
- AI Service
- PostgreSQL Database

The deployment strategy should provide:

- Easy local development
- Consistent environments
- Service isolation
- Simplified onboarding
- Future cloud deployment
- Production readiness

---

# Decision

Docker Compose has been selected as the deployment strategy for local development.

Each application component will run inside its own Docker container while communicating over a private Docker network.

The deployment architecture consists of:

- Next.js Frontend
- NestJS Backend
- FastAPI AI Service
- PostgreSQL Database

---

# Alternatives Considered

## Manual Installation

### Advantages

- Simple for very small projects
- No Docker knowledge required

### Disadvantages

- Dependency conflicts
- Environment inconsistencies
- Difficult onboarding
- Error-prone setup

Decision:

Not Selected

---

## Virtual Machines

### Advantages

- Strong isolation
- Full operating system control

### Disadvantages

- Higher resource usage
- Slower startup
- More complex maintenance

Decision:

Not Selected

---

## Docker Compose

### Advantages

- Consistent development environment
- Service isolation
- Easy dependency management
- Simple multi-container orchestration
- Industry-standard workflow
- Fast onboarding

### Disadvantages

- Initial Docker learning curve
- Additional configuration files

Decision:

Selected

---

# Deployment Architecture

```text
                     User
                       │
                       ▼
              Next.js Frontend
                       │
                HTTP REST API
                       │
                       ▼
              NestJS Backend
              ┌────────┴────────┐
              ▼                 ▼
        PostgreSQL        FastAPI AI Service
```

---

# Container Responsibilities

## Frontend Container

Responsible for:

- User Interface
- Authentication Screens
- Dashboard
- Image Upload
- Displaying AI Results

---

## Backend Container

Responsible for:

- Authentication
- Business Logic
- API Endpoints
- Database Operations
- Communication with AI Service

---

## AI Service Container

Responsible for:

- Image Preprocessing
- TensorFlow Model Loading
- AI Inference
- Confidence Score
- Grad-CAM Generation

---

## PostgreSQL Container

Responsible for:

- User Data
- Plant Information
- Prediction History
- Favorites
- Administrative Records

---

# Environment Configuration

Each service maintains its own environment variables.

Examples include:

- Database connection string
- JWT secret
- AI service URL
- API base URL
- Model file path

Sensitive information will never be committed to the Git repository.

---

# Networking

Docker Compose creates a private bridge network.

All containers communicate using service names instead of IP addresses.

Example:

Backend communicates with:

- postgres
- ai-service

without requiring hardcoded IP addresses.

---

# Scalability

The chosen deployment strategy allows future migration to:

- Docker Swarm
- Kubernetes
- AWS ECS
- Azure Container Apps
- Google Cloud Run

without major architectural changes.

---

# Rationale

Docker Compose was selected because it provides:

- Consistent environments
- Simple deployment
- Easy service management
- Better developer experience
- Production-aligned architecture

This supports the project's objective of demonstrating enterprise software engineering practices.

---

# Consequences

## Positive

- Reproducible development environment
- Simplified onboarding
- Easy debugging
- Service independence
- Clean architecture
- Portable deployment

## Negative

- Additional Docker configuration
- Higher memory usage than native execution
- Requires Docker knowledge

---

# Future Enhancements

Future deployment improvements may include:

- Kubernetes orchestration
- Nginx reverse proxy
- HTTPS with SSL/TLS
- GitHub Actions CI/CD pipeline
- Automated image builds
- Health monitoring
- Auto-scaling
- Cloud deployment

---

# References

- Docker Documentation
- Docker Compose Documentation
- Kubernetes Documentation
- Twelve-Factor App Methodology

---

# Approval

Status: Accepted

Implementation Phase: Milestone M3