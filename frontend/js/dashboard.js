const API_BASE_URL = "https://qore-backend.onrender.com";

const token = localStorage.getItem("qoreToken");

const user = JSON.parse(localStorage.getItem("qoreUser"));

if (!token || !user) {
  window.location.href = "./login.html";
}

const usernameElement = document.getElementById("dashboard-username");

if (usernameElement && user) {
  usernameElement.textContent = user.displayName;
}

/* =========================
   LOGOUT
========================= */

const logoutButton = document.getElementById("logout-btn");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("qoreToken");
    localStorage.removeItem("qoreUser");

    window.location.href = "./login.html";
  });
}

/* =========================
   MODAL
========================= */

const modal = document.getElementById("session-modal");
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");

if (openModalButton) {
  openModalButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
}

if (closeModalButton) {
  closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

/* =========================
   LOAD USER SESSIONS
========================= */

const loadSessions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/my-sessions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const sessions = await response.json();

    let totalQuestions = 0;
    let physicsTotal = 0;
    let chemistryTotal = 0;
    let mathsTotal = 0;

    sessions.forEach((session) => {
      const count = Number(session.questionsSolved);

      totalQuestions += count;

      if (session.subject.includes("Physics")) {
        physicsTotal += count;
      }

      if (session.subject.includes("Chemistry")) {
        chemistryTotal += count;
      }

      if (session.subject.includes("Mathematics")) {
        mathsTotal += count;
      }
    });

    document.getElementById("total-questions").textContent = totalQuestions;
    document.getElementById("physics-count").textContent = `${physicsTotal} Qs`;
    document.getElementById("chemistry-count").textContent = `${chemistryTotal} Qs`;
    document.getElementById("maths-count").textContent = `${mathsTotal} Qs`;

    const activityList = document.getElementById("activity-list");

    activityList.innerHTML = "";

    if (sessions.length === 0) {
      activityList.innerHTML = `
        <div class="activity-item">
          <div>
            <h4>No sessions yet</h4>
            <p>Add your first study session.</p>
          </div>
        </div>
      `;

      return;
    }

    sessions.slice(0, 5).forEach((session) => {
      const activityItem = document.createElement("div");

      activityItem.classList.add("activity-item");

      activityItem.innerHTML = `
        <div>
          <h4>${session.subject}</h4>
          <p>Completed ${session.questionsSolved} Questions</p>
        </div>

        <span>
          ${new Date(session.createdAt).toLocaleDateString()}
        </span>
      `;

      activityList.appendChild(activityItem);
    });
  } catch (error) {
    console.log(error);
  }
};

/* =========================
   SAVE SESSION
========================= */

const sessionForm = document.getElementById("session-form");

if (sessionForm) {
  sessionForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const subject = document.getElementById("session-subject").value;
    const questionsSolved = document.getElementById("session-questions").value;
    const notes = document.getElementById("session-notes").value;

    try {
      const response = await fetch(`${API_BASE_URL}/api/sessions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject,
          questionsSolved,
          notes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Could not save session");
        return;
      }

      modal.classList.add("hidden");
      sessionForm.reset();

      loadSessions();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  });
}

loadSessions();