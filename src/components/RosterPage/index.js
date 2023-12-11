import React, { useEffect, useState } from 'react';
import logos from '../../utility/logos';

function RosterPage() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState({ teamID: "", teamName: "Select Team" });
    const [roster, setRoster] = useState([]);
    const [teamLogo, setTeamLogo] = useState("")
    const [goalies, setGoalies] = useState([])

    useEffect(() => {
        const allTeams = [];

        const fetchData = async () => {
            try {
                const response = await fetch('/standings')
                const data = await response.json();

                for (let i = 0; i < data.standings.length; i++) {
                    const teamAbbrev = data.standings[i].teamAbbrev.default;
                    const teamName = data.standings[i].teamName.default;

                    const team = {
                        name: teamName,
                        id: teamAbbrev
                    }

                    allTeams.push(team);
                }

                const sortedTeams = allTeams.sort((a, b) => (a.name > b.name) ? 1 : -1);
                setTeams(sortedTeams);
            } catch (error) {
                console.error('Error fetching NHL data');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const playersArray = [];
        const goalieArray = [];

        const splitName = selectedTeam.teamName.split(" ");
        for (let i = 0; i < logos.length; i++) {
            if (logos[i].includes(splitName[splitName.length - 1].toLowerCase())) {
                setTeamLogo(logos[i])
            }
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`/team/${selectedTeam.teamID}`);
                const data = await response.json();

                console.log(data)

                for (let i = 0; i < data.skaters.length; i++) {
                    const firstName = data.skaters[i].firstName.default;
                    const lastName = data.skaters[i].lastName.default;
                    const position = data.skaters[i].positionCode
                    const playerId = data.skaters[i].playerId;
                    const gamesPlayed = data.skaters[i].gamesPlayed;
                    const goals = data.skaters[i].goals;
                    const assists = data.skaters[i].assists;
                    const points = data.skaters[i].points;
                    const plusMinus = data.skaters[i].plusMinus;
                    const penaltyMinutes = data.skaters[i].penaltyMinutes;

                    const playerObject = {
                        playerId: playerId,
                        firstName: firstName,
                        lastName: lastName,
                        position: position,
                        gamesPlayed: gamesPlayed,
                        goals: goals,
                        assists: assists,
                        points: points,
                        plusMinus: plusMinus,
                        penaltyMinutes: penaltyMinutes
                    }
                    playersArray.push(playerObject);
                }

                const sortedPlayersArray = playersArray.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
                setRoster(sortedPlayersArray);

                for (let i = 0; i < data.goalies.length; i++) {
                    const playerId = data.goalies[i].playerId;
                    const firstName = data.goalies[i].firstName.default;
                    const lastName = data.goalies[i].lastName.default;
                    const gamesPlayed = data.goalies[i].gamesPlayed;
                    const wins = data.goalies[i].wins;
                    const losses = data.goalies[i].losses;
                    const ot = data.goalies[i].overtimeLosses;
                    const gaa = data.goalies[i].goalsAgainstAverage;
                    const savePct = data.goalies[i].savePercentage;
                    const shutouts = data.goalies[i].shutouts;

                    const goalieObject = {
                        playerId: playerId,
                        firstName: firstName,
                        lastName: lastName,
                        gamesPlayed: gamesPlayed,
                        wins: wins,
                        losses: losses,
                        ot: ot,
                        gaa: gaa,
                        savePct: savePct,
                        shutouts: shutouts
                    }
                    goalieArray.push(goalieObject);
                }

                const sortedGoalieArray = goalieArray.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
                setGoalies(sortedGoalieArray);
            } catch (error) {
                console.error('Error fetching NHL data');
            }
        };

        if (selectedTeam.teamID !== "") {
            fetchData();
            setRoster([])
            setGoalies([])
        } else {
            setRoster([])
            setGoalies([])
        }
    }, [selectedTeam])

    const handleChange = (event) => {
        setSelectedTeam({ teamID: event.target.value, teamName: event.target.options[event.target.selectedIndex].text });
    }

    return (
        <>
            <select id="team-select" onChange={handleChange} className="margin-t-3">
                <option value="">Select Team</option>
                {teams.map((team) => {
                    return (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    )
                })}
            </select>
            <div className="flex justify-center margin-t-1">
                <h1>{selectedTeam.teamName}</h1>
                {selectedTeam.teamID === "" ? (
                    <></>
                ) : (
                    <img src={teamLogo} alt={selectedTeam.teamName} className="logo width-5 margin-l-3"></img>
                )}
            </div>
            <div className="flex">
                <div className="width-60 min-height-80">
                    <h2 className='underline'>Skaters</h2>
                    <table className="roster-table margin-auto width-60 margin-b-5">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>GP</th>
                                <th>G</th>
                                <th>A</th>
                                <th>P</th>
                                <th>+/-</th>
                                <th>PIM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roster.map((player, index) => {
                                return (
                                    <tr key={player.playerId} className={`${index === (roster.length - 1) ? "" : "underlined-row"}`}>
                                        <td>{player.firstName} {player.lastName}</td>
                                        <td>{player.position}</td>
                                        <td>{player.gamesPlayed}</td>
                                        <td>{player.goals}</td>
                                        <td>{player.assists}</td>
                                        <td>{player.points}</td>
                                        <td>{player.plusMinus}</td>
                                        <td>{player.penaltyMinutes}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
                <div className="width-40 margin-auto min-height-40">
                    <h2 className='underline'>Goalies</h2>
                    <table className="roster-table margin-auto width-70 margin-b-5">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>GP</th>
                                <th>W</th>
                                <th>L</th>
                                <th>OT</th>
                                <th>GAA</th>
                                <th>Save %</th>
                                <th>SO</th>
                            </tr>
                        </thead>
                        <tbody>

                            {goalies.map((player, index) => {
                                return (
                                    <tr key={player.playerId} className={`${index === (goalies.length - 1) ? "" : "underlined-row"}`}>
                                        <td>{player.firstName} {player.lastName}</td>
                                        <td>{player.gamesPlayed}</td>
                                        <td>{player.wins}</td>
                                        <td>{player.losses}</td>
                                        <td>{player.ot}</td>
                                        <td>{player.gaa.toFixed(2)}</td>
                                        <td>{player.savePct.toFixed(3)}</td>
                                        <td>{player.shutouts}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default RosterPage;