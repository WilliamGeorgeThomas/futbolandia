let tableEl = document.querySelector("#table-el");
let logoDiv = document.querySelector("#logo-div");
// let golDif = document.querySelector("#gol-dif");
let tableHeader = document.querySelector("#table-header");
let leagueButton = document.querySelector("#league-button");
let leagueOption = document.querySelector("#league-option");
let leagueID = {
  premierLeague: 39,
  laLiga: 140,
  serieA: 71,
  bundesliga: 78,
  ligue1: 61,
};

// const dayjs = require("dayjs");
// dayjs().format();

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
  // let leagueChoice = document.getElementById("league-button");
  // let requestUrl = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${getLeagueID(leagueChoice.value)}`;
  // console.log(requestUrl);
  // fetch(requestUrl, options)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     let leagueLogo = `<img src="https://media.api-sports.io/football/leagues/${getLeagueID(leagueChoice.value)}.png">`;
  //     logoDiv.innerHTML += leagueLogo;
  //     let standings = data.response[0].league.standings[0];
  //   })
  //   .catch((err) => console.error(err));
}

function showLeagueTable() {
  tableHeader.classList.remove("d-none");
  tableEl.innerHTML = "";
  let leagueChoice = document.getElementById("league-button");
  // console.log(leagueChoice.options[selectedIndex.value]);
  // console.log(leagueChoice.value);
  let requestUrl = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${getLeagueID(leagueChoice.value)}`;
  console.log(requestUrl);

  fetch(requestUrl, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // let leagueLogo = `<img src="https://media.api-sports.io/football/leagues/${leagueID.premierLeague}.png">`;

      let standings = data.response[0].league.standings[0];

      standings.forEach((standing) => {
        console.log(standing);
        tableEl.innerHTML += `<tr><td>${standing.rank}</td><td><img class="teamLogo" src="${standing.team.logo}"></td><td>${standing.team.name}</td><td>${standing.all.played}</td><td id="golDif">${standing.goalsDiff}</td><td>${standing.points}</td><td>${standing.form}</td></tr>`;

        // if (standing.goalsDiff >= 0) {
        //   golDif.classList.add("text-success");
        // } else {
        //   golDif.classList.add("text-danger");
        // }
      });
    })
    .catch((err) => console.error(err));
}

function showFixtures() {
  //display table of fixtures for selected league
  let leagueChoice = document.getElementById("league-button");
  let fixtureUrl = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2022`;

  fetch(fixtureUrl, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let fixtures = data.response[0].league.standings[0];

      standings.forEach((standing) => {
        console.log(standing);
        tableEl.innerHTML += ``;
      });
    })
    .catch((err) => console.error(err));
}

function showTopScorers() {
  //display table of top scorers for selected league
    let leagueChoice = document.getElementById("league-button");
    let topScorerUrl = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=39&season=2022`;


    fetch(scorerUrl, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let topScorers = data.response[0].league.standings[0];

        standings.forEach((standing) => {
          console.log(standing);
          tableEl.innerHTML += ``;
        });
      })
      .catch((err) => console.error(err));
}

//function calls

init();

//event listeners

leagueButton.addEventListener("change", showLeagueTable);

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {

//     });
