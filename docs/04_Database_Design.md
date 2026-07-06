# Database Design

# AyurScan

### Enterprise AI-Powered Medicinal Plant Intelligence Platform

---

# Document Information

| Field | Details |
|--------|---------|
| Document | Database Design |
| Version | 1.0 |
| Database | PostgreSQL |
| ORM | Prisma |
| Author | Shrasti  |
| Date | July 2026 |

---

# 1. Purpose

This document defines the logical and physical database design for AyurScan.

The database stores:

- User Accounts
- Medicinal Plant Information
- Scan History
- Favorite Plants
- AI Prediction Metadata

The design follows relational database principles to ensure data consistency, integrity, and scalability.

---

# 2. Database Technology

| Component | Technology |
|------------|------------|
| Database | PostgreSQL |
| ORM | Prisma |
| Migration Tool | Prisma Migrate |

---

# 3. Database Design Principles

The database follows:

- Third Normal Form (3NF)
- ACID Transactions
- Referential Integrity
- Primary and Foreign Keys
- Indexed Search Columns
- UUID-based Primary Keys

---

# 4. Entity Relationship Overview

Major Entities

- User
- Plant
- ScanHistory
- Favorite
- PlantCompound

Relationships

User → ScanHistory (One-to-Many)

User → Favorite (One-to-Many)

Plant → ScanHistory (One-to-Many)

Plant → Favorite (One-to-Many)

Plant → PlantCompound (One-to-Many)

---

# 5. Database Tables

## Users

| Column | Type | Constraints |
|---------|------|------------|
| id | UUID | Primary Key |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | UNIQUE |
| password | TEXT | NOT NULL |
| role | ENUM | USER / ADMIN |
| created_at | TIMESTAMP | DEFAULT NOW() |

---

## Plants

| Column | Type |
|---------|------|
| id | UUID |
| common_name | VARCHAR(100) |
| scientific_name | VARCHAR(150) |
| family | VARCHAR(100) |
| description | TEXT |
| dosage | TEXT |
| benefits | TEXT |
| side_effects | TEXT |
| contraindications | TEXT |
| image_url | TEXT |

---

## PlantCompounds

| Column | Type |
|---------|------|
| id | UUID |
| plant_id | UUID |
| compound_name | VARCHAR(100) |
| medicinal_use | TEXT |

---

## ScanHistory

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| plant_id | UUID |
| confidence | DECIMAL |
| uploaded_image | TEXT |
| prediction_time | TIMESTAMP |

---

## Favorites

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| plant_id | UUID |

---

# 6. Relationships

User

↓

Scan History

↓

Plant

↓

Plant Compounds

User

↓

Favorites

↓

Plant

---

# 7. Indexing Strategy

Indexes will be created on:

- email
- scientific_name
- common_name
- prediction_time

to improve query performance.

---

# 8. Constraints

- Email must be unique.
- Password cannot be NULL.
- Plant names cannot be duplicated.
- Scan history must reference valid users.
- Favorites cannot contain duplicate entries for the same user and plant.

---

# 9. Security Considerations

Sensitive information stored:

- Password Hashes (bcrypt)

Sensitive information NOT stored:

- Plain text passwords

---

# 10. Backup Strategy

Daily PostgreSQL backups

Weekly Full Backup

Monthly Archive

---

# 11. Future Database Expansion

Future versions may include:

- AI Model Version Table
- Plant Disease Table
- Image Metadata
- User Activity Logs
- Analytics Table

---

# 12. Conclusion

The database design ensures consistency, scalability, and maintainability while supporting the requirements defined in the Software Requirements Specification.