(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const brand = document.getElementById("siteBrand");
  if (!brand) return;

  const textEl = brand.querySelector(".brand-text");
  if (!textEl) return;

  const text = textEl.textContent;
  textEl.textContent = "";

  [...text].forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "char";
    span.style.setProperty("--i", i);
    span.textContent = ch === " " ? "\u00A0" : ch;
    textEl.appendChild(span);
  });

  const cv = document.getElementById("cvText"); // or "aboutText" if that's your HTML id
  if (cv) {
      cv.textContent = `Henrike Fechler
  Born 2004, Oelde, Germany
  Since 2023, studying at Kunstakademie Münster

  Group exhibitions

  2026 Malerei 26, Museum Abtei Liesborn, Kreis Warendorf
  2025 Stations, ESMOA, Los Angeles
  2025 Opened, Freeters, Bonn;

  Stipendien

  2026 Sommerstipendium zur Förderung junger Kunst, VR-Bank Westmünsterland
  
    }
  // New: mobile menu toggle
    const header = document.getElementById("siteHeader");
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("siteNav");

    if (!header || !toggle || !nav) return;

    const closeMenu = () => {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    const openMenu = () => {
      header.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    };

    toggle.addEventListener("click", () => {
      const isOpen = header.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    // Close when clicking a nav link (mobile UX)
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Optional: close if resizing to desktop
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 721px)").matches) closeMenu();
    });

})();

