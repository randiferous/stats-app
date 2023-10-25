import React, { useEffect, useState } from 'react';

function StandingsPage() {
    const [atlanticStandings, setAtlanticStandings] = useState([]);
    const [metropolitanStandings, setMetropolitanStandings] = useState([]);
    const [centralStandings, setCentralStandings] = useState([]);
    const [pacificStandings, setPacificStandings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://statsapi.web.nhl.com/api/v1/standings')
                const data = await response.json();

                for (let i = 0; i < data.records.length; i++) {
                    if (data.records[i].division.name === 'Atlantic') {
                        setAtlanticStandings(data.records[i].teamRecords);
                    } else if (data.records[i].division.name === 'Metropolitan') {
                        setMetropolitanStandings(data.records[i].teamRecords);
                    } else if (data.records[i].division.name === 'Central') {
                        setCentralStandings(data.records[i].teamRecords);
                    } else {
                        setPacificStandings(data.records[i].teamRecords);
                    }
                }

                // console.log(data)
            } catch (error) {
                console.error('Error fetching NHL data');
            }
        };

        fetchData();
    }, []);

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
                            <tr key={team.team.id} className={`${index === 7 ? "" : "underlined-row"}`}>
                                <td>{team.divisionRank}</td>
                                <td>{team.team.name}</td>
                                <td>{team.gamesPlayed}</td>
                                <td>{team.leagueRecord.wins}</td>
                                <td>{team.leagueRecord.losses}</td>
                                <td>{team.leagueRecord.ot}</td>
                                <td>{team.points}</td>
                                <td>{team.goalsScored}</td>
                                <td>{team.goalsAgainst}</td>
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