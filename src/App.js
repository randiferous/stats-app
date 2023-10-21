import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TeamsPage from './components/TeamsPage';
import GamesPage from './components/GamesPage';

function App() {
  const [copyright, setCopyright] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')
        const data = await response.json();

        // console.log(data);

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
  //       const response = await fetch('https://statsapi.web.nhl.com/api/v1/configurations')
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
            {/* <a href="#games">Games</a> */}
            <Link to="/games">Games</Link>
          </li>
          <li>
            {/* <a href="#teams">Teams</a> */}
            <Link to="/teams">Teams</Link>
          </li>
        </ul>
      </nav>
      {/* <TeamsPage id="teams"></TeamsPage>
      <GamesPage id="games"></GamesPage> */}
      <Routes>
        <Route path="/teams" element={<TeamsPage />}></Route>
        <Route path="/games" element={<GamesPage />}></Route>
        <Route path="/stats-app" element={<Navigate to="/games" replace />}></Route>
      </Routes>
      </Router>
      <footer className="padding-tb-2 margin-lr-5">
        {copyright}
      </footer>
    </div>
  );
}

export default App;
