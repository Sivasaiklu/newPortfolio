// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      // Update active nav link
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");

      // Scroll to target
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      document.querySelector(".nav-links").classList.remove("active");
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 15, 35, 0.98)";
    navbar.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(15, 15, 35, 0.95)";
    navbar.style.boxShadow = "none";
  }

  // Back to top button
  const backToTopBtn = document.getElementById("backToTop");
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

// Contact form submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Show success message
    alert(
      "Thank you for your message, " + name + "! I'll get back to you soon."
    );

    // Reset form
    this.reset();
  });

// Mobile menu toggle
document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");

  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    e.target !== menuToggle
  ) {
    navLinks.classList.remove("active");
  }
});

// Add scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Observe cards and items
document
  .querySelectorAll(
    ".education-item, .project-card, .skill-category, .cert-card"
  )
  .forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(item);
  });

// Update active nav link based on scroll position
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Change favicon dynamically (e.g., dark/light mode)
function updateFavicon(iconPath) {
  const favicon = document.querySelector('link[rel="icon"]');
  favicon.href = iconPath;
}

// Example: Switch to dark mode icon
updateFavicon("/assets/favicon-dark.ico");
