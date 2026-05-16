const body = document.body;

const themeToggle = document.getElementById("theme-toggle");

/* =========================
   THEME FUNCTIONS
========================= */

function enableLightMode() {
  body.classList.add("light-mode");

  localStorage.setItem("qore-theme", "light");

  if (themeToggle) {
    themeToggle.textContent = "☀️";
  }
}

function enableDarkMode() {
  body.classList.remove("light-mode");

  localStorage.setItem("qore-theme", "dark");

  if (themeToggle) {
    themeToggle.textContent = "🌙";
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("qore-theme");

  if (savedTheme === "light") {
    enableLightMode();
  } else {
    enableDarkMode();
  }
}

/* =========================
   TOGGLE EVENT
========================= */

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    if (body.classList.contains("light-mode")) {
      enableDarkMode();
    } else {
      enableLightMode();
    }

  });

}

loadTheme();