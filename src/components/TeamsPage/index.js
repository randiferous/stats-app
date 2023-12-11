import React, { useState, useEffect } from 'react';
import teamLogos from '../../utility/logos';
import { API } from "aws-amplify";
import { listTeams } from '../../graphql/queries';

function TeamsPage() {
    const [atlanticTeams, setAtlanticTeams] = useState([]);
    const [metropolitanTeams, setMetropolitanTeams] = useState([]);
    const [centralTeams, setCentralTeams] = useState([]);
    const [pacificTeams, setPacificTeams] = useState([]);

    useEffect(() => {
        const atlanticTeams = [];
        const metropolitanTeams = [];
        const centralTeams = [];
        const pacificTeams = [];
        
        const fetchData = async () => {
            try {
                const allTeams = await API.graphql({
                    query: listTeams
                });
           
                const allTeamsData = allTeams.data.listTeams.items;

                for (let i = 0; i < allTeamsData.length; i++) {
                    const teamNameSplit = allTeamsData[i].teamName.split(' ');
                    const shortName = teamNameSplit[teamNameSplit.length - 1];

                    for (let j = 0; j < teamLogos.length; j++) {
                        if (teamLogos[j].includes(shortName.toLowerCase())) {
                            allTeamsData[i].logo = teamLogos[j];
                        }
                    }

                    if (allTeamsData[i].division === 'Atlantic') {
                        atlanticTeams.push(allTeamsData[i]);
                    } else if (allTeamsData[i].division === 'Metropolitan') {
                        metropolitanTeams.push(allTeamsData[i]);
                    } else if (allTeamsData[i].division === 'Central') {
                        centralTeams.push(allTeamsData[i]);
                    } else {
                        pacificTeams.push(allTeamsData[i]);
                    }
                }

                const sortedAtlanticTeams = atlanticTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);
                const sortedMetropolitanTeams = metropolitanTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);
                const sortedCentralTeams = centralTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);
                const sortedPacificTeams = pacificTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);

                setAtlanticTeams(sortedAtlanticTeams);
                setMetropolitanTeams(sortedMetropolitanTeams);
                setCentralTeams(sortedCentralTeams);
                setPacificTeams(sortedPacificTeams);
            } catch (error) {
                console.error('Error fetching NHL data');
                console.log(error)
            }
        };

        fetchData();
    }, []);

    const displayTeams = (team) => {
        return (
            <li key={team.id} className="flex align-center justify-center">
                <a href={team.officialURL} target="_blank" rel="noreferrer" className="width-40"><img src={team.logo} alt={team.teamName} className="logo width-100"></img></a>
                <div className="width-40">
                    <a href={team.officialUrl} target="_blank" rel="noreferrer">{team.teamName}</a>
                    <p className="margin-top-0">
                        Since: {team.playedSince} <br></br>
                        Venue: {team.venue}, {team.hometown}
                    </p>
                </div>
            </li>
        )
    }

    return (
        <div>
            <h1>NHL Teams</h1>
            <div className="flex">
                <div className="width-50">
                    <h2 className="underline">Eastern Conference</h2>
                    <div className="flex">
                        <div className="width-50">
                            <h2>Atlantic Division</h2>
                            <ul className="no-bullets no-start-padding">
                                {atlanticTeams.map((team) => (
                                    displayTeams(team)
                                ))}
                            </ul>
                        </div>
                        <div className="width-50">
                            <h2>Metropolitan Division</h2>
                            <ul className="no-bullets no-start-padding">
                                {metropolitanTeams.map((team) => (
                                    displayTeams(team)
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="width-50">
                    <h2 className="underline">Western Conference</h2>
                    <div className="flex">
                        <div className="width-50">
                            <h2>Central Division</h2>
                            <ul className="no-bullets no-start-padding">
                                {centralTeams.map((team) => (
                                    displayTeams(team)
                                ))}
                            </ul>
                        </div>
                        <div className="width-50">
                            <h2>Pacific Division</h2>
                            <ul className="no-bullets no-start-padding">
                                {pacificTeams.map((team) => (
                                    displayTeams(team)
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamsPage;