# Software Requirements Specification (SRS)

# AyurScan

### Enterprise AI-Powered Medicinal Plant Intelligence Platform

---

## Document Control

| Field | Details |
|-------|---------|
| Document Title | Software Requirements Specification |
| Project Name | AyurScan |
| Version | 1.0 |
| Status | Draft |
| Prepared By | Shrasti  |
| Date | July 2026 |
| Standard | IEEE 830 |

---

## Revision History

| Version | Date | Description | Author |
|----------|------|-------------|--------|
| 1.0 | July 2026 | Initial Draft | Shrasti Chaudhary |

---

# Table of Contents

1. Introduction
2. Overall Description
3. External Interface Requirements
4. System Features (Functional Requirements)
5. Non-Functional Requirements
6. Other Requirements
7. Appendices

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements for **AyurScan**, an enterprise AI-powered medicinal plant intelligence platform.

The purpose of this document is to provide a complete specification for developers, testers, project stakeholders, and future contributors. It serves as the primary reference during software design, implementation, testing, deployment, and maintenance.

---

## 1.2 Scope

AyurScan is an AI-powered web platform that recognizes medicinal plants using Deep Learning and Computer Vision techniques.

Version 1.0 intentionally supports only five medicinal plants:

- Tulsi
- Neem
- Aloe Vera
- Giloy
- Ashwagandha

For every prediction, the system provides:

- Plant Name
- Scientific Name
- Botanical Family
- Medicinal Benefits
- Dosage
- Active Compounds
- Side Effects
- Contraindications
- Confidence Score
- Explainable AI (Grad-CAM)

---

## 1.3 Definitions, Acronyms and Abbreviations

| Term | Meaning |
|------|---------|
| AI | Artificial Intelligence |
| ML | Machine Learning |
| CNN | Convolutional Neural Network |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| JWT | JSON Web Token |
| ORM | Object Relational Mapping |
| Grad-CAM | Gradient-weighted Class Activation Mapping |
| PostgreSQL | Relational Database |
| Docker | Container Platform |
| Prisma | ORM |
| FastAPI | AI Service Framework |
| NestJS | Backend Framework |

---

## 1.4 References

The following references were considered during the design of AyurScan.

- IEEE 830 Software Requirements Specification
- TensorFlow Documentation
- FastAPI Documentation
- NestJS Documentation
- PostgreSQL Documentation
- Docker Documentation
- Prisma Documentation

---

## 1.5 Overview

This document describes the complete software requirements of AyurScan, including system architecture, interfaces, functional requirements, quality attributes, and constraints.

---

# 2. Overall Description

## 2.1 Product Perspective

AyurScan is designed using a modular microservice architecture.

The system consists of:

- Next.js Frontend
- NestJS Backend
- FastAPI AI Service
- PostgreSQL Database
- Docker Infrastructure

The backend communicates with the AI inference service through REST APIs.

---

## 2.2 Product Functions

The platform provides the following major functionalities:

- User Registration
- Secure Login
- Upload Plant Images
- AI Prediction
- Confidence Score
- Grad-CAM Visualization
- Plant Information
- Scan History
- Favorite Plants
- Admin Dashboard
- Plant Management

---

## 2.3 User Classes

### Guest

Can:

- View project information
- Register

---

### Registered User

Can:

- Login
- Upload images
- View predictions
- Save favorites
- View scan history

---

### Administrator

Can:

- Manage users
- Manage plants
- View analytics
- Update medicinal information

---

## 2.4 Operating Environment

Frontend:

- Chrome
- Firefox
- Edge

Backend:

- Node.js

AI Service:

- Python

Database:

- PostgreSQL

Operating Systems:

- Windows
- Linux

Deployment:

- Docker

---

## 2.5 Design Constraints

- PostgreSQL database
- Docker deployment
- JWT authentication
- REST API communication
- TensorFlow model
- Five medicinal plant classes only

---

## 2.6 User Documentation

The project includes:

- User Manual
- Admin Manual
- API Documentation
- Deployment Guide
- AI Documentation

---

## 2.7 Assumptions and Dependencies

Assumptions:

- Internet connection available
- Clear plant images
- Docker installed

Dependencies:

- PostgreSQL
- TensorFlow
- FastAPI
- NestJS
- Docker

---

# 3. External Interface Requirements

## 3.1 User Interface

The application provides:

- Responsive Dashboard
- Authentication Pages
- Prediction Screen
- History Page
- Favorites
- Admin Dashboard

---

## 3.2 Hardware Interface

Minimum Requirements:

- 8 GB RAM
- Intel i5 Processor
- Webcam or Mobile Camera
- Internet Connection

---

## 3.3 Software Interface

- PostgreSQL
- FastAPI
- TensorFlow
- Docker
- Prisma
- GitHub

---

## 3.4 Communication Interface

Communication occurs over HTTP/HTTPS using REST APIs with JSON payloads.

---

# 4. System Features (Functional Requirements)

```
FR-001 User Registration
FR-002 User Login
FR-003 JWT Authentication
FR-004 Upload Image
FR-005 AI Prediction
FR-006 Confidence Score
FR-007 Grad-CAM
FR-008 Plant Information
FR-009 Scan History
FR-010 Favorites
FR-011 Search Plants
FR-012 Admin Login
FR-013 Plant Management
FR-014 User Management
FR-015 Swagger Documentation
```

(We'll expand each requirement into detailed subsections.)

---

# 5. Non-Functional Requirements

## Performance

- API <500 ms
- AI Prediction <2 sec

## Security

- JWT
- Password Hashing
- Input Validation

## Reliability

- 98% Prediction Accuracy

## Scalability

- Modular Microservices

## Availability

- 99% Uptime

## Maintainability

- Clean Architecture

## Portability

- Docker

---

# 6. Other Requirements

## Business Rules

- Only authenticated users can perform predictions.
- Only administrators can modify plant records.
- Uploaded images must be JPEG, JPG, or PNG.
- Maximum upload size: 10 MB.

---

## Risks

| Risk | Mitigation |
|------|------------|
| Poor image quality | Image preprocessing |
| Dataset imbalance | Data augmentation |
| Unauthorized access | JWT Authentication |
| Database failure | Regular backup |

---

## Future Enhancements

- Disease Detection
- Mobile App
- AWS Deployment
- Kubernetes
- Multilingual Support
- Analytics Dashboard

---

# 7. Appendices

## Appendix A

Glossary

## Appendix B

Technology Stack

## Appendix C

Architecture Diagrams

## Appendix D

Database ER Diagram

## Appendix E

API Documentation
