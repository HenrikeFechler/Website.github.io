// gallery.js
(function () {
  console.log("[gallery] gallery.js loaded");

  const images = [
    { src: "figures/pic_1.jpg", alt: "Artwork 1", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_2.jpg", alt: "Artwork 2", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_3.jpg", alt: "Artwork 3", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_4.jpg", alt: "Artwork 4", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_5.jpg", alt: "Artwork 5", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_6.jpg", alt: "Artwork 6", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_7.jpg", alt: "Artwork 7", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_8.jpg", alt: "Artwork 8", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_9.jpg", alt: "Artwork 9", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_10.jpg", alt: "Artwork 10", caption: "Oil on canvas • 2026" },
    { src: "figures/pic_11.jpg", alt: "Artwork 11", caption: "Oil on canvas • 2026" },
    { src: "figures/IMG_2847.jpeg", alt: "Artwork 12", caption "The open window, oil on canvas, 140 x 120cm, 2026"}
  
  ];

  const grid = document.getElementById("galleryGrid");
  if (!grid) {
    console.warn("[gallery] #galleryGrid not found");
    return;
  }

  // Render gallery
  for (let i = 0; i < images.length; i++) {
    const item = images[i];

    const figure = document.createElement("figure");
    figure.className = "gallery-item fade-on-scroll";
    figure.dataset.index = String(i);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "";
    img.loading = "lazy";

    figure.appendChild(img);
    grid.appendChild(figure);
  }

  // -------------------- Lightbox --------------------
  const lb = document.getElementById("galleryLightbox");
  const lbImg = document.getElementById("galleryLightboxImg");
  const lbCaption = document.getElementById("galleryLightboxCaption");
  const lbClose = lb ? lb.querySelector(".lightbox-close") : null;

  if (!lb || !lbImg) {
    console.warn("[gallery] lightbox elements missing:", { lb, lbImg });
    // Still continue with fade logic
  }

  let currentIndex = -1;

  function openLightbox(index) {
    if (!lb || !lbImg) return;

    const item = images[index];
    if (!item) return;

    currentIndex = index;

    lbImg.src = item.src;
    lbImg.alt = item.alt || "";
    if (lbCaption) lbCaption.textContent = item.caption || item.alt || "";

    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lb) return;

    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // optional: stop loading when closed
    if (lbImg) lbImg.src = "";
  }

  // Click any gallery item -> open
  grid.addEventListener("click", (e) => {
    const figure = e.target.closest(".gallery-item");
    if (!figure) return;

    const index = Number(figure.dataset.index);
    if (!Number.isFinite(index)) return;

    console.log("[gallery] open lightbox index:", index);
    openLightbox(index);
  });

  // Close button
  if (lbClose) {
    lbClose.addEventListener("click", closeLightbox);
  }

  // Click backdrop to close
  if (lb) {
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });
  }

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (!lb || !lb.classList.contains("is-open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") openLightbox((currentIndex + 1) % images.length);
    if (e.key === "ArrowLeft") openLightbox((currentIndex - 1 + images.length) % images.length);
  });

  // -------------------- Fade in/out on scroll --------------------
  const els = document.querySelectorAll(".fade-on-scroll");

  // Fallback if IntersectionObserver is not available
  if (!("IntersectionObserver" in window)) {
    console.warn("[gallery] IntersectionObserver not supported; showing all images");
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  els.forEach((el) => observer.observe(el));
})();
