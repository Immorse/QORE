const API_BASE_URL = "https://qore-backend.onrender.com";

const leaderboardList = document.getElementById("leaderboard-list");

const currentUser = JSON.parse(localStorage.getItem("qoreUser"));

const loadLeaderboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard/jee`);

    const leaderboard = await response.json();

    leaderboardList.innerHTML = "";

    if (leaderboard.length === 0) {
      leaderboardList.innerHTML = `
        <div class="leaderboard-card">
          <div class="rank-user">
            <h2>No users yet</h2>
            <p>Create an account and add sessions to appear here.</p>
          </div>
        </div>
      `;

      return;
    }

    leaderboard.forEach((user, index) => {
      const card = document.createElement("div");

      card.classList.add("leaderboard-card");

      if (index === 0) card.classList.add("gold-rank");
      if (index === 1) card.classList.add("silver-rank");
      if (index === 2) card.classList.add("bronze-rank");

      if (currentUser && user.displayName === currentUser.displayName) {
        card.classList.add("current-user");
      }

      card.innerHTML = `
        <div class="rank-left">
          <div class="rank-number">
            #${index + 1}
          </div>

          <div class="rank-user">
            <h2>${user.displayName}</h2>
            <p>${user.tier}</p>
          </div>
        </div>

        <div class="rank-stats">
          <div class="rank-stat">
            <h3>${user.totalQuestions}</h3>
            <p>Questions</p>
          </div>

          <div class="rank-stat">
            <h3>${user.streak}</h3>
            <p>Streak</p>
          </div>
        </div>
      `;

      leaderboardList.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
};

loadLeaderboard();