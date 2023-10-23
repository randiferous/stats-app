import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TeamsPage from './components/TeamsPage';
import GamesPage from './components/GamesPage';
import StandingsPage from './components/Standings';
import RosterPage from './components/RosterPage';

function App() {
  const [copyright, setCopyright] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')
        const data = await response.json();

        setCopyright(data.copyright);

      } catch (error) {
        console.error('Error fetching NHL data');
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams/4/roster')
  //       const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams/4/stats')
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
      <Router>
        <nav>
          <ul className="no-bullets no-start-padding flex space-evenly">
            <li>
              <Link to="/games">Games</Link>
            </li>
            <li>
              <Link to="/standings">Standings</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
            <li>
              <Link to="/roster">Roster</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/stats-app" element={<Navigate to="/games" replace />}></Route>
          <Route path="/games" element={<GamesPage />}></Route>
          <Route path="/teams" element={<TeamsPage />}></Route>
          <Route path="/standings" element={<StandingsPage />}></Route>
          <Route path="/roster" element={<RosterPage />}></Route>
        </Routes>
      </Router>
      <footer className="padding-tb-3 padding-lr-5 background-slateblue text-offwhite text-small">
        {copyright}
      </footer>
    </div>
  );
}

export default App;
