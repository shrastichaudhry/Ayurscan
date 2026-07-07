# ADR-003: Technology Stack Selection

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

AyurScan is an enterprise-inspired AI-powered medicinal plant identification platform.

The technology stack needed to satisfy the following requirements:

- Modular architecture
- High performance
- Type safety
- Scalability
- Easy maintenance
- Strong AI ecosystem
- Production readiness
- Docker compatibility

---

# Decision

The following technology stack has been selected for the project.

| Layer | Technology |
|--------|------------|
| Frontend | Next.js |
| Backend | NestJS |
| AI Service | FastAPI |
| AI Framework | TensorFlow |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT |
| API Documentation | Swagger (OpenAPI) |
| Containerization | Docker |
| Orchestration | Docker Compose |
| Version Control | Git & GitHub |

---

# Alternatives Considered

## Frontend

### React (Vite)

Advantages

- Lightweight
- Fast development

Disadvantages

- Requires additional setup for routing and optimization
- Fewer built-in production features

Decision:

Not Selected

---

### Next.js

Advantages

- Production-ready framework
- Excellent project structure
- TypeScript support
- API routes (future use)
- Strong developer experience
- Widely adopted in industry

Disadvantages

- Slightly larger learning curve

Decision:

Selected

---

## Backend

### Express.js

Advantages

- Lightweight
- Flexible

Disadvantages

- Minimal architecture
- Requires additional libraries for enterprise features
- Less structured for large projects

Decision:

Not Selected

---

### NestJS

Advantages

- Modular architecture
- Built-in dependency injection
- TypeScript-first
- Validation support
- Authentication support
- Scalable enterprise design

Disadvantages

- Steeper learning curve

Decision:

Selected

---

## AI Service

### Flask

Advantages

- Simple
- Lightweight

Disadvantages

- Lower performance
- Limited built-in documentation

Decision:

Not Selected

---

### FastAPI

Advantages

- High performance
- Async support
- Automatic Swagger documentation
- Native Python ecosystem
- Excellent TensorFlow compatibility

Disadvantages

- Additional service to manage

Decision:

Selected

---

## Database

### MongoDB

Advantages

- Flexible schema
- Easy document storage

Disadvantages

- Less suitable for relational data
- More complex relationship handling

Decision:

Not Selected

---

### PostgreSQL

Advantages

- ACID compliance
- Strong relational support
- Excellent indexing
- Production-ready
- Excellent Prisma integration

Disadvantages

- Structured schema requires planning

Decision:

Selected

---

## ORM

### Sequelize

Advantages

- Mature ORM
- Supports PostgreSQL

Disadvantages

- Less type safety
- More verbose configuration

Decision:

Not Selected

---

### Prisma

Advantages

- Type-safe queries
- Excellent developer experience
- Simple migrations
- Auto-generated client
- Modern ecosystem

Disadvantages

- Learning Prisma schema syntax

Decision:

Selected

---

## AI Framework

### PyTorch

Advantages

- Flexible research framework
- Strong community

Disadvantages

- Slightly more complex deployment for this project

Decision:

Not Selected

---

### TensorFlow

Advantages

- Stable production deployment
- Efficient transfer learning
- TensorFlow Lite support
- Excellent model export

Disadvantages

- Larger framework size

Decision:

Selected

---

## Containerization

### Manual Setup

Advantages

- Simple for small applications

Disadvantages

- Difficult to reproduce environments
- Dependency conflicts

Decision:

Not Selected

---

### Docker

Advantages

- Consistent environments
- Easy deployment
- Service isolation
- Industry standard

Disadvantages

- Initial setup complexity

Decision:

Selected

---

# Rationale

The selected technology stack provides:

- Enterprise architecture
- High maintainability
- Independent AI service
- Type-safe backend development
- Reliable relational database
- Production-ready deployment
- Excellent scalability

The combination of Next.js, NestJS, FastAPI, PostgreSQL, Prisma, TensorFlow, and Docker creates a modern full-stack architecture aligned with current industry practices.

---

# Consequences

## Positive

- Clear separation of concerns
- Easy future scaling
- Strong maintainability
- Excellent developer experience
- Production-ready architecture
- Simplified deployments using Docker

## Negative

- More technologies to learn
- Higher initial setup effort
- Multiple services to manage

---

# Future Enhancements

Future versions may introduce:

- Redis for caching
- RabbitMQ for asynchronous messaging
- Kubernetes for orchestration
- Prometheus for monitoring
- Grafana for visualization
- GitHub Actions for CI/CD
- AWS S3 for image storage

---

# References

- Next.js Documentation
- NestJS Documentation
- FastAPI Documentation
- TensorFlow Documentation
- PostgreSQL Documentation
- Prisma Documentation
- Docker Documentation

---

# Approval

Status: Accepted

Implementation Phase: Milestone M3