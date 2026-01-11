// gallery.js
(function () {
  // 1) Maintain a manifest of your images.
  //    This is the reliable static-site way (GitHub Pages can’t list folders automatically).
  const images = [
    // Replace/add files that exist in /figures
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

    // If you have more:
    // { src: "figures/painting-01.jpg", alt: "Painting 01" },
    // { src: "figures/painting-02.jpg", alt: "Painting 02" },
    // { src: "figures/painting-03.jpg", alt: "Painting 03" },
  ];

  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  // 2) Render the gallery items
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

  // 3) Scroll-triggered fade in/out
  const els = document.querySelectorAll(".fade-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          // remove when leaving viewport → fades out
          entry.target.classList.remove("is-visible");
        }
      }
    },
    {
      threshold: 0.18,
      // This makes it feel smoother: start fade-in slightly before fully in view,
      // and fade-out after it leaves most of the viewport.
      rootMargin: "0px 0px -10% 0px",
    }
  );

  // -------------------- Gallery Lightbox --------------------
  const lb = document.getElementById("galleryLightbox");
  const lbImg = document.getElementById("galleryLightboxImg");
  const lbCaption = document.getElementById("galleryLightboxCaption");
  const lbClose = lb ? lb.querySelector(".lightbox-close") : null;

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

    // Prevent background scroll (optional but recommended)
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lb) return;

    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");

    // Release background scroll
    document.body.style.overflow = "";

    // Optional: stop loading big image when closed
    if (lbImg) lbImg.src = "";
  }

  if (grid) {
    grid.addEventListener("click", (e) => {
      const figure = e.target.closest(".gallery-item");
      if (!figure) return;

      const index = Number(figure.dataset.index);
      if (!Number.isFinite(index)) return;

      openLightbox(index);
    });
  }

  if (lbClose) {
    lbClose.addEventListener("click", closeLightbox);
  }

  // Close when clicking the dark backdrop (but not when clicking the image/caption)
  if (lb) {
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });
  }

  // Keyboard: ESC closes, arrows navigate (optional but useful)
  document.addEventListener("keydown", (e) => {
    if (!lb || !lb.classList.contains("is-open")) return;

    if (e.key === "Escape") closeLightbox();

    if (e.key === "ArrowRight") {
      openLightbox((currentIndex + 1) % images.length);
    }

    if (e.key === "ArrowLeft") {
      openLightbox((currentIndex - 1 + images.length) % images.length);
    }
  });


  els.forEach((el) => observer.observe(el));
})();

