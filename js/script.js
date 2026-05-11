// Nav scroll shadow
const nav = document.getElementById("mainNav");
const scrollBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
  scrollBtn.classList.toggle("show", window.scrollY > 400);
  // Active nav
  let cur = "";
  document.querySelectorAll("section[id]").forEach((s) => {
    if (window.scrollY >= s.offsetTop - 90) cur = s.id;
  });
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + cur);
  });
});

// Mobile menu
function toggleMenu() {
  nav.classList.toggle("open");
}
document
  .querySelectorAll(".nav-links a")
  .forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open")),
  );

// Intersection observer for fade-up + counters + skill bars
let barsAnimated = false;
let countersAnimated = false;

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      io.unobserve(e.target);
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));

// Skill bars observer
const skillIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !barsAnimated) {
        barsAnimated = true;
        document.querySelectorAll(".skill-bar-fill").forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width + "%";
          }, i * 100);
        });
      }
    });
  },
  { threshold: 0.3 },
);
const skillBars = document.getElementById("skillBars");
if (skillBars) skillIo.observe(skillBars);

// Stats counter observer
const statsIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        document.querySelectorAll("[data-count]").forEach((el) => {
          const target = parseInt(el.dataset.count);
          let current = 0;
          const step = target / (1600 / 16);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current) + "+";
            if (current >= target) clearInterval(timer);
          }, 16);
        });
      }
    });
  },
  { threshold: 0.4 },
);
const statsBar = document.querySelector(".stats-bar");
if (statsBar) statsIo.observe(statsBar);

// Project filter
function filterProjects(btn, cat) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".project-card").forEach((card) => {
    card.style.display =
      cat === "all" || card.dataset.cat === cat ? "" : "none";
  });
}

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  document.getElementById("contactForm").style.display = "none";
  document.getElementById("formSuccess").style.display = "block";
}
