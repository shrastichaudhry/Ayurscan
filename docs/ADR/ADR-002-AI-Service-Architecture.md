# ADR-002: AI Service Architecture

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

AyurScan uses an Artificial Intelligence model to identify medicinal plants from uploaded images.

A decision was required on how the AI model should be integrated with the application.

The following architectural approaches were considered:

- Integrate the AI model directly into the backend.
- Deploy the AI model as an independent microservice.

The solution needed to provide:

- High maintainability
- Independent scalability
- Fast inference
- Easy model upgrades
- Clear separation of responsibilities

---

# Decision

The AI model will run as an independent FastAPI microservice.

The NestJS backend will communicate with the AI service using REST APIs.

The AI service will be responsible only for machine learning inference and image processing.

---

# Alternatives Considered

## AI Inside NestJS Backend

### Advantages

- Simpler initial setup
- Fewer services to manage
- Easier local development

### Disadvantages

- Mixes business logic with AI logic
- Difficult to maintain
- Backend becomes resource intensive
- Harder to replace or upgrade the model

Decision:

Not Selected

---

## Python Flask Service

### Advantages

- Lightweight
- Easy to learn

### Disadvantages

- Lower performance than FastAPI
- Limited automatic API documentation
- Less suitable for high-performance inference

Decision:

Not Selected

---

## FastAPI Microservice

### Advantages

- High performance
- Native Python ecosystem
- Excellent TensorFlow support
- Automatic Swagger documentation
- Easy asynchronous request handling
- Independent deployment and scaling

### Disadvantages

- Requires communication between services
- Slightly more deployment complexity

Decision:

Selected

---

# Architecture

```text
User
   │
   ▼
Next.js Frontend
   │
   ▼
NestJS Backend
   │
REST API
   │
   ▼
FastAPI AI Service
   │
   ▼
TensorFlow Model
```

---

# Responsibilities

## NestJS Backend

Responsible for:

- Authentication
- Authorization
- User Management
- Plant Information
- Prediction History
- Request Validation

---

## FastAPI AI Service

Responsible for:

- Image preprocessing
- Model loading
- AI inference
- Confidence score calculation
- Grad-CAM generation
- Returning prediction results

---

# Communication

Communication between services uses REST APIs.

Request Format:

- HTTP POST
- Multipart Image Upload

Response Format:

```json
{
  "prediction": "Tulsi",
  "confidence": 99.21,
  "gradcam": "gradcam.png"
}
```

---

# Rationale

Separating the AI model into its own service provides:

- Better maintainability
- Independent development
- Easier debugging
- Independent deployment
- Future scalability
- Technology flexibility

This architecture aligns with modern microservice design principles.

---

# Consequences

## Positive

- Modular architecture
- Easier AI model replacement
- Faster backend development
- Better scalability
- Cleaner codebase
- Independent testing

## Negative

- Additional service to manage
- Slight network overhead
- More Docker containers

---

# Future Improvements

Future enhancements may include:

- gRPC communication
- Model versioning
- GPU inference
- ONNX Runtime
- TensorFlow Serving
- AI request queue
- Batch prediction

---

# References

- FastAPI Documentation
- TensorFlow Documentation
- Microservices Architecture Pattern

---

# Approval

Status: Accepted

Implementation Phase: Milestone M3