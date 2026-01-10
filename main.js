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
})();

