// ===== Smooth Scroll =====
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ===== Sticky Navbar + Shadow on Scroll =====
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ===== Mobile Menu Toggle =====
const navLinks = document.querySelector(".nav-links");

if (window.innerWidth <= 768) {
  // faqat mobil holatda
  const menuBtn = document.createElement("div");
  menuBtn.classList.add("menu-btn");
  menuBtn.innerHTML = "☰";
  navbar.insertBefore(menuBtn, navLinks);

  menuBtn.addEventListener("click", () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.position = "absolute";
    navLinks.style.top = "60px";
    navLinks.style.right = "20px";
    navLinks.style.background = "rgba(15, 23, 42, 0.9)";
    navLinks.style.padding = "1rem";
    navLinks.style.borderRadius = "10px";
  });
}
// ===== Scroll Animation for Sections =====
const sections = document.querySelectorAll("section");
const revealSection = () => {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
};

window.addEventListener("scroll", revealSection);

// Initial Styles for Animation
sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "all 0.8s ease-out";
});

// ===== Typewriter Effect (Komronbek <-> Developer) =====
(function () {
  const el = document.getElementById("typed");
  const words = ["Komronbek", "Backend Developer"];
  const typeSpeed = 100; // harf yozish tezligi (ms)
  const deleteSpeed = 60; // harf o‘chirish tezligi (ms)
  const holdAfterType = 1200; // so‘z bitgach kutish (ms)
  const holdAfterDelete = 400; // o‘chirib bo‘lgach kutish (ms)

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = words[wordIndex];
    if (!isDeleting) {
      // yozish
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        // so‘z tugadi
        setTimeout(() => {
          isDeleting = true;
        }, holdAfterType);
      }
    } else {
      // o‘chirish
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // keyingi so‘zga o‘tish
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, holdAfterDelete);
        return;
      }
    }

    const delay = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(tick, delay);
  }

  // Boshlash
  tick();
})();
