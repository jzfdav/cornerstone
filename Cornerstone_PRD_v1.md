# Cornerstone – Family House Construction Tracker (PRD)

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
> “The stone the builders rejected has become the cornerstone.” – Psalm 118:22

The name reflects strength, foundation, and long-term stability—aligning naturally with both construction and faith.

---

## 4. Target Users
- **Owner / Coordinator** – Full access and decision ownership
- **Parents** – View plans, decisions, and updates
- **Spouse** – Propose changes and participate in discussions
- **Architect** – Respond to queries and review changes
- **Builder** – Read-only access to approved plans and activities

---

## 5. Core Features (Phase 1)

### Layout Plan Management
- Upload plans (PDF / images)
- Versioning with approval status
- One clearly marked “Latest Approved” plan

### Proposed Changes & Suggestions
- Change requests linked to plan versions
- Discussion threads
- Approval / rejection tracking

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

---

## 6. Financial Accounting & Payments (Phase 2)
This module will be introduced after Phase 1 to maintain stability.

### Planned Features
- Manual expense and payment logging
- Cost categorization (materials, labor, fees, unplanned)
- Bill and receipt attachments
- Running totals and summaries
- Visibility into hidden or unexpected expenses

**Out of Scope**
- No online payments
- No bank integrations

---

## 7. UI & UX Guidelines
- Dark mode enabled by default
- Light mode available via settings
- Clean, calm, and distraction-free UI
- User-friendly section names only
- Optional Bible verse displayed in footer (toggleable)

---

## 8. Technical Architecture

### Frontend
- React + TypeScript
- Vite
- Progressive Web App (offline support)

### Backend
- Supabase (PostgreSQL, Auth, Storage)
- Email-based authentication
- Free-tier services only

The architecture prioritizes long-term stability, minimal maintenance, and easy extensibility.

---

## 9. Security & Privacy
- Invite-only access
- No public URLs or sharing
- No analytics or tracking
- Data owned and controlled by the family

---

## 10. Success Criteria
- One clear source of truth for plans and decisions
- Reduced miscommunication and rework
- Transparent change history
- Improved cost awareness over time

---

*Cornerstone is designed to be built slowly, thoughtfully, and firmly — like a house built on rock.*
