# Leadership Effectiveness Assessment

A full-stack leadership self-assessment web application built using **Vue.js**, **Express.js**, and **Resend**.

The app allows users to complete a 9‑question leadership assessment, receive immediate submission confirmation, and get a personalized leadership report delivered by email.

---

## Email Delivery Note
The deployed application currently uses Resend's testing sender domain (`onboarding@resend.dev`).  
Due to Resend sandbox restrictions, unrestricted public email delivery requires verifying a custom sender domain.

The full email workflow, backend integration, and HTML report generation are functional and tested with verified recipient addresses.

---

## Features
- 9‑question leadership assessment
- 3 leadership dimensions:
  - Decision Making
  - Team Communication
  - Strategic Thinking
- 1–5 Likert scale scoring
- Client‑side score calculation
- Low / Medium / High performance bands
- Personalized feedback generation
- Backend API integration
- HTML email report delivery
- Responsive and mobile‑friendly UI
- Validation and error handling
- Secure API key handling with environment variables

---

## Tech Stack
**Frontend**
- Vue.js
- Vite

**Backend**
- Node.js
- Express.js

**Email Service**
- Resend

**Deployment**
- Frontend: Vercel  
- Backend: Render

---

## Scoring Logic
The assessment contains 3 leadership dimensions:

- Decision Making

- Team Communication

- Strategic Thinking

- Each dimension has 3 questions rated on a 1–5 Likert scale.

- Scoring bands:

  - Low: 0–5

  - Medium: 6–10

  - High: 11–15

- The frontend calculates:

- Dimension scores

- Overall score

- Performance bands

---

## Email Service Choice
Resend was chosen for its simple API and beginner‑friendly setup for transactional email delivery.
Currently, the app uses Resend’s testing sender domain.
Production email delivery requires verifying a custom sender domain.

---

## Validation & Error Handling
The application handles:

  - Incomplete form submissions

  - Unanswered questions

  - Invalid email input

  - Failed email requests

  - Validation messages are shown clearly to the user.

## AI Assistance
AI tools were used for:

  - UI refinement

  - Debugging assistance

  - Deployment troubleshooting

  - Improving code structure and UX decisions

  - All final implementation decisions were reviewed and understood before submission.

---

## Future Improvements
- Production email delivery with a verified domain

- PDF report generation

- Database integration

- Accessibility improvements

- Automated testing

---

## Project Structure
```bash
leadership-assessment/
│
├── client/   # Vue frontend
│
└── server/   # Express backend



