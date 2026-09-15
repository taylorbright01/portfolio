(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hero = document.querySelector(".hero");
  const identityCard = document.getElementById("identityCard");
  const deckStack = document.getElementById("deckStack");
  const scrollCue = document.getElementById("scrollCue");
  const field = document.getElementById("field");
  const pileBacks = document.getElementById("pileBacks");
  const fieldCards = [...document.querySelectorAll(".field-card[data-card]")];
  const caseFile = document.getElementById("caseFile");
  const casePanel = document.getElementById("casePanel");
  const caseNumber = document.getElementById("caseNumber");
  const hand = document.getElementById("hand");
  const handFan = document.getElementById("handFan");
  const handCount = document.getElementById("handCount");
  const srStatus = document.getElementById("srStatus");
  const siteHeader = document.getElementById("siteHeader");
  const evidenceDialog = document.getElementById("evidenceDialog");
  const closeEvidence = document.getElementById("closeEvidence");
  const printEvidence = document.getElementById("printEvidence");

  const caseData = {
    engineering: {
      number: "01",
      label: "Engineering",
      title: "Reality gets the deciding vote.",
      summary: "Before I built funnels and revenue systems, I built and developed physical things. Vehicle dynamics taught me to observe carefully, isolate variables and respect the distance between an elegant idea and something that actually works under load.",
      metrics: [
        ["94%", "Podium success across supported competition vehicles"],
        ["4 years", "Engineering and operational experience"],
        ["Prototype", "Work touching nationally significant vehicle programmes"]
      ],
      notes: [
        ["Black Art Designs / Austin Motor Company", "Progressed from apprentice into broader engineering and operational responsibility across suspension development, vehicle dynamics and competition support."],
        ["Why it still matters", "Engineering made systems thinking instinctive. I look for constraints, failure modes and feedback loops before reaching for louder marketing or more activity."]
      ],
      links: [["Open conventional CV", "taylor-bright-cv.pdf", true]]
    },
    leadership: {
      number: "02",
      label: "Commercial Leadership",
      title: "Make ambition operational.",
      summary: "I have led from the uncomfortable middle: owning the outcome while the process, team and resources are still being built. My approach is direct, transparent and grounded in shared measures rather than performative busyness.",
      metrics: [
        ["£18k → £56k", "Monthly revenue growth in six months"],
        ["3 → 9", "Commercial team expansion"],
        ["India", "First sales opened in a new international market"]
      ],
      notes: [
        ["Turning activity into a system", "At Global Prostate Solutions I introduced reporting across marketing, sales and distributor activity, removed weak paid acquisition and helped build a team that could see what was working."],
        ["Founder-level ownership", "At Perfect Entry I owned acquisition, pricing, content, customer experience, retention, analytics and the decisions connecting them—without an outside team to absorb the consequences."]
      ],
      links: [["Download CV", "taylor-bright-cv.pdf", true], ["Email Taylor", "mailto:Taylorbright0001@gmail.com", false]]
    },
    experimentation: {
      number: "03",
      label: "Experimentation",
      title: "Test the strange idea until it earns the right to stay.",
      summary: "Competitive card play and building companies reward the same honest habit: understand the field, choose a line, watch what actually happens and rebuild without becoming emotionally attached to the first version.",
      metrics: [
        ["Regionals", "Competitive Yu-Gi-Oh experience"],
        ["£0", "Outside funding used to build Perfect Entry"],
        ["£100k", "Peak monthly revenue after repeated market testing"]
      ],
      notes: [
        ["Why the deck is here", "Yu-Gi-Oh is not decorative borrowed nostalgia. I played at regional level and still play regularly. Deck construction, sequencing and adapting to a changing meta are genuine parts of how I learned to think."],
        ["The commercial version", "Perfect Entry was built through repeated tests of pricing, onboarding, products, acquisition and retention against a real paying audience. CurrencyAI applies the same discipline to models and decision rules."]
      ],
      links: [["Visit Perfect Entry", "https://perfectentry.store", false], ["Download CV", "taylor-bright-cv.pdf", true]]
    },
    communication: {
      number: "04",
      label: "Communication",
      title: "Make the complicated thing feel graspable.",
      summary: "Communication is not a layer added after the work. It is how strategy becomes coordinated action and how technical information becomes useful enough for customers, colleagues and partners to trust.",
      metrics: [
        ["16,300+", "YouTube subscribers built organically"],
        ["15,900+", "Community members"],
        ["14,000", "Lifetime paying customers"]
      ],
      notes: [
        ["Content that teaches", "I built an acquisition engine by turning technical market ideas into explanations people could use, without stripping away every caveat or treating the audience as a conversion statistic."],
        ["Across a room or a market", "My experience ranges from video, customer communities and support to engineering partnerships, distributor relationships and helping secure initial sales in India."]
      ],
      links: [["YouTube channel", "https://www.youtube.com/@perfectentrytrading", false], ["Email Taylor", "mailto:Taylorbright0001@gmail.com", false]]
    },
    data: {
      number: "05",
      label: "Data + AI",
      title: "Measure the system, not just the applause.",
      summary: "I use data to expose weak assumptions and build repeatable decisions. The interesting part is rarely the dashboard itself; it is the chain from a noisy event to an action someone can trust and later audit.",
      metrics: [
        ["65,000+", "Strict causal backtested trades examined"],
        ["29", "Markets handled by the analytics system"],
        ["Immutable", "Decision and outcome records for later auditing"]
      ],
      notes: [
        ["CurrencyAI", "Built a pipeline linking TradingView, Supabase, approval logic, shadow collection, webhooks and trade execution. Both accepted and rejected decisions remain available for counterfactual analysis."],
        ["Commercial instrumentation", "I build KPI frameworks around the actual constraint—conversion, channel quality, distributor performance, retention or throughput—then remove work that cannot justify itself."]
      ],
      links: [["Live market data", "https://perfectentry.store/reversalsniperdata", false], ["Session screener", "https://perfectentry.store/whats-tradable-now", false]]
    },
    heritage: {
      number: "06",
      label: "Art, History + Place",
      title: "Understand what makes people care.",
      summary: "I love art, history and British heritage because they contain systems, craft, argument and human stories. I am interested in how institutions turn those things into experiences people remember, discuss and return to.",
      metrics: [
        ["3+ sectors", "Fintech, medtech and engineering experience"],
        ["BSc", "Economics at the University of Essex"],
        ["One public", "Every visitor, viewer and customer is a real person"]
      ],
      notes: [
        ["A deliberately broad lens", "Economics helps me see incentives and trade-offs; engineering keeps me concrete; building a public-facing brand keeps the audience present in every decision."],
        ["Commercial discipline enables ambition", "Cultural organisations do not have to choose between a memorable public mission and sustainable operation. Strong systems earn them the freedom to be braver and more generous."]
      ],
      links: [["Start a conversation", "mailto:Taylorbright0001@gmail.com", false], ["Download CV", "taylor-bright-cv.pdf", true]]
    }
  };

  const collected = [];
  const drawing = new Set();
  let activeCard = null;
  let deckDealt = false;
  let evidenceReturnFocus = null;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);

  function createDeck() {
    const count = 42;
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < count; index += 1) {
      const card = document.createElement("span");
      const side = index % 2 === 0 ? 1 : -1;
      const fallOrder = count - 1 - index;
      const drift = side * (150 + ((index * 61) % 390));
      const spin = side * (230 + ((index * 43) % 430));
      const duration = 1750 + ((index % 6) * 95);

      card.className = "stack-card";
      card.style.setProperty("--sx", ((index % 4) * 0.7) + "px");
      card.style.setProperty("--sy", ((index % 7) * 0.72) + "px");
      card.style.setProperty("--sz", (-index * 1.35) + "px");
      card.style.setProperty("--drift", drift + "px");
      card.style.setProperty("--drift-catch", (drift * 0.06) + "px");
      card.style.setProperty("--drift-mid", (drift * 0.34) + "px");
      card.style.setProperty("--drift-late", (drift * 0.76) + "px");
      card.style.setProperty("--spin", spin + "deg");
      card.style.setProperty("--spin-catch", (side * (2 + (index % 4))) + "deg");
      card.style.setProperty("--spin-mid", (spin * 0.22) + "deg");
      card.style.setProperty("--spin-late", (spin * 0.67) + "deg");
      card.style.setProperty("--delay", (fallOrder * 48) + "ms");
      card.style.setProperty("--duration", duration + "ms");
      card.style.zIndex = String(60 - index);
      fragment.appendChild(card);
    }

    deckStack.appendChild(fragment);
  }

  function createPileBacks() {
    const fragment = document.createDocumentFragment();
    const count = window.innerWidth < 600 ? 25 : 42;

    for (let index = 0; index < count; index += 1) {
      const card = document.createElement("span");
      card.className = "filler-card";
      card.style.setProperty("--x", (1 + ((index * 47) % 90)) + "%");
      card.style.setProperty("--y", (2 + ((index * 31) % 80)) + "%");
      card.style.setProperty("--r", (((index * 37) % 74) - 37) + "deg");
      card.style.setProperty("--z", String(2 + (index % 9)));
      card.style.setProperty("--opacity", String(0.58 + ((index % 5) * 0.07)));
      fragment.appendChild(card);
    }

    pileBacks.appendChild(fragment);
  }

  function handTarget() {
    const compact = window.innerWidth <= 820;
    const width = compact ? 88 : 118;
    const height = width * (86 / 59);
    const rect = hand.getBoundingClientRect();
    return {
      left: rect.left + (rect.width / 2) - (width / 2),
      top: window.innerHeight - height + (compact ? 42 : 34),
      width,
      height
    };
  }

  function flyToHand(source, rotation = 0) {
    const visual = source.querySelector(".portfolio-card");
    if (!visual || reducedMotion.matches || typeof visual.animate !== "function") return Promise.resolve();

    const start = visual.getBoundingClientRect();
    const target = handTarget();
    const flight = document.createElement("div");
    const clone = visual.cloneNode(true);

    clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    clone.querySelectorAll("img").forEach((image) => image.removeAttribute("loading"));
    flight.className = "card-flight";
    flight.style.left = start.left + "px";
    flight.style.top = start.top + "px";
    flight.style.width = start.width + "px";
    flight.style.height = start.height + "px";
    flight.appendChild(clone);
    document.body.appendChild(flight);

    const deltaX = target.left - start.left;
    const deltaY = target.top - start.top;
    const scale = target.width / start.width;
    const animation = flight.animate([
      { transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)", opacity: 1, offset: 0 },
      { transform: `translate3d(${deltaX * 0.42}px, ${deltaY * 0.2 - 90}px, 0) scale(${1 - ((1 - scale) * 0.35)}) rotate(${rotation * 0.35}deg)`, opacity: 1, offset: 0.46 },
      { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale}) rotate(${rotation}deg)`, opacity: 0.92, offset: 1 }
    ], {
      duration: 1050,
      easing: "cubic-bezier(.2,.78,.18,1)",
      fill: "forwards"
    });

    return animation.finished.catch(() => undefined).then(() => flight.remove());
  }

  function sourceFor(key) {
    return key === "identity" ? identityCard : document.querySelector(`.field-card[data-card="${key}"]`);
  }

  function collectCard(key) {
    if (collected.includes(key)) {
      setActiveHandCard(key);
      return;
    }

    const source = sourceFor(key);
    const visual = source?.querySelector(".portfolio-card");
    if (!visual) return;

    collected.push(key);
    const button = document.createElement("button");
    const clone = visual.cloneNode(true);
    clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    clone.querySelectorAll("img").forEach((image) => image.removeAttribute("loading"));

    button.type = "button";
    button.className = "hand-card";
    button.dataset.card = key;
    button.setAttribute("aria-label", key === "identity" ? "Open Taylor Bright's CV" : `Open the ${caseData[key].label} case file`);
    button.appendChild(clone);
    button.addEventListener("click", () => {
      if (key === "identity") {
        window.open("taylor-bright-cv.pdf", "_blank", "noopener");
        return;
      }
      renderCase(key, { scroll: true });
    });

    handFan.appendChild(button);
    hand.classList.add("has-cards");
    handCount.textContent = collected.length + " / 7";
    layoutHand();
    setActiveHandCard(key);
  }

  function layoutHand() {
    const cards = [...handFan.querySelectorAll(".hand-card")];
    const compact = window.innerWidth <= 820;
    const maximumSpread = compact ? 31 : 42;
    const available = compact ? Math.max(150, window.innerWidth - 130) : Math.max(210, hand.clientWidth - 145);
    const spread = cards.length > 1 ? Math.min(maximumSpread, available / (cards.length - 1)) : 0;

    cards.forEach((card, index) => {
      const relative = index - ((cards.length - 1) / 2);
      card.style.setProperty("--fan-x", (relative * spread) + "px");
      card.style.setProperty("--fan-r", (relative * (compact ? 3.3 : 4.2)) + "deg");
      card.style.setProperty("--fan-y", (Math.abs(relative) * (compact ? 3 : 5)) + "px");
      card.style.setProperty("--fan-z", String(index + 1));
    });
  }

  function setActiveHandCard(key) {
    activeCard = key === "identity" ? activeCard : key;
    handFan.querySelectorAll(".hand-card").forEach((card) => {
      card.classList.toggle("active", card.dataset.card === activeCard);
    });
  }

  function dealDeck() {
    if (deckDealt) {
      window.open("taylor-bright-cv.pdf", "_blank", "noopener");
      return;
    }

    deckDealt = true;
    hero.classList.add("is-dealt");
    hand.classList.add("has-cards");
    srStatus.textContent = "Taylor's card drawn. The remaining deck is cascading onto the table.";

    const flight = flyToHand(identityCard, -8);
    identityCard.classList.add("is-drawn");
    window.setTimeout(() => {
      deckStack.querySelectorAll(".stack-card").forEach((card) => card.classList.add("cascade"));
    }, reducedMotion.matches ? 0 : 520);

    flight.then(() => collectCard("identity"));

    const revealDelay = reducedMotion.matches ? 0 : 5000;
    window.setTimeout(() => {
      scrollCue.classList.add("is-visible");
      deckStack.setAttribute("hidden", "");
    }, revealDelay);
  }

  function externalAttributes(url, download) {
    if (download) return " download";
    if (/^https?:/i.test(url)) return ' target="_blank" rel="noreferrer"';
    return "";
  }

  function renderCase(key, options = {}) {
    const data = caseData[key];
    if (!data) return;

    const metrics = data.metrics.map(([value, label]) =>
      '<div class="case-metric"><strong>' + escapeHtml(value) + '</strong><span>' + escapeHtml(label) + "</span></div>"
    ).join("");

    const notes = data.notes.map(([title, body]) =>
      '<article class="case-note"><h3>' + escapeHtml(title) + "</h3><p>" + escapeHtml(body) + "</p></article>"
    ).join("");

    const links = data.links.map(([label, url, download]) =>
      '<a class="case-link" href="' + escapeHtml(url) + '"' + externalAttributes(url, download) + ">" + escapeHtml(label) + ' <span aria-hidden="true">↗</span></a>'
    ).join("");

    caseNumber.textContent = data.number;
    casePanel.classList.remove("empty");
    casePanel.innerHTML =
      '<div class="case-content">' +
        '<div class="case-topline"><span>' + escapeHtml(data.number) + "</span>" + escapeHtml(data.label) + "</div>" +
        '<h2 id="caseTitle">' + escapeHtml(data.title) + "</h2>" +
        '<p class="case-lede">' + escapeHtml(data.summary) + "</p>" +
        '<div class="case-metrics">' + metrics + "</div>" +
        '<div class="case-notes">' + notes + "</div>" +
        '<div class="case-links">' + links + '<a class="case-link" href="#field">Return to the table ↑</a></div>' +
      "</div>";

    setActiveHandCard(key);
    const hash = "#card-" + key;
    if (window.location.hash !== hash) history.replaceState(null, "", hash);

    if (options.scroll !== false) {
      window.setTimeout(() => caseFile.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      }), reducedMotion.matches ? 0 : 180);
    }
  }

  function drawFieldCard(button) {
    const key = button.dataset.card;
    if (!caseData[key] || drawing.has(key)) return;

    if (collected.includes(key)) {
      renderCase(key, { scroll: true });
      return;
    }

    drawing.add(key);
    hand.classList.add("has-cards");
    button.setAttribute("aria-busy", "true");
    const rotation = ((collected.length % 5) - 2) * 3;

    flyToHand(button, rotation).then(() => {
      button.classList.add("is-drawn");
      button.removeAttribute("aria-busy");
      collectCard(key);
      renderCase(key, { scroll: true });
      drawing.delete(key);
      srStatus.textContent = caseData[key].label + " added to your hand. Its case file is open below the table.";
    });
  }

  function openEvidenceDialog(trigger) {
    evidenceReturnFocus = trigger || document.activeElement;
    if (typeof evidenceDialog.showModal === "function") evidenceDialog.showModal();
    else evidenceDialog.setAttribute("open", "");
  }

  function closeEvidenceDialog() {
    if (typeof evidenceDialog.close === "function" && evidenceDialog.open) evidenceDialog.close();
    else evidenceDialog.removeAttribute("open");
    evidenceReturnFocus?.focus?.({ preventScroll: true });
  }

  createDeck();
  createPileBacks();

  identityCard.addEventListener("click", dealDeck);
  fieldCards.forEach((button) => button.addEventListener("click", () => drawFieldCard(button)));
  scrollCue.addEventListener("click", () => field.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" }));

  document.querySelectorAll("[data-open-evidence]").forEach((button) => {
    button.addEventListener("click", () => openEvidenceDialog(button));
  });
  closeEvidence.addEventListener("click", closeEvidenceDialog);
  evidenceDialog.addEventListener("click", (event) => {
    if (event.target === evidenceDialog) closeEvidenceDialog();
  });
  printEvidence.addEventListener("click", () => window.print());

  const updateHeader = () => siteHeader.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  let resizeFrame = 0;
  window.addEventListener("resize", () => {
    if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      layoutHand();
      resizeFrame = 0;
    });
  }, { passive: true });

  const initialCard = window.location.hash.match(/^#card-(engineering|leadership|experimentation|communication|data|heritage)$/)?.[1];
  if (initialCard) {
    const source = sourceFor(initialCard);
    source?.classList.add("is-drawn");
    collectCard(initialCard);
    renderCase(initialCard, { scroll: false });
  }
})();
