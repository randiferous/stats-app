import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TeamsPage from './components/TeamsPage';
import GamesPage from './components/GamesPage';
import StandingsPage from './components/Standings';
import RosterPage from './components/RosterPage';
import DraftPage from './components/DraftPage'

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
  const [copyright, setCopyright] = useState('');
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  // const { route } = useAuthenticator((context) => [context.route]);

  // console.log(user);
  // console.log(route);
  // console.log(signOut);

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
  //       const response = await fetch('https://statsapi.web.nhl.com/api/v1/draft')
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
            {
              user ? (
                <li>
                  Welcome {user.attributes.given_name}!
                </li>
              ) : (
                <></>
              )
            }
            <li>
              <Link to="/teams" className="pointer">Teams</Link>
            </li>
            <li>
              <Link to="/standings" className="pointer">Standings</Link>
            </li>
            <li>
              <Link to="/roster" className="pointer">Roster</Link>
            </li>
            {
              user ? (
                <>
                  <li>
                    <Link to="/games" className="pointer">Games</Link>
                  </li>
                  <li>
                    <Link to="/draft" className="pointer">Draft</Link>
                  </li>
                  <li>
                    <button onClick={signOut}>Sign out</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="pointer">Login</Link>
                  </li>
                </>
              )
            }
            {/* <li>
              <Link to="/login" className="pointer">Login</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/teams" replace />}></Route>
          <Route path="/stats-app" element={<Navigate to="/teams" replace />}></Route>
          <Route path="/teams" element={<TeamsPage />}></Route>
          <Route path="/standings" element={<StandingsPage />}></Route>
          <Route path="/roster" element={<RosterPage />}></Route>
          <Route path="/games" element={<GamesPage />}></Route>
          <Route path="/draft" element={<DraftPage />}></Route>
          <Route path="/login" element={
            <Authenticator className="margin-tb-3">
              {
                user ? (
                  <Navigate to="/games" replace />
                ) : (
                  <></>
                )
              }
            </Authenticator>
          }></Route>
        </Routes>
      </Router>
      <footer className="padding-tb-3 padding-lr-5 background-slateblue text-offwhite text-small">
        {copyright}
      </footer>
    </div>
  );
}

export default App;
