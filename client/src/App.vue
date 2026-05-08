<template>
  <div class="page">
    <div class="container">

      <!-- Header -->
      <header class="form-header">

        <div class="header-badge">
          Self-Assessment
        </div>

        <h1>
          Leadership Effectiveness Assessment
        </h1>

        <p class="header-sub">
          Rate each statement honestly to gain insight into your leadership
          strengths and growth areas.
        </p>

      </header>

      <!-- FORM -->
      <form
        v-if="!results"
        @submit.prevent="handleSubmit"
      >

        <!-- Error -->
        <div
          v-if="errorMessage"
          class="error-box"
        >
          {{ errorMessage }}
        </div>

        <!-- User Information -->
        <section class="info-section">

          <h2 class="section-title">
            Your Information
          </h2>

          <div class="fields-row">

            <div class="form-group">

              <label for="name-input">
                Full Name
              </label>

              <input
                id="name-input"
                type="text"
                v-model="name"
                placeholder="Jane Smith"
              />

            </div>

            <div class="form-group">

              <label for="email-input">
                Work Email
              </label>

              <input
                id="email-input"
                type="email"
                v-model="email"
                placeholder="jane@company.com"
              />

            </div>

          </div>

        </section>

        <!-- Scale -->
        <div class="scale-legend">

          <span class="legend-label">
            Rating Scale
          </span>

          <div class="legend-items">

            <span
              v-for="n in 5"
              :key="n"
              class="legend-item"
            >

              <span
                class="legend-dot"
                :class="'dot-' + n"
              >
                {{ n }}
              </span>

              <span class="legend-text">
                {{ scaleLabels[n] }}
              </span>

            </span>

          </div>

        </div>

        <!-- Questions -->
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="question-card"
          :class="{ answered: answers[index] !== undefined }"
        >

          <div class="question-meta">

            <span class="dimension-badge">
              {{ question.dimension }}
            </span>

            <span class="question-number">
              Q{{ index + 1 }}
            </span>

          </div>

          <p class="question-text">
            {{ question.text }}
          </p>

          <div class="options">

            <label
              v-for="n in 5"
              :key="n"
              class="option-label"
              :class="{ selected: answers[index] === n }"
            >

              <input
                type="radio"
                :name="'question-' + index"
                :value="n"
                v-model="answers[index]"
              />

              <span class="option-circle">
                {{ n }}
              </span>

              <span class="option-text">
                {{ scaleLabels[n] }}
              </span>

            </label>

          </div>

        </div>

        <!-- Submit -->
        <div class="submit-bar">

          <div class="submit-progress">

            <span class="progress-count">
              {{ answeredCount }} of {{ questions.length }} answered
            </span>

            <div class="progress-track">

              <div
                class="progress-fill"
                :style="{ width: progressPercent + '%' }"
              ></div>

            </div>

          </div>

          <button
            type="submit"
            class="submit-btn"
          >
            Submit Assessment
          </button>

        </div>

      </form>

      <!-- SUCCESS SCREEN -->
      <div
        v-if="results"
        class="success-screen"
      >

        <div class="success-card">

          <div class="success-icon">
            ✓
          </div>

          <h2>
            Assessment Submitted Successfully
          </h2>

          <p class="success-text">
            Thank you for completing the leadership assessment.
          </p>

          <p class="success-email">
            A detailed personalized report has been sent to:
          </p>

          <div class="success-email-box">
            {{ email }}
          </div>

          <div class="success-progress">

            <div class="progress-track">

              <div
                class="progress-fill"
                :style="{ width: (results.overallScore / 45) * 100 + '%' }"
              ></div>

            </div>

            <p class="success-score">
              Overall Score: {{ results.overallScore }}/45
            </p>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const name = ref("");
const email = ref("");

const answers = ref({});

const results = ref(null);

const errorMessage = ref("");

const questions = [
  {
    dimension: "Decision Making",
    text: "I make decisions confidently even under pressure."
  },
  {
    dimension: "Decision Making",
    text: "I evaluate multiple options before making important decisions."
  },
  {
    dimension: "Decision Making",
    text: "I take responsibility for the outcomes of my decisions."
  },
  {
    dimension: "Team Communication",
    text: "I communicate expectations clearly to team members."
  },
  {
    dimension: "Team Communication",
    text: "I actively listen to feedback from others."
  },
  {
    dimension: "Team Communication",
    text: "I address conflicts professionally and constructively."
  },
  {
    dimension: "Strategic Thinking",
    text: "I consider long-term impacts before taking action."
  },
  {
    dimension: "Strategic Thinking",
    text: "I prioritize tasks effectively to achieve goals."
  },
  {
    dimension: "Strategic Thinking",
    text: "I adapt strategies when circumstances change."
  }
];

const scaleLabels = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree"
};

const feedbackMessages = {

  "Decision Making": {
    Low:
      "You may benefit from developing greater confidence and structure when making important decisions.",

    Medium:
      "You show balanced decision-making skills but could improve consistency under pressure.",

    High:
      "You demonstrate strong confidence and accountability in decision-making situations."
  },

  "Team Communication": {
    Low:
      "Improving communication clarity and active listening may strengthen your collaboration skills.",

    Medium:
      "You communicate reasonably well but may benefit from more proactive collaboration habits.",

    High:
      "You demonstrate strong communication and collaboration skills within team environments."
  },

  "Strategic Thinking": {
    Low:
      "You may benefit from focusing more on long-term planning and prioritization.",

    Medium:
      "You show moderate strategic thinking skills with opportunities for stronger adaptability and planning.",

    High:
      "You demonstrate strong planning, prioritization, and long-term strategic thinking abilities."
  }

};

const getBand = (score) => {

  if (score <= 5) {
    return "Low";
  }

  if (score <= 10) {
    return "Medium";
  }

  return "High";
};

const calculateScores = () => {

  const dimensionScores = {
    "Decision Making": 0,
    "Team Communication": 0,
    "Strategic Thinking": 0
  };

  questions.forEach((question, index) => {

    const answer = Number(answers.value[index]);

    dimensionScores[question.dimension] += answer;

  });

  const finalResults = {};

  Object.keys(dimensionScores).forEach((dimension) => {

    const band = getBand(dimensionScores[dimension]);

    finalResults[dimension] = {
      score: dimensionScores[dimension],
      band: band,
      feedback: feedbackMessages[dimension][band]
    };

  });

  const overallScore =
    Object.values(dimensionScores)
      .reduce((total, score) => total + score, 0);

  return {
    dimensions: finalResults,
    overallScore
  };
};

const answeredCount = computed(() => {
  return Object.keys(answers.value).length;
});

const progressPercent = computed(() => {
  return (answeredCount.value / questions.length) * 100;
});

const handleSubmit = async () => {

if (!name.value || !email.value) {

  errorMessage.value =
    "Please enter your name and email address.";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  return;
}

if (Object.keys(answers.value).length !== questions.length) {

  errorMessage.value =
    "Please answer all assessment questions.";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  return;
}

  const calculatedResults = calculateScores();

  results.value = calculatedResults;

  try {

  const response = await fetch(
    "https://leadership-assessment-api.onrender.com/submit-assessment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: name.value,
        email: email.value,
        answers: answers.value,
        results: calculatedResults
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {

    errorMessage.value =
      data.message || "Something went wrong.";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return;
  }

  results.value = calculatedResults;

} catch (error) {

  console.error(error);

  errorMessage.value =
    "Unable to connect to the server.";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}
};
</script>