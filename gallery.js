// gallery.js
(function () {
  // 1) Maintain a manifest of your images.
  //    This is the reliable static-site way (GitHub Pages can’t list folders automatically).
  const images = [
    // Replace/add files that exist in /figures
    { src: "figures/pic_1.jpg", alt: "Artwork 1" },
    { src: "figures/pic_2.jpg", alt: "Artwork 2" },
    { src: "figures/pic_3.jpg", alt: "Artwork 3" },

    // If you have more:
    // { src: "figures/painting-01.jpg", alt: "Painting 01" },
    // { src: "figures/painting-02.jpg", alt: "Painting 02" },
    // { src: "figures/painting-03.jpg", alt: "Painting 03" },
  ];

  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  // 2) Render the gallery items
  for (const item of images) {
    const figure = document.createElement("figure");
    figure.className = "gallery-item fade-on-scroll";

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

  els.forEach((el) => observer.observe(el));
})();

