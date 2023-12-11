import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TeamsPage from './components/TeamsPage';
import GamesPage from './components/GamesPage';
import StandingsPage from './components/Standings';
import RosterPage from './components/RosterPage';
// import DraftPage from './components/DraftPage'

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.href)

  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       // const response = await fetch('https://statsapi.web.nhl.com/api/v1/teams')
  //       const response = await fetch("https://api-web.nhle.com/v1/standings/2023-12-09")

  //       const data = await response.json();
  //       console.log(data)

  //     } catch (error) {
  //       console.log(error)
  //       console.error('Error fetching NHL data');

  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (authStatus === "authenticated" && currentPage === "login") {
  //     setCurrentPage("games");
  //   }
  //   // Add other dependencies if they influence your effect logic.
  //   // If setCurrentPage doesn't depend on them, it's safe to leave the array empty.
  // }, [authStatus]); 


  function RequireAuth({ children, authStatus }) {
    if (authStatus === "unauthenticated") {
      setCurrentPage("login")
      return <Navigate to="/login" />;
    }
    return children;
  }

  // const handleSignIn = () => {
  //   setCurrentPage("games")
  // }

  const handleSignOut = () => {
    signOut();
    return (<Navigate to="/login" />);
  }

  return (
    <div className="App">
      <Router>
        <nav className="background-slateblue padding-tb-1">
          <ul className="no-bullets no-start-padding flex space-evenly ">
            {user ? (
              <li className="text-offwhite text-bold text-very-large">
                Welcome {user.attributes.given_name}!
              </li>
            ) : (
              <li className="text-offwhite text-bold text-very-large">
                NHL App
              </li>
            )}
            <li>
              <Link to="/teams" onClick={() => setCurrentPage("teams")}
                className={`flex align-center justify-center pointer text-slateblue width-120px height-100 background-offwhite border-radius-5 no-underline 
                ${currentPage.includes("teams") ? "text-bold" : ""}`}>Teams</Link>
            </li>
            <li>
              <Link to="/standings" onClick={() => setCurrentPage("standings")}
                className={`flex align-center justify-center pointer text-slateblue width-120px height-100 background-offwhite border-radius-5 no-underline 
                ${currentPage.includes("standings") ? "text-bold" : ""}`}>Standings</Link>
            </li>
            <li>
              <Link to="/roster" onClick={() => setCurrentPage("roster")}
                className={`flex align-center justify-center pointer text-slateblue width-120px height-100 background-offwhite border-radius-5 no-underline 
                ${currentPage.includes("roster") ? "text-bold" : ""}`}>Rosters</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/games" onClick={() => setCurrentPage("games")}
                    className={`flex align-center justify-center pointer text-slateblue width-120px height-100 background-offwhite border-radius-5 no-underline 
                    ${currentPage.includes("games") ? "text-bold" : ""}`}>Games</Link>
                </li>
                {/* <li>
                  <Link to="/draft" onClick={() => setCurrentPage("draft")}
                    className={`flex align-center justify-center pointer text-slateblue width-120px height-100 background-offwhite border-radius-5 no-underline 
                    ${currentPage.includes("draft") ? "text-bold" : ""}`}>Draft</Link>
                </li> */}
                <li className="text-slateblue">
                  <button onClick={handleSignOut} 
                  className="flex align-center justify-center pointer text-slateblue width-120px height-100 background-offwhite border-radius-5 no-underline no-border">Sign out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setCurrentPage("login")}
                    className={`flex align-center justify-center pointer text-slateblue width-120px height-100 background-offwhite border-radius-5 no-underline 
                    ${currentPage.includes("login") ? "text-bold" : ""}`}>Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/teams" replace />}></Route>
          <Route path="/stats-app" element={<Navigate to="/teams" replace />}></Route>
          <Route path="/teams" element={<TeamsPage />}></Route>
          <Route path="/standings" element={<StandingsPage />}></Route>
          <Route path="/roster" element={<RosterPage />}></Route>
          <Route path="/games" element=
            {<RequireAuth authStatus={authStatus}>
              <GamesPage />
            </RequireAuth>}>
          </Route>
          {/* <Route path="/draft" element=
            {<RequireAuth authStatus={authStatus}>
              <DraftPage />
            </RequireAuth>}>
          </Route> */}
          <Route path="/login" element={
            <Authenticator className="margin-tb-3">
              {authStatus === "authenticated" ? (
                <Navigate to="/games" replace />
              ) : (
                <></>
              )}
            </Authenticator>
          }></Route>
        </Routes>
      </Router>
      <footer className="padding-tb-3 padding-lr-5 background-slateblue text-offwhite text-small">
        Copyright &copy; 2024 Daniel Younghwan Lee.  All Rights Reserved. <br /><br />
        This site is not affiliated with, endorsed by, or connected to the National Hockey League.
        All NHL team logos and marks depicted herein are the property of the NHL and the respective teams
        and may not be reproduced without the prior written consent of NHL Enterprises, L.P.
        NHL, the NHL Shield, the word mark and image of the Stanley Cup, and NHL Conference logos
        are registered trademarks of the National Hockey League.
      </footer>
    </div>
  );
}

export default App;
