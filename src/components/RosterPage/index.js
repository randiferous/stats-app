import React, { useEffect, useState } from 'react';

function RosterPage() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [roster, setRoster] = useState([]);

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
                const statsResponse = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${selectedTeam.teamID}/stats`)
                const data = await response.json();
                const statsData = await statsResponse.json();
                console.log(statsData);
                // team stats to possibly display: faceoff% (rank), goalsPerGame (rank), goalsAgainstPerGame (rank), shotsPerGame (rank), shotsAllowed (rank), powerPlayPercentage (rank), PenaltyKillPercentage (rank)

                for (let i = 0; i < data.roster.length; i++) {
                    const jerseyNumber = data.roster[i].jerseyNumber;
                    const names = data.roster[i].person.fullName.split(" ");
                    const firstName = names[0];
                    const lastName = names[1];
                    const position = data.roster[i].position.name;

                    const playerObject = {
                        jerseyNumber: jerseyNumber,
                        firstName: firstName,
                        lastName: lastName,
                        position: position
                    }

                    playersArray.push(playerObject);
                }

                const sortedPlayersArray = playersArray.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
                setRoster(sortedPlayersArray);

            } catch (error) {
                console.error('Error fetching NHL data');
            }
        };

        if (selectedTeam !== "") {
            fetchData();
            setRoster([])
        }

    }, [selectedTeam])

    const handleChange = (event) => {
        setSelectedTeam({ teamID: event.target.value, teamName: event.target.options[event.target.selectedIndex].text });
    }

    return (
        <div>
            <h1>Roster</h1>
            <select onChange={handleChange}>
                <option value="">Select Team</option>
                {teams.map((team) => {
                    return (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    )
                })}
            </select>
            <h2>{selectedTeam.teamName}</h2>
            <table className="margin-auto width-25">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {roster.map((player) => {
                        return (
                            <tr key={player.jerseyNumber}>
                                <td>{player.jerseyNumber}</td>
                                <td>{player.firstName} {player.lastName}</td>
                                <td>{player.position}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RosterPage;