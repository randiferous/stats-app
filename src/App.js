import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [teams, setTeams] = useState([]);
  const [atlanticTeams, setAtlanticTeams] = useState([]);
  const [metropolitanTeams, setMetropolitanTeams] = useState([]);
  const [centralTeams, setCentralTeams] = useState([]);
  const [pacificTeams, setPacificTeams] = useState([]);
  const [previousFranchises, setPreviousFranchises] = useState([]);
  const [copyright, setCopyright] = useState('');

  useEffect(() => {
    const atlanticTeams = [];
    const metropolitanTeams = [];
    const centralTeams = [];
    const pacificTeams = [];

    const fetchData = async () => {
      try {
        const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')
        const data = await response.json();

        console.log(data);

        setCopyright(data.copyright);

        for (let i = 0; i < data.teams.length; i++) {
          if (data.teams[i].division.name === 'Atlantic') {
            atlanticTeams.push(data.teams[i]);
          } else if (data.teams[i].division.name === 'Metropolitan') {
            metropolitanTeams.push(data.teams[i]);
          } else if (data.teams[i].division.name === 'Central') {
            centralTeams.push(data.teams[i]);
          } else {
            pacificTeams.push(data.teams[i]);
          }
        }

        const sortedAtlanticTeams = atlanticTeams.sort((a, b) => (a.name > b.name) ? 1 : -1);
        const sortedMetropolitanTeams = metropolitanTeams.sort((a, b) => (a.name > b.name) ? 1 : -1);
        const sortedCentralTeams = centralTeams.sort((a, b) => (a.name > b.name) ? 1 : -1);
        const sortedPacificTeams = pacificTeams.sort((a, b) => (a.name > b.name) ? 1 : -1);

        setAtlanticTeams(sortedAtlanticTeams);
        setMetropolitanTeams(sortedMetropolitanTeams);
        setCentralTeams(sortedCentralTeams);
        setPacificTeams(sortedPacificTeams);
        setTeams(data.teams);
      } catch (error) {
        console.error('Error fetching NHL data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const previousFranchises = [];
    const franchiseIds = [];

    const fetchData = async () => {
      try {
        const response = await fetch('https://statsapi.web.nhl.com/api/v1/franchises')
        const data = await response.json();

        // console.log(data);
        //console.log(teams);

        for (let i = 0; i < teams.length; i++) {
          franchiseIds.push(teams[i].franchiseId);
        };

        for (let i = 0; i < data.franchises.length; i++) {
          const franchiseId = data.franchises[i].franchiseId;
          if (!franchiseIds.includes(franchiseId)) {
            previousFranchises.push(data.franchises[i]);
          }
        };

        setPreviousFranchises(previousFranchises);
      } catch (error) {
        console.error('Error fetching NHL data');
      }
    };

    fetchData();
  }, [teams]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://statsapi.web.nhl.com/api/v1/venues/null')
  //       const data = await response.json();

  //       console.log(data)
  //     } catch (error) {
  //       console.error('Error fetching NHL data');
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="App">
      <h1>NHL Teams</h1>
      <div className="flex">
        <div className="width-50">
          <h2>Eastern Conference</h2>
          <div className="flex">
            <div className="width-50">
              <h2>Atlantic Division</h2>
              <ul className="no-bullets no-start-padding">
                {atlanticTeams.map((team) => (
                  <li key={team.id}>
                    <a href={team.officialSiteUrl} target="_blank" rel="noreferrer">{team.name}</a>
                    <p>
                      Since: {team.firstYearOfPlay} <br></br>
                      Venue: {team.venue.name}, {team.venue.city}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="width-50">
              <h2>Metropolitan Division</h2>
              <ul className="no-bullets no-start-padding">
                {metropolitanTeams.map((team) => (
                  <li key={team.id}>
                    <a href={team.officialSiteUrl} target="_blank" rel="noreferrer">{team.name}</a>
                    <p>
                      Since: {team.firstYearOfPlay} <br></br>
                      Venue: {team.venue.name}, {team.venue.city}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="width-50">
          <h2>Western Conference</h2>
          <div className="flex">
            <div className="width-50">
              <h2>Central Division</h2>
              <ul className="no-bullets no-start-padding">
                {centralTeams.map((team) => (
                  <li key={team.id}>
                    <a href={team.officialSiteUrl} target="_blank" rel="noreferrer">{team.name}</a>
                    <p>
                      Since: {team.firstYearOfPlay} <br></br>
                      Venue: {team.venue.name}, {team.venue.city}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="width-50">
              <h2>Pacific Division</h2>
              <ul className="no-bullets no-start-padding">
                {pacificTeams.map((team) => (
                  <li key={team.id}>
                    <a href={team.officialSiteUrl} target="_blank" rel="noreferrer">{team.name}</a>
                    <p>
                      Since: {team.firstYearOfPlay} <br></br>
                      Venue: {team.venue.name}, {team.venue.city}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <h2>Previous Franchises</h2>
      <ul className="no-bullets no-start-padding">
        {previousFranchises.map((franchise) => (
          <li key={franchise.franchiseId}>
            {franchise.locationName} {franchise.teamName} ({franchise.firstSeasonId?.toString().substring(0,4)} - {franchise.lastSeasonId?.toString().substring(4,8)})
          </li>
        ))}
      </ul>
      <footer>
        {copyright}
      </footer>
    </div>
  );
}

export default App;
