import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }

});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

app.post("/submit-assessment", async (req, res) => {

  try {

    const {
      name,
      email,
      results
    } = req.body;

    const dimensionResults = Object.entries(results.dimensions)
      .map(([dimension, value]) => {

        return `
          <div
            style="
              border:1px solid #e2e8f0;
              border-radius:18px;
              padding:24px;
              margin-bottom:18px;
            "
          >

            <div
              style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:18px;
              "
            >

              <h2
                style="
                  margin:0;
                  font-size:22px;
                  color:#0f172a;
                "
              >
                ${dimension}
              </h2>

              <div
                style="
                  background:#dbeafe;
                  color:#2563eb;
                  padding:6px 14px;
                  border-radius:999px;
                  font-size:12px;
                  font-weight:600;
                "
              >
                ${value.band}
              </div>

            </div>

            <div
              style="
                font-size:36px;
                font-weight:700;
                color:#2563eb;
                margin-bottom:14px;
              "
            >
              ${value.score}/15
            </div>

            <p
              style="
                color:#475569;
                line-height:1.7;
                margin:0;
              "
            >
              ${value.feedback}
            </p>

          </div>
        `;
      })
      .join("");

      await transporter.sendMail({

  from: `"Leadership Assessment" <${process.env.EMAIL_USER}>`,

  to: email,

  subject: "Your Leadership Assessment Report",

  html: `
    <div
      style="
        background:#f1f5f9;
        padding:40px 20px;
        font-family:Arial,sans-serif;
        color:#0f172a;
      "
    >

      <div
        style="
          max-width:700px;
          margin:auto;
          background:white;
          border-radius:20px;
          padding:40px;
          border:1px solid #e2e8f0;
        "
      >

        <div
          style="
            text-align:center;
            margin-bottom:40px;
          "
        >

          <div
            style="
              display:inline-block;
              padding:6px 14px;
              background:#dbeafe;
              color:#2563eb;
              border-radius:999px;
              font-size:12px;
              font-weight:600;
              margin-bottom:18px;
            "
          >
            Leadership Assessment
          </div>

          <h1
            style="
              margin:0 0 14px;
              font-size:34px;
            "
          >
            Your Personalized Report
          </h1>

          <p
            style="
              color:#64748b;
              line-height:1.7;
              margin:0;
            "
          >
            Hi ${name}, thank you for completing the assessment.
            Here is your personalized leadership summary.
          </p>

        </div>

        ${dimensionResults}

        <div
          style="
            margin-top:40px;
            padding:24px;
            background:#eff6ff;
            border-radius:18px;
            border:1px solid #bfdbfe;
            text-align:center;
          "
        >

          <p
            style="
              margin:0 0 10px;
              color:#475569;
              font-size:14px;
            "
          >
            Overall Leadership Score
          </p>

          <div
            style="
              font-size:42px;
              font-weight:700;
              color:#2563eb;
            "
          >
            ${results.overallScore}/45
          </div>

        </div>

      </div>

    </div>
  `

});

    res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send email"
    });

  }

});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});