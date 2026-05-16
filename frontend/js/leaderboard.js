const leaderboardList =
  document.getElementById(
    "leaderboard-list"
  );

const currentUser =
  JSON.parse(
    localStorage.getItem(
      "qoreUser"
    )
  );

const loadLeaderboard =
  async () => {

    try {

      const response =
        await fetch(
          "https://qore-backend.onrender.com"
        );

      const leaderboard =
        await response.json();

      leaderboardList.innerHTML = "";

      leaderboard.forEach(

        (user, index) => {

          const card =
            document.createElement(
              "div"
            );

          card.classList.add(
            "leaderboard-card"
          );

          /* TOP 3 */

          if (index === 0) {

            card.classList.add(
              "gold-rank"
            );

          }

          if (index === 1) {

            card.classList.add(
              "silver-rank"
            );

          }

          if (index === 2) {

            card.classList.add(
              "bronze-rank"
            );

          }

          /* CURRENT USER */

          if (
            currentUser &&
            user.displayName ===
            currentUser.displayName
          ) {

            card.classList.add(
              "current-user"
            );

          }

          card.innerHTML = `

            <div class="rank-left">

              <div class="rank-number">
                #${index + 1}
              </div>

              <div class="rank-user">

                <h2>
                  ${user.displayName}
                </h2>

                <p>
                  ${user.tier}
                </p>

              </div>

            </div>

            <div class="rank-stats">

              <div class="rank-stat">

                <h3>
                  ${user.totalQuestions}
                </h3>

                <p>
                  Questions
                </p>

              </div>

              <div class="rank-stat">

                <h3>
                  ${user.streak}
                </h3>

                <p>
                  Streak
                </p>

              </div>

            </div>

          `;

          leaderboardList.appendChild(
            card
          );

        }

      );

    }

    catch (error) {

      console.log(error);

    }

};

loadLeaderboard();