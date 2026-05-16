const existingToken =
  localStorage.getItem(
    "qoreToken"
  );

if (existingToken) {

  window.location.href =
    "./dashboard.html";

}
const API_URL = "https://qore-backend.onrender.com";

/* =========================
   SIGNUP
========================= */

const signupForm =
  document.getElementById("signup-form");

if (signupForm) {

  signupForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const displayName =
        document.getElementById("signup-name").value;

      const email =
        document.getElementById("signup-email").value;

      const password =
        document.getElementById("signup-password").value;

      try {

        const response = await fetch(
          `${API_URL}/signup`,
          {

            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              displayName,
              email,
              password
            })

          }
        );

        const data = await response.json();

        if (!response.ok) {

          alert(data.message);

          return;

        }

        /* SAVE TOKEN */

        localStorage.setItem(
          "qoreToken",
          data.token
        );

        localStorage.setItem(
          "qoreUser",
          JSON.stringify(data.user)
        );

        window.location.href =
          "dashboard.html";

      }

      catch (error) {

        console.log(error);

        alert("Something went wrong");

      }

    }
  );

}

/* =========================
   LOGIN
========================= */

const loginForm =
  document.getElementById("login-form");

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const email =
        document.getElementById("login-email").value;

      const password =
        document.getElementById("login-password").value;

      try {

        const response = await fetch(
          `${API_URL}/login`,
          {

            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              email,
              password
            })

          }
        );

        const data = await response.json();

        if (!response.ok) {

          alert(data.message);

          return;

        }

        /* SAVE TOKEN */

        localStorage.setItem(
          "qoreToken",
          data.token
        );

        localStorage.setItem(
          "qoreUser",
          JSON.stringify(data.user)
        );


        window.location.href =
          "dashboard.html";

      }

      catch (error) {

        console.log(error);

        alert("Something went wrong");

      }

    }
  );
}