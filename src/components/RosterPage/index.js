import React, { useEffect, useState } from 'react';

function RosterPage() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState({ teamID: "", teamName: "Select Team" });
    const [roster, setRoster] = useState([]);
    const [teamStats, setTeamStats] = useState([]);

    useEffect(() => {
        const allTeams = [];

        const fetchData = async () => {
            try {
                const teamResponse = await fetch('https://statsapi.web.nhl.com/api/v1/teams')
                const teamData = await teamResponse.json();

                for (let i = 0; i < teamData.teams.length; i++) {
                    const teamName = teamData.teams[i].name;
                    const teamID = teamData.teams[i].id;

                    const team = {
                        name: teamName,
                        id: teamID
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

        const fetchData = async () => {
            try {
                const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${selectedTeam.teamID}/roster`);
                const data = await response.json();

                // console.log(data)

                for (let i = 0; i < data.roster.length; i++) {
                    const jerseyNumber = data.roster[i].jerseyNumber;
                    const names = data.roster[i].person.fullName.split(" ");
                    const firstName = names[0];
                    const lastName = names[1];
                    const position = data.roster[i].position.name;
                    const playerLink = data.roster[i].person.link;

                    const linkResponse = await fetch(`https://statsapi.web.nhl.com${playerLink}`); 
                    const linkData = await linkResponse.json();

                    const age = linkData.people[0].currentAge;
                    const height = linkData.people[0].height;
                    const weight = linkData.people[0].weight;
                    const nationality = linkData.people[0].nationality;

                    const playerObject = {
                        jerseyNumber: jerseyNumber,
                        firstName: firstName,
                        lastName: lastName,
                        position: position,
                        age: age,
                        height: height,
                        weight: weight,
                        nationality: nationality,
                    }

                    playersArray.push(playerObject);
                }

                const sortedPlayersArray = playersArray.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);

                const statsResponse = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${selectedTeam.teamID}/stats`)

                const statsData = await statsResponse.json();

                const teamStatsArray = [];
                const teamWins = statsData.stats[0].splits[0].stat.wins;
                const goalsFor = statsData.stats[0].splits[0].stat.goalsPerGame;
                const goalsAgainst = statsData.stats[0].splits[0].stat.goalsAgainstPerGame;
                const shotsPerGame = statsData.stats[0].splits[0].stat.shotsPerGame;
                const shotsAllowedPerGame = statsData.stats[0].splits[0].stat.shotsAllowed;
                const powerPlayPercentage = statsData.stats[0].splits[0].stat.powerPlayPercentage;
                const penaltyKillPercentage = statsData.stats[0].splits[0].stat.penaltyKillPercentage;
                const faceoffPercentage = statsData.stats[0].splits[0].stat.faceOffWinPercentage;

                const winsRank = statsData.stats[1].splits[0].stat.wins;
                const goalsRank = statsData.stats[1].splits[0].stat.goalsPerGame;
                const goalsAgainstRank = statsData.stats[1].splits[0].stat.goalsAgainstPerGame;
                const shotsRank = statsData.stats[1].splits[0].stat.shotsPerGame;
                const shotsAllowedRank = statsData.stats[1].splits[0].stat.shotsAllowed;
                const powerPlayRank = statsData.stats[1].splits[0].stat.powerPlayPercentage;
                const penaltyKillRank = statsData.stats[1].splits[0].stat.penaltyKillPercentage;
                const faceoffRank = statsData.stats[1].splits[0].stat.faceOffWinPercentage;

                const teamStatsObject = {
                    wins: teamWins,
                    winsRank: winsRank,
                    goalsAgainst: goalsAgainst,
                    goalsAgainstRank: goalsAgainstRank,
                    goalsFor: goalsFor,
                    goalsRank: goalsRank,
                    shotsPerGame: shotsPerGame,
                    shotsRank: shotsRank,
                    shotsAllowedPerGame: shotsAllowedPerGame,
                    shotsAllowedRank: shotsAllowedRank,
                    powerPlayPercentage: powerPlayPercentage,
                    powerPlayRank: powerPlayRank,
                    penaltyKillPercentage: penaltyKillPercentage,
                    penaltyKillRank: penaltyKillRank,
                    faceoffPercentage: faceoffPercentage,
                    faceoffRank: faceoffRank

                }
                teamStatsArray.push(teamStatsObject)

                setRoster(sortedPlayersArray);
                setTeamStats(teamStatsArray)
            } catch (error) {
                console.error('Error fetching NHL data');
            }
        };

        if (selectedTeam.teamID !== "") {
            fetchData();
            setRoster([])
            setTeamStats([])
        } else {
            setRoster([])
            setTeamStats([])
        }

    }, [selectedTeam])

    const handleChange = (event) => {
        setSelectedTeam({ teamID: event.target.value, teamName: event.target.options[event.target.selectedIndex].text });
    }

    return (
        <>
            <h1>{selectedTeam.teamName}</h1>
            <select id="team-select" onChange={handleChange}>
                <option value="">Select Team</option>
                {teams.map((team) => {
                    return (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    )
                })}
            </select>
            <div className="flex">
                <div className="width-60">
                    <h2>Roster</h2>
                    <table className="roster-table margin-auto width-60">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Age</th>
                                <th>Height</th>
                                <th>Weight (lbs)</th>
                                <th>Nationality</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roster.map((player, index) => {
                                return (
                                    <tr key={player.jerseyNumber} className={`${index === (roster.length - 1) ? "" : "underlined-row"}`}>
                                        <td>{player.jerseyNumber}</td>
                                        <td>{player.firstName} {player.lastName}</td>
                                        <td>{player.position}</td>
                                        <td>{player.age}</td>
                                        <td>{player.height}</td>
                                        <td>{player.weight}</td>
                                        <td>{player.nationality}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="width-40 margin-auto">
                    <h2>Team Stats</h2>
                    {selectedTeam.teamID === ""
                        ?
                        <></>
                        :
                        <>
                            <p>Wins: {teamStats[0]?.wins} ({teamStats[0]?.winsRank})</p>
                            <p>Goals For: {teamStats[0]?.goalsFor} ({teamStats[0]?.goalsRank})</p>
                            <p>Goals Against: {teamStats[0]?.goalsAgainst} ({teamStats[0]?.goalsAgainstRank})</p>
                            <p>Shots Per Game: {teamStats[0]?.shotsPerGame} ({teamStats[0]?.shotsRank})</p>
                            <p>Shots Allowed Per Game: {teamStats[0]?.shotsAllowedPerGame} ({teamStats[0]?.shotsAllowedRank})</p>
                            <p>Power Play Percentage: {teamStats[0]?.powerPlayPercentage} ({teamStats[0]?.powerPlayRank})</p>
                            <p>Penalty Kill Percentage: {teamStats[0]?.penaltyKillPercentage} ({teamStats[0]?.penaltyKillRank})</p>
                            <p>Faceoff Percentage: {teamStats[0]?.faceoffPercentage} ({teamStats[0]?.faceoffRank})</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default RosterPage;