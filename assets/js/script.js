let tableEl = document.querySelector("#table-el");
let requestUrl = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=39`;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6ee9437e56msh3ff42cf5ede6387p127fbcjsn8b4d762559b4",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {

//     });

fetch(requestUrl, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    let standings = data.response[0].league.standings[0];

    standings.forEach((standing) => {
      console.log(standing);
      tableEl.innerHTML += `${standing.team.name}`
    });
  })
  .catch((err) => console.error(err));
