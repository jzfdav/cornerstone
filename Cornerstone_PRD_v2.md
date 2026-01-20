# Cornerstone – Family House Construction Tracker (PRD v2)

## 1. Product Overview
Cornerstone is a private, family-only Progressive Web App (PWA) designed to act as a single source of truth during house construction.

It helps family members stay aligned on:
- Layout plans
- Proposed changes
- Queries and clarifications
- Activities and milestones
- Decisions and approvals

A clear changelog ensures transparency and accountability.

---

## 2. Vision & Values
Cornerstone is inspired by Christian principles of:
- Stewardship
- Clarity
- Unity
- Order

Faith elements are **subtle and optional**, ensuring the app remains practical, respectful, and user-friendly for daily use.

---

## 3. App Naming
**App Name:** Cornerstone  
**Internal Project Codename:** Cornerstone

**Biblical Inspiration:**  
> "The stone the builders rejected has become the cornerstone." – Psalm 118:22

The name reflects strength, foundation, and long-term stability—aligning naturally with both construction and faith.

---

## 4. Target Users & Role-Permission Matrix

### App Users
| Role | Description |
|------|-------------|
| **Admin (Owner)** | Full access, decision ownership, all approvals |
| **Parents** | View plans, decisions, updates; propose changes |
| **Spouse** | Propose changes, participate in discussions |

### External Actors (Not App Users)
| Role | Description |
|------|-------------|
| **Architect** | Communicates directly with family; receives shared documents |
| **Builder** | Communicates directly with family; receives shared documents |

### Permission Matrix
*Detailed permissions to be defined per phase as features are implemented.*

| Feature | Admin | Parents | Spouse |
|---------|-------|---------|--------|
| All Features | ✅ Full | ✅ CRUD | ✅ CRUD |

> [!NOTE]
> All CRUD operations are **audited and traceable**. Every action is logged with user, timestamp, and change details.

---

## 5. Phase 1 Scope (MVP)

### Landing Page Design

```
┌─────────────────────────────────┐
│                                 │
│         [LOGO]                  │
│       Cornerstone               │
│                                 │  ← Top Half
│                                 │
├─────────────────────────────────┤
│                                 │
│   ┌─────────────────────────────┐   │
│   │ Project Code            │   │
│   └─────────────────────────────┘   │  ← Bottom Half
│   ┌─────────────────────────────┐   │
│   │ Access Code             │   │
│   └─────────────────────────────┘   │
│   ☐ Remember me                 │
│   [ Enter ]                     │
│                                 │
└─────────────────────────────────┘
```

### Authentication Flow

| Field | Behavior |
|-------|----------|
| **Project Code** | `PTH` (Purva Tivoli Hills) — stored on-device, auto-populated if valid |
| **Access Code** | User's spouse name — case-insensitive, normalized before validation |
| **Remember Me** | Extends session from 24h to 1 week |

**User Registry (Supabase):**
| Access Code | User | Spouse |
|-------------|------|--------|
| `Ansu` | Joseph | Ansu |
| `Tessy` | Mohan | Tessy |

**Error Messages:**
- Invalid project code: `<p class="error">Code not recognized</p>`
- Invalid access code: `<p class="error">Access code not recognized</p>`

**Post-Login:** Header shows "Purva Tivoli Hills" with logged-in user name.

### Design Specifications
| Element | Value |
|---------|-------|
| **Logo** | Minimal icon (no text in logo) |
| **Accent Color** | Blue |
| **Default Theme** | Dark mode |

### Phase 1 Goals
- Validate Supabase integration (Auth, Database)
- Test Google Drive integration for storage
- Establish app design language (mobile-first, dark mode)
- Set architectural patterns for future phases

---

## 6. Core Features (Phase 2+)

### Layout Plan Management
- Upload plans (PDF / images) to Google Drive
- Versioning with approval status
- One clearly marked "Latest Approved" plan

### Proposed Changes & Suggestions
- Change requests linked to plan versions
- Discussion threads
- Approval / rejection tracking (Admin only)

### Queries & Clarifications
- Categorized queries (design, structural, electrical, etc.)
- Resolution tracking

### Changelog
- Auto-generated history of all significant updates
- Filterable by date, user, or category

### Activities & Milestones
- Planned construction activities
- Status tracking (Planned / In Progress / Completed)

### Vendor Directory
- Material and service vendors
- Contact details and notes
- No paid maps or APIs

### Contacts
- Important phone numbers for quick access
- Shared between family members
- Categories: Architect, Builder, Suppliers, Utilities, Emergency
- Click-to-call functionality

### Photo Gallery *(Deferred)*
- Construction progress photos
- To be implemented last due to complexity

---

## 7. Financial Accounting & Payments (Phase 3)
This module will be introduced after Phase 2 to maintain stability.

### Planned Features
- Manual expense and payment logging
- Cost categorization (materials, labor, fees, unplanned)
- Bill and receipt attachments (stored in Google Drive)
- Running totals and summaries
- Visibility into hidden or unexpected expenses

**Out of Scope**
- No online payments
- No bank integrations

---

## 8. UI & UX Guidelines
- **Mobile-first design** – optimized for phone usage on-site
- Dark mode enabled by default
- Light mode available via settings
- Clean, calm, and distraction-free UI
- User-friendly section names only
- Optional Bible verse displayed in footer (toggleable)

---

## 9. Technical Architecture

### Frontend
- React + TypeScript
- Vite
- Progressive Web App (installable, but **requires internet**)
- TanStack Query for data fetching (1-minute cache)

### Backend
- Supabase (PostgreSQL, Auth, Storage)
- Email-based authentication
- Free-tier services only

### Storage & Backup
- **Google Drive** (shared family folder) for:
  - Plan documents (PDFs, images)
  - Bill attachments
  - Data exports/backups

### Data Strategy
| Concern | Approach |
|---------|----------|
| Connectivity | Online required; internet check before confirming edits |
| Caching | TanStack Query with 1-minute stale time |
| Conflict Resolution | N/A – always connected, no offline edits |
| Backup | Export to Google Drive |

---

## 10. Notifications

### In-App Notifications
- All users receive in-app notifications for relevant updates
- No push notifications or SMS

### Email Notifications (Admin Only)
- Workflow errors
- System warnings
- Critical alerts

### Sharing
- External sharing via **Share button** (generates shareable link/document)
- No automatic email notifications to other users

---

## 11. Security & Privacy
- Invite-only access (project code + password)
- No public URLs or sharing
- No analytics or tracking
- Data owned and controlled by the family
- All actions audited with full traceability

---

## 12. Success Criteria
- One clear source of truth for plans and decisions
- Reduced miscommunication and rework
- Transparent change history
- Improved cost awareness over time

---

## Version History & Audit Log

| Concern | Approach |
|---------|----------|
| Document Versions | All documents stored; linked via audit log for traceability |
| Rejected Changes | Visible in changelog with "Rejected" status |
| Plan History | Full history accessible through audit trail |

---

*Cornerstone is designed to be built slowly, thoughtfully, and firmly — like a house built on rock.*
