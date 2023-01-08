let tableEl = document.querySelector("#table-el");
let requestUrl = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=39`;
let showTableButton = document.querySelector("#show-table-button");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6ee9437e56msh3ff42cf5ede6387p127fbcjsn8b4d762559b4",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

function init() {
  // home landing page state?
}

function showLeagueTable() {
  let leagueID = {
    premierLeague: 39,
    laLiga: 140,
    serieA: 71,
    bundesliga: 78,
    ligue1: 61,
  };

  fetch(requestUrl, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let leagueLogo = `<img src="https://media.api-sports.io/football/leagues/${leagueID[1]}.png">`;

      let standings = data.response[0].league.standings[0];

      standings.forEach((standing) => {
        console.log(standing);
        tableEl.innerHTML += `<tr><td>${standing.rank}</td><td><img class="teamLogo" src="${standing.team.logo}"></td><td>${standing.team.name}</td><td>${standing.all.played}</td><td>${standing.goalsDiff}</td><td>${standing.points}</td><td>${standing.form}</td></tr>`;
      });
    })
    .catch((err) => console.error(err));
}

//function calls

init();

//event listeners

showTableButton.addEventListener("click", showLeagueTable);

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {

//     });
