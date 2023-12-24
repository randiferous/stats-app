import React, { useEffect, useState } from 'react';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';
import amplifyconfig from '../../amplifyconfiguration.json'
import { API } from 'aws-amplify';
Amplify.configure(awsExports);
Amplify.configure(amplifyconfig);

function StandingsPage() {
    const [atlanticStandings, setAtlanticStandings] = useState([]);
    const [metropolitanStandings, setMetropolitanStandings] = useState([]);
    const [centralStandings, setCentralStandings] = useState([]);
    const [pacificStandings, setPacificStandings] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            let atlanticTeams = [];
            let metropolitanTeams = [];
            let centralTeams = [];
            let pacificTeams = [];

            try {
                const response = await API.get('nhlapi', '/nhlapi/standings',
                    {
                        headers: {},
                        response: true
                    });
                const data = response.data.body;


                for (let i = 0; i < data.standings.length; i++) {
                    if (data.standings[i].divisionName === "Atlantic") {
                        atlanticTeams.push(data.standings[i]);
                    } else if (data.standings[i].divisionName === "Metropolitan") {
                        metropolitanTeams.push(data.standings[i]);
                    } else if (data.standings[i].divisionName === "Central") {
                        centralTeams.push(data.standings[i]);
                    } else {
                        pacificTeams.push(data.standings[i]);
                    }
                }

                setAtlanticStandings(atlanticTeams);
                setMetropolitanStandings(metropolitanTeams);
                setCentralStandings(centralTeams);
                setPacificStandings(pacificTeams);
            } catch (error) {
                console.error('Error fetching API data');
                console.log(error);
            }
        }
        fetchApi();
    }, [])

    const divisionStandings = (divisionArray) => {
        return (
            <table className="standing-table margin-auto width-75">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Teams</th>
                        <th>GP</th>
                        <th>W</th>
                        <th>L</th>
                        <th>OT</th>
                        <th>Pts</th>
                        <th>GF</th>
                        <th>GA</th>
                    </tr>
                </thead>
                <tbody>
                    {divisionArray.map((team, index) => {
                        return (
                            <tr key={team.teamAbbrev.default} className={`${index === 7 ? "" : "underlined-row"}`}>
                                <td>{index + 1}</td>
                                <td>{team.teamName.default}</td>
                                <td>{team.gamesPlayed}</td>
                                <td>{team.wins}</td>
                                <td>{team.losses}</td>
                                <td>{team.otLosses}</td>
                                <td>{team.points}</td>
                                <td>{team.goalFor}</td>
                                <td>{team.goalAgainst}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <h1>Standings</h1>
            <h2 className="underline margin-b-0">Eastern Conference</h2>
            <div className="flex margin-b-3">
                <div className="width-50">
                    <h2>Atlantic Division</h2>
                    {divisionStandings(atlanticStandings)}
                </div>
                <div className="width-50">
                    <h2>Metropolitan Division</h2>
                    {divisionStandings(metropolitanStandings)}
                </div>
            </div>
            <h2 className="underline margin-b-0">Western Conference</h2>
            <div className="flex margin-b-3">
                <div className="width-50">
                    <h2>Central Division</h2>
                    {divisionStandings(centralStandings)}
                </div>
                <div className="width-50">
                    <h2>Pacific Division</h2>
                    {divisionStandings(pacificStandings)}
                </div>
            </div>
            <p className="margin-b-3">
                <i>Legend: GP = Games Played, W = Wins, L = Losses, OT = Overtime Losses, Pts = Points (+2 per W, +1 per OT), GF = Goals For, GA = Goals Against</i>
            </p>
        </div>
    );
}

export default StandingsPage;