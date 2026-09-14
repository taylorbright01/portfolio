(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const theatre = document.getElementById("heroTheatre");
  const headBook = document.getElementById("headBook");
  const portraitTrigger = document.getElementById("portraitTrigger");
  const openWorkshop = document.getElementById("openWorkshop");
  const closeBook = document.getElementById("closeBook");
  const roomDetails = document.getElementById("roomDetails");
  const roomButtons = [...document.querySelectorAll("[data-room]")];
  const evidenceDialog = document.getElementById("evidenceDialog");
  const closeEvidence = document.getElementById("closeEvidence");
  const printEvidence = document.getElementById("printEvidence");
  const siteHeader = document.getElementById("siteHeader");

  const roomData = {
    engineering: {
      number: "01",
      label: "Engineering",
      title: "Reality gets the deciding vote.",
      summary:
        "Before I built funnels and revenue systems, I built and developed physical things. Vehicle dynamics taught me to observe carefully, isolate variables and respect the gap between an elegant idea and something that works under load.",
      metrics: [
        ["94%", "Podium success across supported competition vehicles"],
        ["4 years", "Engineering and operations experience"],
        ["Prototype", "Work touching nationally significant vehicle programmes"]
      ],
      notes: [
        [
          "Black Art Designs / Austin Motor Company",
          "Progressed from apprentice into broader engineering and operational responsibility, working across suspension development, vehicle dynamics and competition support."
        ],
        [
          "The commercial advantage",
          "Engineering made systems thinking instinctive. I look for constraints, failure modes and feedback loops before I reach for louder marketing."
        ]
      ],
      links: [
        ["Open the conventional CV", "taylor-bright-cv.pdf", true]
      ]
    },
    leadership: {
      number: "02",
      label: "Leadership",
      title: "Build clarity, then give people room to move.",
      summary:
        "I have led from the uncomfortable middle: owning the outcome while the process, team and resources are still being built. My style is direct, transparent and heavily grounded in shared measures rather than performative busyness.",
      metrics: [
        ["£100k", "Peak monthly revenue at Perfect Entry"],
        ["14,000", "Lifetime paying customers"],
        ["3 → 9", "Commercial team scaled at Global Prostate Solutions"]
      ],
      notes: [
        [
          "Founder-level ownership",
          "At Perfect Entry I owned acquisition, pricing, content, customer experience, retention, analytics and the decisions connecting them."
        ],
        [
          "Making performance visible",
          "At Global Prostate Solutions I introduced reporting across marketing, sales and distributor activity so the team could see what was working and act on it."
        ]
      ],
      links: [
        ["Visit Perfect Entry", "https://perfectentry.store", false],
        ["Download CV", "taylor-bright-cv.pdf", true]
      ]
    },
    experiment: {
      number: "03",
      label: "Experimentation",
      title: "The unusual idea still has to survive the test.",
      summary:
        "My default reaction to an uncertain problem is to build the smallest honest experiment that can disprove me. That applies equally to product offers, acquisition channels, AI-assisted market analysis and putting a tiny lever room inside a portfolio.",
      metrics: [
        ["65,000+", "Backtested trades examined in current research"],
        ["29", "Instruments handled by the analytics system"],
        ["No repainting", "Strict causal testing as a design rule"]
      ],
      notes: [
        [
          "CurrencyAI",
          "Built a pipeline that turns market observations into structured candidates, applies approval logic and sends accepted decisions onward through webhooks—with a permanent ledger for later auditing."
        ],
        [
          "Commercial experiments",
          "I test channels, offers and onboarding around evidence. At GPS that meant removing underperforming paid activity and rebuilding around stronger inbound and partner routes."
        ]
      ],
      links: [
        ["Live market data", "https://perfectentry.store/reversalsniperdata", false],
        ["Session screener", "https://perfectentry.store/whats-tradable-now", false]
      ]
    },
    communication: {
      number: "04",
      label: "Communication",
      title: "Make the complicated thing feel graspable.",
      summary:
        "Communication is not a layer added after the work. It is how a strategy becomes coordinated action and how technical information becomes useful to customers, colleagues and partners.",
      metrics: [
        ["16,300+", "YouTube subscribers built organically"],
        ["15,900+", "Community members"],
        ["Global", "Customers and partners across multiple markets"]
      ],
      notes: [
        [
          "Content that teaches",
          "Created educational material around markets and analytics, turning technical ideas into explanations people could use without stripping away the important caveats."
        ],
        [
          "Across a room or a market",
          "My experience ranges from customer communities and video to engineering partnerships, distributor relationships and supporting first sales in India."
        ]
      ],
      links: [
        ["YouTube channel", "https://www.youtube.com/@perfectentrytrading", false],
        ["Email Taylor", "mailto:Taylorbright0001@gmail.com", false]
      ]
    },
    data: {
      number: "05",
      label: "Data + AI",
      title: "Measure the system, not just the applause.",
      summary:
        "I use data to make better decisions, expose weak assumptions and design repeatable operations. The interesting part is rarely the dashboard itself; it is the chain from a noisy event to a decision someone can trust.",
      metrics: [
        ["£18k → £56k", "Monthly revenue growth in six months"],
        ["65,000+", "Backtested trades"],
        ["Real time", "Live screeners, dashboards and webhook workflows"]
      ],
      notes: [
        [
          "From signal to accountable decision",
          "CurrencyAI links TradingView, Supabase, approval logic, webhooks and a trade copier. Shadow collection and immutable records make it possible to learn from both accepted and rejected decisions."
        ],
        [
          "Commercial instrumentation",
          "I build KPI frameworks around the actual constraint—conversion, channel quality, distributor performance, retention or throughput—then remove activity that cannot justify itself."
        ]
      ],
      links: [
        ["Explore live data", "https://perfectentry.store/reversalsniperdata", false],
        ["See what is tradable now", "https://perfectentry.store/whats-tradable-now", false]
      ]
    },
    museum: {
      number: "06",
      label: "Art + History",
      title: "Curiosity is part of the operating model.",
      summary:
        "I love art, history and British heritage because they are full of systems, craft, argument and human stories. I am interested in how institutions turn those things into experiences people remember, talk about and return to.",
      metrics: [
        ["3+ sectors", "Fintech, medtech and engineering experience"],
        ["BSc", "Economics, University of Essex"],
        ["One public", "Every visitor, viewer or customer is a real person"]
      ],
      notes: [
        [
          "A broad lens",
          "Economics helps me see incentives and trade-offs; engineering keeps me concrete; building a public-facing brand keeps the audience in the room."
        ],
        [
          "Why the museum is here",
          "Commercial discipline and cultural ambition do not have to compete. Sustainable organisations earn the freedom to be brave, memorable and generous with their public."
        ]
      ],
      links: [
        ["Start a conversation", "mailto:Taylorbright0001@gmail.com", false],
        ["Download CV", "taylor-bright-cv.pdf", true]
      ]
    }
  };

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);

  const externalAttributes = (url, download) => {
    if (download) return " download";
    if (/^https?:/i.test(url)) return ' target="_blank" rel="noreferrer"';
    return "";
  };

  let workshopOpen = false;
  let bookTurnTimer = 0;
  let pointerFrame = 0;
  const BOOK_OPEN_MS = 2250;
  const BOOK_CLOSE_MS = 1950;
  let evidenceReturnFocus = null;

  function setWorkshop(open, options = {}) {
    const focusRoom = options.focusRoom || false;
    const restoreFocus = options.restoreFocus || false;
    const stateChanged = workshopOpen !== open;
    workshopOpen = open;
    theatre.dataset.state = open ? "open" : "closed";
    portraitTrigger.setAttribute("aria-expanded", String(open));
    headBook.setAttribute("aria-hidden", String(!open));

    roomButtons.forEach((button) => {
      button.tabIndex = open ? 0 : -1;
    });

    if (!open) {
      roomButtons.forEach((button) => {
        button.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
      });
    }

    if (!stateChanged) {
      if (open && focusRoom) roomButtons[0]?.focus({ preventScroll: true });
      return;
    }

    window.clearTimeout(bookTurnTimer);
    if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    theatre.style.setProperty("--mx", "0deg");
    theatre.style.setProperty("--my", "0deg");
    theatre.classList.remove("is-opening", "is-closing");

    const finishTurn = () => {
      if (workshopOpen !== open) return;
      theatre.classList.remove("is-turning", "is-opening", "is-closing");
      if (open && focusRoom) roomButtons[0]?.focus({ preventScroll: true });
      if (!open && restoreFocus) portraitTrigger.focus({ preventScroll: true });
    };

    if (reducedMotion.matches) {
      theatre.classList.toggle("is-open", open);
      finishTurn();
      return;
    }

    theatre.classList.add("is-turning", open ? "is-opening" : "is-closing");
    window.requestAnimationFrame(() => {
      theatre.classList.toggle("is-open", open);
    });
    bookTurnTimer = window.setTimeout(finishTurn, open ? BOOK_OPEN_MS : BOOK_CLOSE_MS);
  }

  function openTheWorkshop(event) {
    setWorkshop(true, { focusRoom: event?.detail === 0 });
  }

  portraitTrigger.addEventListener("click", openTheWorkshop);
  openWorkshop.addEventListener("click", () => {
    if (window.innerWidth < 901 && !reducedMotion.matches) {
      theatre.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(openTheWorkshop, 520);
      return;
    }
    openTheWorkshop();
  });

  closeBook.addEventListener("click", () => {
    setWorkshop(false, { restoreFocus: true });
  });

  function renderRoom(key, options = {}) {
    const data = roomData[key];
    if (!data) return;

    if (!workshopOpen) setWorkshop(true);

    roomButtons.forEach((button) => {
      const selected = button.dataset.room === key;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-expanded", String(selected));
    });

    const metrics = data.metrics.map(([value, label]) =>
      '<div class="detail-metric">' +
        "<strong>" + escapeHtml(value) + "</strong>" +
        "<span>" + escapeHtml(label) + "</span>" +
      "</div>"
    ).join("");

    const notes = data.notes.map(([title, body]) =>
      '<article class="detail-note">' +
        "<h4>" + escapeHtml(title) + "</h4>" +
        "<p>" + escapeHtml(body) + "</p>" +
      "</article>"
    ).join("");

    const links = data.links.map(([label, url, download]) =>
      '<a class="detail-link" href="' + escapeHtml(url) + '"' + externalAttributes(url, download) + ">" +
        escapeHtml(label) + ' <span aria-hidden="true">↗</span>' +
      "</a>"
    ).join("");

    roomDetails.classList.remove("empty");
    roomDetails.innerHTML =
      '<div class="detail-content">' +
        '<div class="detail-topline"><span>' + escapeHtml(data.number) + "</span>" + escapeHtml(data.label) + "</div>" +
        "<h3>" + escapeHtml(data.title) + "</h3>" +
        '<p class="detail-summary">' + escapeHtml(data.summary) + "</p>" +
        '<div class="detail-metrics">' + metrics + "</div>" +
        '<div class="detail-notes">' + notes + "</div>" +
        '<div class="detail-links">' + links + '<a class="detail-link" href="#top">Back to the rooms ↑</a></div>' +
      "</div>";

    const newHash = "#room-" + key;
    if (window.location.hash !== newHash) {
      history.replaceState(null, "", newHash);
    }

    if (options.scroll !== false) {
      window.setTimeout(() => roomDetails.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "center"
      }), 80);
    }
  }

  roomButtons.forEach((button) => {
    button.addEventListener("click", () => renderRoom(button.dataset.room));
  });

  function openEvidenceDialog(trigger) {
    evidenceReturnFocus = trigger || document.activeElement;

    if (typeof evidenceDialog.showModal === "function") {
      if (!evidenceDialog.open) evidenceDialog.showModal();
    } else {
      evidenceDialog.setAttribute("open", "");
    }
  }

  function closeEvidenceDialog() {
    if (typeof evidenceDialog.close === "function" && evidenceDialog.open) {
      evidenceDialog.close();
    } else {
      evidenceDialog.removeAttribute("open");
    }
    evidenceReturnFocus?.focus?.({ preventScroll: true });
  }

  document.querySelectorAll("[data-open-evidence]").forEach((button) => {
    button.addEventListener("click", () => openEvidenceDialog(button));
  });

  closeEvidence.addEventListener("click", closeEvidenceDialog);

  evidenceDialog.addEventListener("click", (event) => {
    if (event.target === evidenceDialog) closeEvidenceDialog();
  });

  printEvidence.addEventListener("click", () => window.print());

  const ideas = [
    "BUILD THEN MEASURE",
    "TRY THE OPPOSITE",
    "PUT A V8 IN IT",
    "MAKE IT STRANGER",
    "ASK THE DATA",
    "WHAT IF IT MOVED?"
  ];

  const ideaText = document.getElementById("ideaText");
  let ideaIndex = 0;
  let ideaTimer;

  function cycleIdea() {
    if (!ideaText || document.hidden) return;
    ideaIndex = (ideaIndex + 1) % ideas.length;
    ideaText.style.opacity = "0";
    window.setTimeout(() => {
      ideaText.textContent = ideas[ideaIndex];
      ideaText.style.opacity = "1";
    }, reducedMotion.matches ? 0 : 180);
  }

  function startIdeaTimer() {
    window.clearInterval(ideaTimer);
    if (!reducedMotion.matches) ideaTimer = window.setInterval(cycleIdea, 3600);
  }

  const nixies = [...document.querySelectorAll(".nixie")];
  const nixieLabel = document.getElementById("nixieLabel");
  const nixieMetrics = [
    ["014000", "paying customers"],
    ["100000", "£ peak month"],
    ["000094", "% podium success"],
    ["065000", "backtested trades"]
  ];
  let nixieIndex = 0;
  let nixieTimer;
  let scrambleTimer;

  function settleNixies(index, immediate = false) {
    const target = nixieMetrics[index][0];
    const label = nixieMetrics[index][1];
    window.clearInterval(scrambleTimer);

    if (immediate || reducedMotion.matches) {
      nixies.forEach((tube, position) => {
        tube.textContent = target[position];
        tube.classList.remove("flicker");
      });
      nixieLabel.textContent = label;
      return;
    }

    nixies.forEach((tube) => tube.classList.add("flicker"));
    scrambleTimer = window.setInterval(() => {
      nixies.forEach((tube) => {
        tube.textContent = String(Math.floor(Math.random() * 10));
      });
    }, 65);

    window.setTimeout(() => {
      window.clearInterval(scrambleTimer);
      nixies.forEach((tube, position) => {
        window.setTimeout(() => {
          tube.textContent = target[position];
          tube.classList.remove("flicker");
        }, position * 55);
      });
      nixieLabel.textContent = label;
    }, 620);
  }

  function advanceNixies() {
    if (document.hidden) return;
    nixieIndex = (nixieIndex + 1) % nixieMetrics.length;
    settleNixies(nixieIndex);
  }

  function startNixieTimer() {
    window.clearInterval(nixieTimer);
    settleNixies(nixieIndex, true);
    if (!reducedMotion.matches) nixieTimer = window.setInterval(advanceNixies, 4700);
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) settleNixies(nixieIndex, true);
  });

  function motionPreferenceChanged() {
    startIdeaTimer();
    startNixieTimer();
  }

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", motionPreferenceChanged);
  }

  startIdeaTimer();
  startNixieTimer();

  if (finePointer.matches && !reducedMotion.matches) {
    theatre.addEventListener("pointermove", (event) => {
      if (theatre.classList.contains("is-turning")) return;
      const box = theatre.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        theatre.style.setProperty("--mx", (x * 4.5) + "deg");
        theatre.style.setProperty("--my", (y * -3.5) + "deg");
        pointerFrame = 0;
      });
    });

    theatre.addEventListener("pointerleave", () => {
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      theatre.style.setProperty("--mx", "0deg");
      theatre.style.setProperty("--my", "0deg");
    });
  }

  const revealElements = [...document.querySelectorAll(".reveal")];

  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px" });

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = (Math.min(index % 4, 3) * 70) + "ms";
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => element.classList.add("in-view"));
  }

  const updateHeader = () => siteHeader.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const initialRoom = window.location.hash.match(/^#room-(engineering|leadership|experiment|communication|data|museum)$/)?.[1];
  if (initialRoom) {
    setWorkshop(true);
    renderRoom(initialRoom, { scroll: false });
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("evidence") === "1") {
    window.setTimeout(() => openEvidenceDialog(), 0);
  }
})();
