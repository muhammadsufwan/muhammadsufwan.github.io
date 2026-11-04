/* =========================================================
   VIDEOS: paste your YouTube video IDs here.
   Example: for https://www.youtube.com/watch?v=dQw4w9WgXcQ
   the ID is "dQw4w9WgXcQ".
   If an ID is empty, "Watch trailer" opens the Meta Store page.
   ========================================================= */
const VIDEOS = {
  "vr-boxing": "",
  "gas-n-chaos": ""
};

const GALLERIES = {
  "vr-boxing": [1, 2, 3, 4, 5].map(n => `assets/img/vr-boxing-${n}.jpg`),
  "gas-n-chaos": ["assets/img/gas-n-chaos-cover.jpg", ...[1, 2, 3, 4, 5].map(n => `assets/img/gas-n-chaos-${n}.jpg`)]
};

// nav
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 20), { passive: true });
toggle.addEventListener("click", () => { toggle.classList.toggle("open"); links.classList.toggle("open"); });
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { toggle.classList.remove("open"); links.classList.remove("open"); }));
document.getElementById("year").textContent = new Date().getFullYear();

// lightbox
const lb = document.getElementById("lightbox");
const stage = document.getElementById("lbStage");
let current = [], idx = 0;
function show() { stage.innerHTML = `<img src="${current[idx]}" alt="">`; }
function open(list, i) {
  current = list; idx = i; show();
  lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
  document.getElementById("lbPrev").style.display = list.length > 1 ? "" : "none";
  document.getElementById("lbNext").style.display = list.length > 1 ? "" : "none";
}
function close() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); stage.innerHTML = ""; }
document.querySelectorAll("[data-gallery]").forEach(b => b.addEventListener("click", () => open(GALLERIES[b.dataset.gallery], +b.dataset.index)));
document.getElementById("lbClose").onclick = close;
document.getElementById("lbPrev").onclick = () => { idx = (idx - 1 + current.length) % current.length; show(); };
document.getElementById("lbNext").onclick = () => { idx = (idx + 1) % current.length; show(); };
lb.addEventListener("click", e => { if (e.target === lb) close(); });
addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft" && current.length > 1) document.getElementById("lbPrev").click();
  if (e.key === "ArrowRight" && current.length > 1) document.getElementById("lbNext").click();
});

// trailers
document.querySelectorAll(".play-video").forEach(b => b.addEventListener("click", e => {
  const id = VIDEOS[b.dataset.video];
  if (!id) return; // no YouTube ID yet: the link opens the Meta Store page
  e.preventDefault();
  current = []; lb.classList.add("open");
  document.getElementById("lbPrev").style.display = "none";
  document.getElementById("lbNext").style.display = "none";
  stage.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
}));

// reveal on scroll
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12 }) : null;
document.querySelectorAll(".section-head,.project,.mini,.card,.timeline li,.skill-box,.contact,.stat").forEach(el => {
  if (io) { el.classList.add("reveal"); io.observe(el); }
});
