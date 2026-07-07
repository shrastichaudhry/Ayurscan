# Administrator Manual

# AyurScan

### Enterprise AI-Powered Medicinal Plant Intelligence Platform

---

# Document Information

| Field | Details |
|--------|---------|
| Document | Administrator Manual |
| Version | 1.0 |
| Author | Shrasti |
| Date | July 2026 |

---

# 1. Introduction

This manual provides operational guidance for administrators responsible for managing the AyurScan platform.

It covers administrator authentication, user management, medicinal plant management, monitoring, maintenance, backup procedures, and security responsibilities.

---

# 2. Administrator Responsibilities

The administrator is responsible for:

- Managing user accounts
- Managing medicinal plant records
- Monitoring system health
- Reviewing prediction activity
- Maintaining database integrity
- Performing backups
- Monitoring application logs
- Ensuring platform security

---

# 3. Administrator Login

### Steps

1. Open the Login page.
2. Enter administrator email.
3. Enter administrator password.
4. Click **Login**.

Only users with the **ADMIN** role can access the administrator dashboard.

---

# 4. Administrator Dashboard

The dashboard provides access to:

- User Management
- Plant Management
- Scan History
- Prediction Statistics
- System Health
- Settings
- Logout

---

# 5. User Management

Administrators can:

- View all registered users
- Search users
- View user profiles
- Update user roles
- Deactivate user accounts (future enhancement)

User information includes:

- Name
- Email
- Role
- Registration Date

---

# 6. Medicinal Plant Management

Administrators can:

- Add new medicinal plants
- Update plant information
- Delete plant records
- Upload plant reference images
- Update dosage information
- Update medicinal benefits
- Update side effects
- Update contraindications

---

# 7. Prediction Monitoring

Administrators can monitor:

- Total predictions
- Daily predictions
- Most recognized plants
- Failed predictions
- Average confidence score (future enhancement)

This information helps evaluate application performance.

---

# 8. Database Management

Database responsibilities include:

- Monitoring database status
- Applying migrations
- Verifying data integrity
- Maintaining relationships
- Reviewing storage usage

Database Technology:

- PostgreSQL

ORM:

- Prisma

---

# 9. Backup and Recovery

## Backup Strategy

- Daily Incremental Backup
- Weekly Full Backup
- Monthly Archive

## Recovery Procedure

1. Stop application services.
2. Restore PostgreSQL database.
3. Verify restored data.
4. Restart application.
5. Validate application functionality.

---

# 10. Security Responsibilities

Administrators should ensure:

- Strong passwords are enforced.
- JWT authentication is functioning correctly.
- Unauthorized users cannot access protected endpoints.
- Environment variables remain confidential.
- Database credentials are not exposed.
- Regular security reviews are performed.

---

# 11. Log Monitoring

The following logs should be monitored:

- Backend logs
- AI Service logs
- Database logs
- Docker container logs

Logs assist in identifying errors and diagnosing issues.

---

# 12. System Maintenance

Regular maintenance tasks include:

- Updating dependencies
- Applying database migrations
- Reviewing application logs
- Verifying backups
- Monitoring container health
- Updating AI model versions when required

---

# 13. Troubleshooting

| Problem | Possible Cause | Solution |
|----------|----------------|----------|
| User cannot login | Invalid credentials | Verify account and reset password if necessary |
| Prediction failed | AI service unavailable | Restart AI service and review logs |
| Database connection failed | PostgreSQL unavailable | Verify database container and connection settings |
| Slow API response | High server load | Review logs and optimize database queries |
| Container not running | Docker service issue | Restart Docker and affected containers |

---

# 14. Administrator Best Practices

- Use strong administrator passwords.
- Regularly review user activity.
- Verify database backups.
- Keep Docker images updated.
- Monitor application logs daily.
- Restrict administrator access to authorized personnel.
- Test recovery procedures periodically.

---

# 15. Future Administrative Features

Future versions may include:

- Role-Based Access Control (RBAC)
- Audit Logs
- Dashboard Analytics
- Email Notifications
- AI Model Version Management
- Automated Backup Scheduling
- System Usage Reports

---

# 16. Version Information

| Version | Description |
|----------|-------------|
| 1.0 | Initial Release |

---

# 17. Support

Administrators should refer to the following project documentation when performing maintenance or troubleshooting:

- Software Requirements Specification (SRS)
- System Architecture
- Database Design
- API Design
- AI Model Documentation
- Deployment Guide
- Testing Strategy

---

# 18. Conclusion

This manual serves as the operational guide for administrators managing the AyurScan platform. Following the documented procedures will help maintain system stability, security, and reliability while supporting future platform growth.