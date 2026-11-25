
const CONTACT = {
  whatsapp: "966542512318",
  email: "jetto.enas@gmail.com",
  linkedin: "https://www.linkedin.com/in/enas-jt-571123222/",
  github: "https://github.com/Enas2121"
};

const root = document.documentElement;
const themeButton = document.getElementById("themeToggle");
const menuButton = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

// الوضع الليلي والنهاري
function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("enas-theme", theme);

  if (themeButton) {
    const dark = theme === "dark";
    const icon = themeButton.querySelector(".theme-icon");
    const label = themeButton.querySelector(".theme-label");

    if (icon) icon.textContent = dark ? "☀" : "☾";
    if (label) label.textContent = dark ? "الوضع النهاري" : "الوضع الليلي";
  }
}

const savedTheme = localStorage.getItem("enas-theme");
setTheme(savedTheme || "light");

themeButton?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

// قائمة الجوال
menuButton?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// الواتساب
const whatsapp = document.getElementById("whatsappLink");

if (whatsapp) {
  whatsapp.href = `https://wa.me/${CONTACT.whatsapp}`;
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener";
}

// البريد الإلكتروني
const emailLink = document.querySelector('a[href^="mailto:"]');

if (emailLink) {
  emailLink.href = `mailto:${CONTACT.email}`;
}

// LinkedIn و GitHub
document.querySelectorAll(".muted-link").forEach(link => {
  const url = link.textContent.includes("LinkedIn")
    ? CONTACT.linkedin
    : CONTACT.github;

  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    link.addEventListener("click", event => {
      event.preventDefault();
      alert("أضيفي رابط حسابك في ملف script.js.");
    });
  }
});

// ظهور العناصر عند التمرير
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.add("visible");
  });
}
