# CasaMed Full Stack Assignment

This project is a full-stack healthcare application built as part of the CasaMed assignment. It includes:

- WhatsApp Reminder Engine
- AI Exercise Coach
- Therapist Dashboard


## Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Firebase Auth / JWT  
- **Messaging:** WhatsApp Cloud API (Meta)  
- **Deployment:** Render  

---

## Features Overview

---

## Pillar A — WhatsApp Reminder Engine

### Implemented Features

- Create session bookings via API
- Automated reminder scheduling using cron jobs (Java microservice)
- WhatsApp message triggering system
- 24-hour and 1-hour reminders
- Dynamic message content:
  - Therapist name
  - Session date & time
  - Confirm & Reschedule links
- Functional confirm/reschedule endpoints
- Message logging support (sent/pending)

---

### Limitation

- WhatsApp custom templates require **Meta approval**
- Newly created templates were **not approved within the assignment timeline**

### Workaround

- Successfully tested using **pre-approved/test templates**
- Verified end-to-end message delivery
- Backend logic and flow are fully implemented

> Note: This limitation is due to external platform dependency (Meta), not implementation gaps.

---

##  Pillar B — AI Exercise Coach

### Implemented Features

- Chat-based interface for patient interaction
- Generates **3–5 personalized exercise recommendations**
- Handles follow-up queries dynamically
- Context-aware responses
- Session-based chat persistence
- Scrollable chat history


---

## Pillar C — Therapist Dashboard

### Implemented Features

#### Session Management
- View all upcoming sessions
- Displays:
  - Patient name
  - Contact
  - Session type
  - Reminder status

#### Pain Score Tracking
- Patients can submit:
  - Pain score (0–10)
  - Notes
- Therapists can:
  - View logs per patient
  - Track progress over time

#### Authentication
- Secure login system (Firebase Auth / JWT)



##  Deployment

The application is deployed on **Render** for ease of access and evaluation.


## Demo Credentials
email-geeta@test.com
password-123456

## Environment Setup

Create a `.env` file in the root directory and add:

PORT=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=

