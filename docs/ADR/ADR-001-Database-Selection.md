# ADR-001: Database Selection

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

AyurScan requires a reliable database to store:

- User accounts
- Authentication data
- Medicinal plant information
- Prediction history
- Favorite plants
- Administrative records

The database must support:

- Strong data consistency
- Relational data modeling
- Secure transactions
- Scalability
- Easy integration with the backend

---

# Decision

PostgreSQL has been selected as the primary database for AyurScan.

Prisma ORM will be used for database access and schema management.

---

# Alternatives Considered

## MongoDB

### Advantages

- Flexible schema
- Easy document storage
- Good horizontal scalability

### Disadvantages

- Less suitable for highly relational data
- Complex relationship management
- Joins are less efficient compared to relational databases

Decision:

Not Selected

---

## MySQL

### Advantages

- Mature ecosystem
- Good relational support

### Disadvantages

- Slightly fewer advanced PostgreSQL features
- Less flexibility for future analytical queries

Decision:

Not Selected

---

## SQLite

### Advantages

- Lightweight
- Simple setup

### Disadvantages

- Not suitable for multi-user production applications
- Limited scalability

Decision:

Not Selected

---

# Rationale

PostgreSQL was selected because it provides:

- ACID compliance
- Excellent relational modeling
- Strong indexing capabilities
- High reliability
- Broad industry adoption
- Excellent Prisma support
- Production readiness

These characteristics align with AyurScan's long-term scalability and maintainability goals.

---

# Consequences

### Positive

- Strong data integrity
- Efficient relational queries
- Excellent Prisma integration
- Production-ready architecture
- Easy future scaling

### Negative

- Slightly higher learning curve than document databases
- More structured schema management

---

# Implementation Notes

Database migrations will be managed using Prisma Migrate.

All primary keys will use UUIDs.

Foreign key constraints will maintain referential integrity.

Passwords will be stored only as bcrypt hashes.

---

# References

- PostgreSQL Documentation
- Prisma Documentation
- IEEE 830 Software Requirements Specification

---

# Approval

Status: Accepted

Implementation Phase: Milestone M3