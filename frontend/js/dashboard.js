/* =========================
   AUTH
========================= */

const token =
  localStorage.getItem(
    "qoreToken"
  );

const user =
  JSON.parse(
    localStorage.getItem(
      "qoreUser"
    )
  );

/* =========================
   PROTECT PAGE
========================= */

if (!token || !user) {

  window.location.href =
    "./login.html";

}

/* =========================
   USERNAME
========================= */

const usernameElement =
  document.getElementById(
    "dashboard-username"
  );

if (usernameElement) {

  usernameElement.textContent =
    user.displayName;

}

/* =========================
   LOGOUT
========================= */

const logoutButton =
  document.getElementById(
    "logout-btn"
  );

if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    () => {

      localStorage.removeItem(
        "qoreToken"
      );

      localStorage.removeItem(
        "qoreUser"
      );

      window.location.href =
        "./login.html";

    }
  );

}

/* =========================
   MODAL
========================= */

const modal =
  document.getElementById(
    "session-modal"
  );

const openModalButton =
  document.getElementById(
    "open-modal"
  );

const closeModalButton =
  document.getElementById(
    "close-modal"
  );

if (openModalButton) {

  openModalButton.addEventListener(
    "click",
    () => {

      modal.classList.remove(
        "hidden"
      );

    }
  );

}

if (closeModalButton) {

  closeModalButton.addEventListener(
    "click",
    () => {

      modal.classList.add(
        "hidden"
      );

    }
  );

}

/* =========================
   SAVE SESSION
========================= */

const sessionForm =
  document.getElementById(
    "session-form"
  );

if (sessionForm) {

  sessionForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const subject =
        document.getElementById(
          "session-subject"
        ).value;

      const questionsSolved =
        document.getElementById(
          "session-questions"
        ).value;

      const notes =
        document.getElementById(
          "session-notes"
        ).value;

      try {

        const response =
          await fetch(

            "https://qore-backend.onrender.com",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`

              },

              body: JSON.stringify({

                subject,

                questionsSolved,

                notes

              })

            }

          );

        const data =
          await response.json();

        if (!response.ok) {

          alert(data.message);

          return;

        }

modal.classList.add(
  "hidden"
);

sessionForm.reset();

/* RELOAD DASHBOARD DATA */

loadSessions();

      }

      catch (error) {

        console.log(error);


      }

    }
  );

}
/* =========================
   LOAD USER SESSIONS
========================= */

const loadSessions = async () => {

  try {

    const response =
      await fetch(

        "http://localhost:8000/api/sessions/my-sessions",

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

    const sessions =
      await response.json();

    /* TOTALS */

    let totalQuestions = 0;

    let physicsTotal = 0;

    let chemistryTotal = 0;

    let mathsTotal = 0;

    sessions.forEach((session) => {

      totalQuestions +=
        Number(
          session.questionsSolved
        );

      if (
        session.subject.includes(
          "Physics"
        )
      ) {

        physicsTotal +=
          Number(
            session.questionsSolved
          );

      }

      if (
        session.subject.includes(
          "Chemistry"
        )
      ) {

        chemistryTotal +=
          Number(
            session.questionsSolved
          );

      }

      if (
        session.subject.includes(
          "Mathematics"
        )
      ) {

        mathsTotal +=
          Number(
            session.questionsSolved
          );

      }

    });

    /* UPDATE UI */

    document.getElementById(
      "total-questions"
    ).textContent =
      totalQuestions;

    document.getElementById(
      "physics-count"
    ).textContent =
      `${physicsTotal} Qs`;

    document.getElementById(
      "chemistry-count"
    ).textContent =
      `${chemistryTotal} Qs`;

    document.getElementById(
      "maths-count"
    ).textContent =
      `${mathsTotal} Qs`;

    /* ACTIVITY */

    const activityList =
      document.getElementById(
        "activity-list"
      );

    activityList.innerHTML = "";

    sessions.slice(0, 5).forEach((session) => {

      const activityItem =
        document.createElement("div");

      activityItem.classList.add(
        "activity-item"
      );

      activityItem.innerHTML = `

        <div>

          <h4>
            ${session.subject}
          </h4>

          <p>
            Completed
            ${session.questionsSolved}
            Questions
          </p>

        </div>

        <span>
          ${new Date(
            session.createdAt
          ).toLocaleDateString()}
        </span>

      `;

      activityList.appendChild(
        activityItem
      );

    });

  }

  catch (error) {

    console.log(error);

  }

};

/* =========================
   INITIAL LOAD
========================= */

loadSessions();