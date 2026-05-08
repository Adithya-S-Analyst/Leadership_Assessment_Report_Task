# Leadership Effectiveness Assessment

A full-stack leadership self-assessment web application built using Vue.js, Express.js, and Resend.

The application allows users to complete a 9-question leadership assessment, receive immediate submission confirmation, and get a personalized leadership report delivered by email.

## Email Delivery Note

The deployed application currently uses Resend's testing sender domain (`onboarding@resend.dev`).

Due to Resend sandbox restrictions, unrestricted public email delivery requires verifying a custom sender domain.

The full email workflow, backend integration, and HTML report generation are fully functional and were successfully tested using verified recipient addresses during development.

---

# Features

- 9-question leadership assessment
- 3 leadership dimensions:
  - Decision Making
  - Team Communication
  - Strategic Thinking
- 1–5 Likert scale scoring
- Client-side score calculation
- Low / Medium / High performance bands
- Personalized feedback generation
- Backend API integration
- HTML email report delivery
- Responsive and mobile-friendly UI
- Validation and error handling
- Secure API key handling using environment variables

---

# Tech Stack

## Frontend
- Vue.js
- Vite

## Backend
- Node.js
- Express.js

## Email Service
- Resend

## Deployment
- Frontend: Vercel
- Backend: Render

---

# Project Structure

```bash
leadership-assessment/
│
├── client/   # Vue frontend
│
└── server/   # Express backend
