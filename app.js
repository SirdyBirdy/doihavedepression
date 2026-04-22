// ─────────────────────────────────────────
//  APP — doihavedepression.com
// ─────────────────────────────────────────

(function () {
  "use strict";

  // ── State ──────────────────────────────
  const answers = new Array(9).fill(null);
  let resultShown = false;

  // ── DOM refs ───────────────────────────
  const questionList      = document.getElementById("questionList");
  const progressFill      = document.getElementById("progressFill");
  const progressLabel     = document.getElementById("progressLabel");
  const submitBtn         = document.getElementById("submitBtn");
  const resultCard        = document.getElementById("resultCard");
  const resultZone        = document.getElementById("resultZone");
  const resultTitle       = document.getElementById("resultTitle");
  const resultScore       = document.getElementById("resultScore");
  const resultDesc        = document.getElementById("resultDesc");
  const resultGuidance    = document.getElementById("resultGuidance");
  const crisisSection     = document.getElementById("crisisSection");
  const crisisGrid        = document.getElementById("crisisGrid");
  const therapistSection  = document.getElementById("therapistSection");
  const therapistGrid     = document.getElementById("therapistGrid");
  const selfHelpSection   = document.getElementById("selfHelpSection");
  const selfHelpList      = document.getElementById("selfHelpList");
  const crisisAlways      = document.getElementById("crisisAlways");
  const footerYear        = document.getElementById("footerYear");
  const q9Warning         = document.getElementById("q9Warning");
  const toast             = document.getElementById("toast");
  const shareSection      = document.getElementById("shareSection");
  const shareTextBox      = document.getElementById("shareTextBox");

  // ── Init ───────────────────────────────
  function init() {
    footerYear.textContent = new Date().getFullYear();
    renderQuestions();
    bindEvents();
  }

  // ── Render questions ───────────────────
  function renderQuestions() {
    PHQ9.forEach((text, i) => {
      const block = document.createElement("div");
      block.className = "question-block";
      block.id = "qblock" + i;

      const num = document.createElement("div");
      num.className = "question-num";
      num.textContent = (i + 1) + " of 9";

      const q = document.createElement("div");
      q.className = "question-text";
      q.textContent = text;

      const opts = document.createElement("div");
      opts.className = "option-group";

      PHQ9_OPTIONS.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.dataset.value = opt.value;
        btn.dataset.q = i;
        btn.innerHTML = `<span class="opt-dot"></span><span class="opt-label">${opt.label}</span>`;
        btn.addEventListener("click", () => selectAnswer(i, opt.value, btn, opts));
        opts.appendChild(btn);
      });

      block.appendChild(num);
      block.appendChild(q);
      block.appendChild(opts);

      // Q9 crisis note
      if (i === 8) {
        const note = document.createElement("div");
        note.className = "q9-note";
        note.id = "q9Warning";
        note.innerHTML = `If you selected anything other than "Not at all" for this question, please know that support is available right now. The crisis contacts further down this page are open 24 hours a day.`;
        note.style.display = "none";
        block.appendChild(note);
      }

      questionList.appendChild(block);
    });
  }

  // ── Select an answer ───────────────────
  function selectAnswer(qIndex, value, clickedBtn, group) {
    answers[qIndex] = value;

    group.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
    clickedBtn.classList.add("selected");

    // Q9 check
    if (qIndex === 8 && value > 0) {
      const note = document.getElementById("q9Warning");
      if (note) note.style.display = "block";
    } else if (qIndex === 8 && value === 0) {
      const note = document.getElementById("q9Warning");
      if (note) note.style.display = "none";
    }

    updateProgress();
    if (resultShown) recalculate();
  }

  // ── Progress ───────────────────────────
  function updateProgress() {
    const answered = answers.filter(a => a !== null).length;
    const pct = Math.round((answered / 9) * 100);
    progressFill.style.width = pct + "%";
    progressLabel.textContent = answered + " of 9 answered";

    if (answered === 9) {
      submitBtn.removeAttribute("disabled");
      submitBtn.classList.add("ready");
    } else {
      submitBtn.setAttribute("disabled", "");
      submitBtn.classList.remove("ready");
    }
  }

  // ── Calculate score ────────────────────
  function getScore() {
    return answers.reduce((sum, a) => sum + (a || 0), 0);
  }

  function getResult(score) {
    return PHQ9_RESULTS.find(r => score >= r.min && score <= r.max) || PHQ9_RESULTS[PHQ9_RESULTS.length - 1];
  }

  // ── Run / recalculate ──────────────────
  function runResult(scroll) {
    resultShown = true;
    const score = getScore();
    const result = getResult(score);

    resultCard.className = "result-card " + result.zone;
    resultCard.classList.remove("hidden");
    resultTitle.textContent = result.title;
    resultScore.textContent = "PHQ-9 score: " + score + " / 27";
    resultDesc.textContent = result.desc;
    resultGuidance.textContent = result.guidance;

    // Crisis section
    if (result.showCrisis || answers[8] > 0) {
      crisisSection.classList.remove("hidden");
      if (crisisGrid.childElementCount === 0) renderCrisisLines();
    } else {
      crisisSection.classList.add("hidden");
    }

    // Therapist directories
    if (result.showResources) {
      therapistSection.classList.remove("hidden");
      if (therapistGrid.childElementCount === 0) renderTherapists();
      selfHelpSection.classList.remove("hidden");
      if (selfHelpList.childElementCount === 0) renderSelfHelp();
    } else {
      therapistSection.classList.add("hidden");
      selfHelpSection.classList.add("hidden");
    }

    // Share
    const shareMsg = buildShareText(score, result);
    shareTextBox.textContent = shareMsg;
    window._shareMsg = shareMsg;
    shareSection.classList.remove("hidden");

    if (scroll) {
      setTimeout(() => resultCard.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }

  function recalculate() {
    runResult(false);
  }

  // ── Render helpers ─────────────────────
  function renderCrisisLines() {
    CRISIS_LINES.forEach(line => {
      const card = document.createElement("div");
      card.className = "crisis-card";
      card.innerHTML = `
        <div class="crisis-name">${line.name}</div>
        ${line.number ? `<div class="crisis-number">${line.number}</div>` : ""}
        <div class="crisis-desc">${line.desc}</div>
        <a class="crisis-link" href="${line.url}" target="_blank" rel="noopener">visit website</a>`;
      crisisGrid.appendChild(card);
    });
  }

  function renderTherapists() {
    THERAPIST_DIRECTORIES.forEach(t => {
      const card = document.createElement("div");
      card.className = "therapist-card";
      card.innerHTML = `
        <div class="therapist-icon">${t.icon}</div>
        <div class="therapist-name">${t.name}</div>
        <div class="therapist-region">${t.region}</div>
        <div class="therapist-desc">${t.desc}</div>
        <a class="therapist-link" href="${t.url}" target="_blank" rel="noopener">visit website</a>`;
      therapistGrid.appendChild(card);
    });
  }

  function renderSelfHelp() {
    SELF_HELP_RESOURCES.forEach(r => {
      const item = document.createElement("div");
      item.className = "self-help-item";
      item.innerHTML = `
        <div class="sh-title"><a href="${r.url}" target="_blank" rel="noopener">${r.title}</a></div>
        <div class="sh-source">${r.source}</div>
        <div class="sh-desc">${r.desc}</div>`;
      selfHelpList.appendChild(item);
    });
  }

  // ── Share ──────────────────────────────
  function buildShareText(score, result) {
    return `I just completed the PHQ-9 depression screening on doihavedepression.com.\n\nScore: ${score}/27 — ${result.title}\n\nIf you have been feeling low, it takes two minutes. Check yours.\n\ndoihavedepression.com`;
  }

  function shareTwitter() {
    const text = encodeURIComponent(window._shareMsg || "doihavedepression.com");
    window.open("https://twitter.com/intent/tweet?text=" + text, "_blank");
  }

  function shareWhatsapp() {
    const text = encodeURIComponent(window._shareMsg || "doihavedepression.com");
    window.open("https://wa.me/?text=" + text, "_blank");
  }

  function copyText() {
    const txt = window._shareMsg || "doihavedepression.com";
    navigator.clipboard.writeText(txt).then(() => {
      showToast("Copied to clipboard.");
      const btn = document.getElementById("btnCopy");
      btn.textContent = "copied";
      setTimeout(() => btn.textContent = "copy text", 2000);
    }).catch(() => showToast("Could not copy. Try selecting it manually."));
  }

  // ── Toast ──────────────────────────────
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  // ── Bind ───────────────────────────────
  function bindEvents() {
    submitBtn.addEventListener("click", () => runResult(true));
    document.getElementById("btnTwitter").addEventListener("click", shareTwitter);
    document.getElementById("btnWhatsapp").addEventListener("click", shareWhatsapp);
    document.getElementById("btnCopy").addEventListener("click", copyText);
  }

  // ── Boot ───────────────────────────────
  document.addEventListener("DOMContentLoaded", init);

})();
