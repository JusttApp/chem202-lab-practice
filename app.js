(function () {
  const { experiments, questions, flashcards, formulaQuestions } = window.CHEM202_DATA;
  const state = {
    exp: 1,
    mode: "practice",
    type: "all",
    shuffleSeed: 0,
    answers: loadAnswers(),
  };

  const els = {
    nav: document.getElementById("experimentNav"),
    title: document.getElementById("experimentTitle"),
    summary: document.getElementById("experimentSummary"),
    score: document.getElementById("scoreText"),
    percent: document.getElementById("percentText"),
    modePractice: document.getElementById("modePractice"),
    modeReview: document.getElementById("modeReview"),
    modeFlashcards: document.getElementById("modeFlashcards"),
    modeFormula: document.getElementById("modeFormula"),
    typeFilter: document.getElementById("typeFilter"),
    shuffleBtn: document.getElementById("shuffleBtn"),
    resetBtn: document.getElementById("resetBtn"),
    questionCount: document.getElementById("questionCount"),
    answeredCount: document.getElementById("answeredCount"),
    wrongCount: document.getElementById("wrongCount"),
    missedSummary: document.getElementById("missedSummary"),
    list: document.getElementById("questionList"),
  };

  function loadAnswers() {
    try {
      return JSON.parse(localStorage.getItem("chem202Answers") || "{}");
    } catch {
      return {};
    }
  }

  function saveAnswers() {
    localStorage.setItem("chem202Answers", JSON.stringify(state.answers));
  }

  function normalize(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[._\-\s]/g, "")
      .replace(/liter/g, "liters")
      .replace(/kilogram/g, "kg")
      .replace(/grams/g, "g")
      .replace(/gram/g, "g");
  }

  function render() {
    renderNav();
    renderHeader();
    renderQuestions();
  }

  function renderNav() {
    els.nav.innerHTML = experiments
      .map((exp) => {
        const count = questions.filter((q) => q.exp === exp.id).length;
        const active = exp.id === state.exp ? " active" : "";
        return `<button class="nav-btn${active}" type="button" data-exp="${exp.id}">
          <strong>${exp.shortTitle}</strong>
          <span>${count} questions - ${exp.summary}</span>
        </button>`;
      })
      .join("");
  }

  function renderHeader() {
    const exp = experiments.find((item) => item.id === state.exp);
    const scoreItems =
      state.mode === "formula"
        ? formulaQuestions.filter((q) => q.exp === state.exp)
        : questions.filter((q) => q.exp === state.exp);
    const answered = scoreItems.filter((q) => state.answers[q.id]);
    const correct = answered.filter((q) => state.answers[q.id].correct).length;
    const percent = answered.length ? Math.round((correct / answered.length) * 100) : 0;

    els.title.textContent = exp.title;
    els.summary.textContent = exp.summary;
    els.score.textContent = `${correct} / ${answered.length} correct`;
    els.percent.textContent = `${percent}%`;
    els.modePractice.classList.toggle("active", state.mode === "practice");
    els.modeReview.classList.toggle("active", state.mode === "review");
    els.modeFlashcards.classList.toggle("active", state.mode === "flashcards");
    els.modeFormula.classList.toggle("active", state.mode === "formula");
  }

  function visibleQuestions() {
    let items = questions.filter((q) => q.exp === state.exp);
    if (state.type !== "all") {
      items = items.filter((q) => q.type === state.type);
    }
    if (state.mode === "review") {
      items = items.filter((q) => state.answers[q.id] && !state.answers[q.id].correct);
    }
    if (state.shuffleSeed) {
      items = [...items].sort((a, b) => seededSort(a.id, b.id, state.shuffleSeed));
    }
    return items;
  }

  function seededSort(a, b, seed) {
    return hash(`${a}-${seed}`) - hash(`${b}-${seed}`);
  }

  function hash(text) {
    let value = 0;
    for (let i = 0; i < text.length; i += 1) {
      value = (value << 5) - value + text.charCodeAt(i);
      value |= 0;
    }
    return Math.abs(value);
  }

  function renderQuestions() {
    if (state.mode === "flashcards") {
      renderFlashcards();
      return;
    }
    if (state.mode === "formula") {
      renderFormulaPractice();
      return;
    }

    const allForExp = questions.filter((q) => q.exp === state.exp);
    const shown = visibleQuestions();
    const answered = allForExp.filter((q) => state.answers[q.id]);
    const wrong = answered.filter((q) => !state.answers[q.id].correct);

    els.questionCount.textContent = shown.length;
    els.answeredCount.textContent = answered.length;
    els.wrongCount.textContent = wrong.length;
    renderMissedSummary();

    if (!shown.length) {
      els.list.innerHTML =
        state.mode === "review"
          ? `<div class="empty">No wrong answers for this filter yet.</div>`
          : `<div class="empty">No questions match this filter.</div>`;
      return;
    }

    els.list.innerHTML = shown.map(renderCard).join("");
  }

  function renderFlashcards() {
    const cards = flashcards.filter((card) => card.exp === state.exp);
    els.questionCount.textContent = cards.length;
    els.answeredCount.textContent = "Review";
    els.wrongCount.textContent = "-";
    renderMissedSummary();
    els.list.innerHTML = cards.map(renderFlashcard).join("");
  }

  function renderFormulaPractice() {
    const items = formulaQuestions.filter((item) => item.exp === state.exp);
    const answered = items.filter((item) => state.answers[item.id]);
    const wrong = answered.filter((item) => !state.answers[item.id].correct);

    els.questionCount.textContent = items.length;
    els.answeredCount.textContent = answered.length;
    els.wrongCount.textContent = wrong.length;
    renderMissedSummary();

    if (!items.length) {
      els.list.innerHTML = `<div class="empty">No formula drills are available for this experiment.</div>`;
      return;
    }

    els.list.innerHTML = items.map(renderFormulaCard).join("");
  }

  function renderFormulaCard(item) {
    const answer = state.answers[item.id];
    const statusClass = answer ? (answer.correct ? " correct" : " wrong") : "";
    const feedbackClass = answer ? (answer.correct ? " correct" : " wrong") : "";
    return `<article class="question-card${statusClass}" data-formula-id="${item.id}">
      <div class="question-head">
        <div>
          <p class="question-meta">${item.id.toUpperCase()} - FORMULA</p>
          <h3>${escapeHtml(item.prompt)}</h3>
        </div>
        <span class="badge">${answer ? (answer.correct ? "Correct" : "Review") : "Open"}</span>
      </div>
      <p class="formula-line">${escapeHtml(item.concept)}</p>
      <div class="formula-entry">
        <input class="fill-input" data-formula-input value="${escapeAttribute(answer?.value ?? "")}" placeholder="Type the numeric answer only" inputmode="decimal" />
        <button class="check-btn" type="button" data-action="formula">Check</button>
      </div>
      <div class="action-row">
        <span></span>
        <span class="source-note">Source: PDF summary, Experiment ${item.exp}.</span>
      </div>
      <div class="feedback${answer ? ` show ${feedbackClass}` : ""}">
        ${answer ? renderFormulaFeedback(item, answer) : ""}
      </div>
    </article>`;
  }

  function renderFormulaFeedback(item, answer) {
    const label = answer.correct ? "Correct." : "Wrong.";
    const correction = answer.correct
      ? ""
      : `<p><strong>Correct answer:</strong> ${formatFormulaAnswer(item)}</p>`;
    return `<p><strong>${label}</strong></p>${correction}<p>${escapeHtml(item.work)}</p><p>${escapeHtml(item.explanation)}</p>`;
  }

  function renderFlashcard(card, index) {
    const id = `f${card.exp}-${index}`;
    const shown = Boolean(state.answers[id]?.shown);
    return `<article class="question-card flashcard" data-flash-id="${id}">
      <div class="question-head">
        <div>
          <p class="question-meta">FLASHCARD ${index + 1}</p>
          <h3>${escapeHtml(card.front)}</h3>
        </div>
        <span class="badge">${shown ? "Open" : "Hidden"}</span>
      </div>
      <p class="flashcard-prompt">${shown ? "Review the answer below." : "Try to answer it before revealing."}</p>
      <div class="flashcard-back${shown ? " show" : ""}">
        <p class="flashcard-answer">${escapeHtml(card.back)}</p>
        <p>${escapeHtml(card.note)}</p>
      </div>
      <div class="action-row">
        <button class="check-btn" type="button" data-action="flash">${shown ? "Hide answer" : "Reveal answer"}</button>
        <span class="source-note">Source: PDF summary, Experiment ${card.exp}.</span>
      </div>
    </article>`;
  }

  function renderCard(q) {
    const answer = state.answers[q.id];
    const statusClass = answer ? (answer.correct ? " correct" : " wrong") : "";
    const feedbackClass = answer ? (answer.correct ? " correct" : " wrong") : "";
    const typeName = {
      mcq: "MCQ",
      tf: "True / False",
      fill: "Fill blank",
      matching: "Matching",
      order: "Ordering",
      multi: "Multi-select",
    }[q.type];

    return `<article class="question-card${statusClass}" data-qid="${q.id}">
      <div class="question-head">
        <div>
          <p class="question-meta">${q.id.toUpperCase()} - ${typeName}</p>
          <h3>${escapeHtml(q.prompt)}</h3>
        </div>
        <span class="badge">${answer ? (answer.correct ? "Correct" : "Review") : "Open"}</span>
      </div>
      ${renderAnswerArea(q, answer)}
      <div class="action-row">
        ${needsCheckButton(q.type) ? `<button class="check-btn" type="button" data-action="check">Check answer</button>` : `<span></span>`}
        <span class="source-note">${q.source}</span>
      </div>
      <div class="feedback${answer ? ` show ${feedbackClass}` : ""}">
        ${answer ? renderFeedback(q, answer) : ""}
      </div>
    </article>`;
  }

  function renderMissedSummary() {
    const missed = missedItemsForExperiment();
    if (!missed.length) {
      els.missedSummary.innerHTML = `<div class="missed-panel">
        <h3>Missed concepts</h3>
        <p>No missed concepts for this experiment yet. Wrong answers will appear here grouped by concept.</p>
      </div>`;
      return;
    }

    const counts = missed.reduce((acc, item) => {
      const concept = item.concept || conceptForQuestion(item);
      acc[concept] = (acc[concept] || 0) + 1;
      return acc;
    }, {});
    const chips = Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([concept, count]) => `<span class="concept-chip">${escapeHtml(concept)} (${count})</span>`)
      .join("");

    els.missedSummary.innerHTML = `<div class="missed-panel">
      <h3>Missed concepts</h3>
      <p>Focus review on these concepts before moving to the next experiment.</p>
      <div class="concept-list">${chips}</div>
    </div>`;
  }

  function missedItemsForExperiment() {
    const bank = [...questions, ...formulaQuestions].filter((item) => item.exp === state.exp);
    return bank.filter((item) => state.answers[item.id] && !state.answers[item.id].correct);
  }

  function conceptForQuestion(q) {
    const text = `${q.prompt || ""} ${q.explanation || ""}`.toLowerCase();
    if (text.includes("acid") || text.includes("base") || text.includes("neutralization")) return "neutralization and ions";
    if (text.includes("delta h") || text.includes("enthalpy")) return "Delta H = -q";
    if (text.includes("delta t") || text.includes("t2 - t1")) return "Delta T direction";
    if (text.includes("cp") || text.includes("heat") || text.includes("q =")) return "heat equation";
    if (text.includes("molality") || text.includes("kg of solvent")) return "molality";
    if (text.includes("molarity") || text.includes("v_l") || text.includes("liter")) return "molarity";
    if (text.includes("solubility") || text.includes("dissolution")) return "solubility";
    if (text.includes("salt order") || text.includes("organic salts") || text.includes("inorganic")) return "salt heat order";
    if (text.includes("conduct") || text.includes("ion")) return "conductivity and ions";
    if (text.includes("5%") || text.includes("nacl")) return "5% NaCl";
    if (text.includes("kf") || text.includes("benzene") || text.includes("naphthalene")) return "Kf and freezing point";
    if (text.includes("formula")) return "chemical formulas";
    return "source definition";
  }

  function renderAnswerArea(q, answer) {
    if (q.type === "mcq") return renderOptions(q, answer, false);
    if (q.type === "tf") {
      return renderOptions(
        { ...q, options: ["True", "False"], answer: q.answer ? "True" : "False" },
        answer,
        false,
      );
    }
    if (q.type === "multi") return renderOptions(q, answer, true);
    if (q.type === "fill") {
      const value = answer?.value || "";
      return `<div class="answers">
        <input class="fill-input" data-fill-input value="${escapeAttribute(value)}" placeholder="Type your answer" />
      </div>`;
    }
    if (q.type === "matching") {
      const selected = answer?.value || {};
      const options = shuffle([...new Set(q.pairs.map((pair) => pair.right))], q.id);
      return `<div class="answers">
        ${q.pairs
          .map(
            (pair, index) => `<label class="match-row">
              <span>${escapeHtml(pair.left)}</span>
              <select data-match-index="${index}">
                <option value="">Choose match</option>
                ${options
                  .map(
                    (option) =>
                      `<option value="${escapeAttribute(option)}"${selected[index] === option ? " selected" : ""}>${escapeHtml(option)}</option>`,
                  )
                  .join("")}
              </select>
            </label>`,
          )
          .join("")}
      </div>`;
    }
    if (q.type === "order") {
      const selected = answer?.value || {};
      const shuffled = shuffle(q.items, q.id);
      return `<div class="answers">
        ${shuffled
          .map(
            (item) => `<label class="order-row">
              <span>${escapeHtml(item)}</span>
              <select data-order-item="${escapeAttribute(item)}">
                <option value="">Rank</option>
                ${q.items
                  .map(
                    (_, index) =>
                      `<option value="${index + 1}"${Number(selected[item]) === index + 1 ? " selected" : ""}>${index + 1}</option>`,
                  )
                  .join("")}
              </select>
            </label>`,
          )
          .join("")}
      </div>`;
    }
    return "";
  }

  function renderOptions(q, answer, allowMultiple) {
    const selected = allowMultiple ? answer?.value || [] : [answer?.value].filter(Boolean);
    const displayOptions = shuffle(q.options, `${q.id}-options`);
    return `<div class="answers">
      ${displayOptions
        .map((option) => {
          const isSelected = selected.includes(option);
          const wasAnswered = Boolean(answer);
          const correctAnswers = allowMultiple ? q.answers : [q.answer];
          const isCorrect = correctAnswers.includes(option);
          const wrongSelected = wasAnswered && isSelected && !isCorrect;
          const className = [
            allowMultiple ? "multi-option" : "option-btn",
            isSelected ? "selected" : "",
            wasAnswered && isCorrect ? "correct-answer" : "",
            wrongSelected ? "wrong-answer" : "",
          ]
            .filter(Boolean)
            .join(" ");

          if (allowMultiple) {
            return `<label class="${className}">
              <input type="checkbox" data-option="${escapeAttribute(option)}"${isSelected ? " checked" : ""} />
              <span>${escapeHtml(option)}</span>
            </label>`;
          }
          return `<button class="${className}" type="button" data-option="${escapeAttribute(option)}">${escapeHtml(option)}</button>`;
        })
        .join("")}
    </div>`;
  }

  function renderFeedback(q, answer) {
    const label = answer.correct ? "Correct." : "Wrong.";
    const correct = correctAnswerText(q);
    const correction = answer.correct ? "" : `<p><strong>Correct answer:</strong> ${escapeHtml(correct)}</p>`;
    return `<p><strong>${label}</strong></p>${correction}<p>${escapeHtml(q.explanation)}</p>`;
  }

  function correctAnswerText(q) {
    if (q.type === "mcq") return q.answer;
    if (q.type === "tf") return q.answer ? "True" : "False";
    if (q.type === "fill") return q.displayAnswer;
    if (q.type === "multi") return q.answers.join(", ");
    if (q.type === "matching") return q.pairs.map((pair) => `${pair.left} -> ${pair.right}`).join("; ");
    if (q.type === "order") return q.items.join(" -> ");
    return "";
  }

  function formatFormulaAnswer(item) {
    return `${item.answer}${item.unit ? ` ${item.unit}` : ""}`;
  }

  function needsCheckButton(type) {
    return ["fill", "matching", "order", "multi"].includes(type);
  }

  function recordAnswer(q, value) {
    const correct = evaluate(q, value);
    state.answers[q.id] = { value, correct };
    saveAnswers();
    render();
  }

  function recordFormulaAnswer(item, rawValue) {
    const numeric = parseNumber(rawValue);
    const correct = Number.isFinite(numeric) && Math.abs(numeric - item.answer) <= item.tolerance;
    state.answers[item.id] = { value: rawValue, correct };
    saveAnswers();
    render();
  }

  function parseNumber(value) {
    return Number.parseFloat(String(value || "").replace(",", ".").replace(/[^\d.+-]/g, ""));
  }

  function evaluate(q, value) {
    if (q.type === "mcq") return value === q.answer;
    if (q.type === "tf") return value === (q.answer ? "True" : "False");
    if (q.type === "fill") return q.answers.some((answer) => normalize(answer) === normalize(value));
    if (q.type === "multi") {
      const expected = [...q.answers].sort();
      const actual = [...value].sort();
      return expected.length === actual.length && expected.every((item, index) => item === actual[index]);
    }
    if (q.type === "matching") {
      return q.pairs.every((pair, index) => value[index] === pair.right);
    }
    if (q.type === "order") {
      return q.items.every((item, index) => Number(value[item]) === index + 1);
    }
    return false;
  }

  function collectCardValue(card, q) {
    if (q.type === "fill") {
      return card.querySelector("[data-fill-input]").value;
    }
    if (q.type === "multi") {
      return [...card.querySelectorAll("[data-option]:checked")].map((input) => input.dataset.option);
    }
    if (q.type === "matching") {
      const value = {};
      card.querySelectorAll("[data-match-index]").forEach((select) => {
        value[select.dataset.matchIndex] = select.value;
      });
      return value;
    }
    if (q.type === "order") {
      const value = {};
      card.querySelectorAll("[data-order-item]").forEach((select) => {
        value[select.dataset.orderItem] = Number(select.value);
      });
      return value;
    }
    return "";
  }

  function shuffle(items, seedText) {
    return [...items].sort((a, b) => seededSort(String(a), String(b), hash(seedText)));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  els.nav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-exp]");
    if (!button) return;
    state.exp = Number(button.dataset.exp);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  els.modePractice.addEventListener("click", () => {
    state.mode = "practice";
    render();
  });

  els.modeReview.addEventListener("click", () => {
    state.mode = "review";
    render();
  });

  els.modeFlashcards.addEventListener("click", () => {
    state.mode = "flashcards";
    render();
  });

  els.modeFormula.addEventListener("click", () => {
    state.mode = "formula";
    render();
  });

  els.typeFilter.addEventListener("change", () => {
    state.type = els.typeFilter.value;
    renderQuestions();
  });

  els.shuffleBtn.addEventListener("click", () => {
    state.shuffleSeed = Date.now();
    renderQuestions();
  });

  els.resetBtn.addEventListener("click", () => {
    const ids = [
      ...questions.filter((q) => q.exp === state.exp).map((q) => q.id),
      ...formulaQuestions.filter((q) => q.exp === state.exp).map((q) => q.id),
      ...flashcards.filter((q) => q.exp === state.exp).map((_, index) => `f${state.exp}-${index}`),
    ];
    ids.forEach((id) => delete state.answers[id]);
    saveAnswers();
    render();
  });

  els.list.addEventListener("click", (event) => {
    const card = event.target.closest("[data-qid]");
    const flashcard = event.target.closest("[data-flash-id]");
    const flashButton = event.target.closest("[data-action='flash']");
    if (flashcard && flashButton) {
      const id = flashcard.dataset.flashId;
      state.answers[id] = { shown: !state.answers[id]?.shown };
      renderQuestions();
      return;
    }
    const formulaCard = event.target.closest("[data-formula-id]");
    const formulaButton = event.target.closest("[data-action='formula']");
    if (formulaCard && formulaButton) {
      const item = formulaQuestions.find((formula) => formula.id === formulaCard.dataset.formulaId);
      recordFormulaAnswer(item, formulaCard.querySelector("[data-formula-input]").value);
      return;
    }
    if (!card) return;
    const q = questions.find((item) => item.id === card.dataset.qid);
    const optionButton = event.target.closest("button[data-option]");
    if (optionButton && (q.type === "mcq" || q.type === "tf")) {
      recordAnswer(q, optionButton.dataset.option);
      return;
    }
    const checkButton = event.target.closest("[data-action='check']");
    if (checkButton) {
      recordAnswer(q, collectCardValue(card, q));
    }
  });

  render();
})();
