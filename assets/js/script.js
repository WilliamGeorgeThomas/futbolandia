//global variables

let logoDiv = document.querySelector("#logo-div");
let leagueButton = document.querySelector("#league-button");
let leagueOption = document.querySelector("#league-option");
let leagueTableHeader = document.querySelector("#league-table-header");
let leagueTableDiv = document.querySelector("#league-table-div");
let scorerHeader = document.querySelector("#scorer-header");
let scorersDiv = document.querySelector("#scorers-div");
let fixturesHeader = document.querySelector("#fixtures-header");
let fixturesDiv = document.querySelector("#fixtures-div");
let radioDiv = document.querySelector("#radio-div");
let radioTable = document.querySelector("#radio-table");
let radioFixtures = document.querySelector("#radio-fixtures");
let radioScorers = document.querySelector("#radio-scorers");
let leagueID = {
  premierLeague: 39,
  laLiga: 140,
  serieA: 71,
  bundesliga: 78,
  ligue1: 61,
};

// let golDif = document.querySelector("#gol-dif");

//TODO: HIDE API KEY
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

function getLeagueID(inputLeague) {
  console.log(inputLeague);
  if (inputLeague in leagueID) {
    return leagueID[inputLeague];
  } else {
    return null;
  }
}

function getLeagueData() {
  //get league selection from drop down
  //show league logo
  radioTable.checked = false;
  radioFixtures.checked = false;
  radioScorers.checked = false;
  logoDiv.innerHTML = "";
  leagueTableDiv.innerHTML = "";
  fixturesDiv.innerHTML = "";
  scorersDiv.innerHTML = "";

  //clears headers when switching to a different league
  if (!leagueTableHeader.classList.contains("d-none")) {
    leagueTableHeader.classList.add("d-none");
  }
  if (!fixturesHeader.classList.contains("d-none")) {
    fixturesHeader.classList.add("d-none");
  }
  if (!scorerHeader.classList.contains("d-none")) {
    scorerHeader.classList.add("d-none");
  }

  let leagueChoice = document.getElementById("league-button");
  let leagueLogo = `<img class="leagueLogo" src="https://media.api-sports.io/football/leagues/${getLeagueID(leagueChoice.value)}.png">`;
  logoDiv.innerHTML += leagueLogo;
  radioDiv.classList.remove("d-none");
}

function showLeagueTable() {
  leagueTableHeader.classList.remove("d-none");
  scorerHeader.classList.add("d-none");
  fixturesHeader.classList.add("d-none");
  fixturesDiv.innerHTML = "";
  scorersDiv.innerHTML = "";
  let leagueChoice = document.getElementById("league-button");
  let requestUrl = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${getLeagueID(leagueChoice.value)}`;
  console.log(requestUrl);

  fetch(requestUrl, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let standings = data.response[0].league.standings[0];

      standings.forEach((standing) => {
        console.log(standing);
        leagueTableDiv.innerHTML += `<tr id="tableLine"><td>${standing.rank}</td><td><img class="teamLogo" src="${standing.team.logo}"></td><td>${standing.team.name}</td><td>${standing.all.played}</td><td id="golDif">${standing.goalsDiff}</td><td class="fw-bold">${standing.points}</td><td>${standing.form}</td></tr>`;

        // if (standing.rank <= 4) {
        //   tableLine.classList.add("table-success");
        // }

        // if (standing.goalsDiff >= 0) {
        //   golDif.classList.add("text-success");
        // } else {
        //   golDif.classList.add("text-danger");
        // }
      });
    })
    .catch((err) => console.error(err));
}

let date = dayjs().format("DD/MM/YYYY");

function showFixtures() {
  //display table of fixtures for selected league
  leagueTableDiv.innerHTML = "";
  fixturesDiv.innerHTML = "";
  leagueTableHeader.classList.add("d-none");
  scorerHeader.classList.add("d-none");
  fixturesHeader.classList.remove("d-none");
  let leagueChoice = document.getElementById("league-button");
  let fixtureUrl = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${getLeagueID(leagueChoice.value)}&season=2022`;

  fetch(fixtureUrl, options)
    .then((response) => response.json())
    .then((data) => {
      let fixtures = data.response;

      fixtures.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);

      console.log(fixtures);

      fixtures.forEach((fixture) => {
        let fixtureDate = fixture.fixture.timestamp;
        let now = dayjs().unix();
        //sort through array by unix timestamp?

        if (fixtureDate > now) {
          fixturesDiv.innerHTML += `<tr><td>${fixture.fixture.id},  ${fixture.fixture.timestamp}</td><td>${dayjs(fixture.fixture.date).format("MMMM DD, YYYY")}</td><td><img class="teamLogo" src="${fixture.teams.home.logo}"></td><td>${fixture.teams.home.name}</td><td>vs</td><td><img class="teamLogo" src="${fixture.teams.away.logo}"></td><td>${fixture.teams.away.name}</td><td>${fixture.fixture.venue.name}, ${fixture.fixture.venue.city}</td></tr>`;
        }
      });
    })
    .catch((err) => console.error(err));
}

function showTopScorers() {
  //display table of top scorers for selected league
  leagueTableDiv.innerHTML = "";
  fixturesDiv.innerHTML = "";
  leagueTableHeader.classList.add("d-none");
  fixturesHeader.classList.add("d-none");
  scorerHeader.classList.remove("d-none");
  let leagueChoice = document.getElementById("league-button");
  let topScorerUrl = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${getLeagueID(leagueChoice.value)}&season=2022`;

  fetch(topScorerUrl, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let topScorers = data.response;

      //TODO find way to display flag instead of country name next to player (leauges too?)

      topScorers.forEach((scorer) => {
        console.log(scorer);
        scorersDiv.innerHTML += `<tr><td>${scorer.player.name} (${scorer.player.nationality})</td><td><img class="teamLogo" src="${scorer.statistics[0].team.logo}"></td><td>${scorer.statistics[0].team.name}</td><td class="fw-bold">${scorer.statistics[0].goals.total}</td></tr>`;
      });
    })
    .catch((err) => console.error(err));
}

//function calls

init();

//event listeners

leagueButton.addEventListener("change", getLeagueData);

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {

//     });
