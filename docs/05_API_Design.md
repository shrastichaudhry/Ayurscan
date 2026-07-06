# API Design

# AyurScan

### Enterprise AI-Powered Medicinal Plant Intelligence Platform

---

# Document Information

| Field | Details |
|--------|---------|
| Document | API Design |
| Version | 1.0 |
| API Style | REST API |
| Specification | OpenAPI 3.0 |
| Author | Shrasti  |
| Date | July 2026 |

---

# 1. Purpose

This document defines the REST APIs exposed by the AyurScan backend. These APIs enable authentication, medicinal plant prediction, user management, favorites, and scan history.

---

# 2. API Standards

- REST Architecture
- JSON Request/Response
- JWT Authentication
- HTTPS Communication
- HTTP Status Codes
- OpenAPI 3.0 Documentation

---

# 3. Authentication APIs

## Register User

**POST** `/api/v1/auth/register`

### Request Body

```json
{
  "name": "Shrasti",
  "email": "shrasti@example.com",
  "password": "Password@123"
}
```

### Success Response (201)

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login User

**POST** `/api/v1/auth/login`

### Request Body

```json
{
  "email": "shrasti@example.com",
  "password": "Password@123"
}
```

### Success Response (200)

```json
{
  "token": "JWT_TOKEN"
}
```

---

# 4. Prediction APIs

## Predict Plant

**POST** `/api/v1/predict`

### Authentication

JWT Required

### Request

multipart/form-data

Field:

```
image
```

### Success Response

```json
{
  "prediction": "Tulsi",
  "confidence": 99.18,
  "gradcam": "gradcam.png",
  "plantId": "UUID"
}
```

---

# 5. Plant APIs

## Get All Plants

**GET** `/api/v1/plants`

### Response

Returns all medicinal plants.

---

## Get Plant Details

**GET** `/api/v1/plants/{id}`

Returns:

- Scientific Name
- Benefits
- Dosage
- Active Compounds
- Side Effects
- Contraindications

---

# 6. Scan History APIs

## Get Scan History

**GET** `/api/v1/history`

JWT Required

---

## Delete Scan History

**DELETE** `/api/v1/history/{id}`

JWT Required

---

# 7. Favorite APIs

## Add Favorite

**POST** `/api/v1/favorites`

---

## Get Favorites

**GET** `/api/v1/favorites`

---

## Remove Favorite

**DELETE** `/api/v1/favorites/{id}`

---

# 8. Admin APIs

## Add Plant

**POST** `/api/v1/admin/plants`

Admin Only

---

## Update Plant

**PUT** `/api/v1/admin/plants/{id}`

Admin Only

---

## Delete Plant

**DELETE** `/api/v1/admin/plants/{id}`

Admin Only

---

# 9. Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# 10. Authentication

Protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 11. API Versioning

Current Version

```
v1
```

Future versions

```
v2
v3
```

---

# 12. Validation Rules

Registration

- Name Required
- Valid Email
- Password Minimum 8 Characters

Prediction

- Image Required
- JPG
- JPEG
- PNG
- Maximum 10 MB

---

# 13. Error Response Format

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Image is required"
  ]
}
```

---

# 14. Future APIs

- Analytics
- AI Model Version
- Notifications
- Research Articles
- Plant Disease Detection

---

# 15. Conclusion

The API follows REST principles, OpenAPI standards, and JWT-based authentication to provide secure, scalable, and maintainable communication between the frontend, backend, and AI service.