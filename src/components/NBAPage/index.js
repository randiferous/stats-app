import React, { useState, useEffect } from 'react';
import nbaLogos from '../../utility/nbaLogos';
import { API } from "aws-amplify";
import { listNBATeams } from '../../graphql/queries';

function NBAPage() {
    const [atlanticTeams, setAtlanticTeams] = useState([]);
    const [southeastTeams, setSoutheastTeams] = useState([]);
    const [centralTeams, setCentralTeams] = useState([]);
    const [pacificTeams, setPacificTeams] = useState([]);
    const [northwestTeams, setNorthwestTeams] = useState([]);
    const [southwestTeams, setSouthwestTeams] = useState([]);

    useEffect(() => {
        const atlanticTeams = [];
        const southeastTeams = [];
        const centralTeams = [];
        const pacificTeams = [];
        const northwestTeams = [];
        const southwestTeams = [];

        const fetchData = async () => {
            try {
                const allTeams = await API.graphql({
                    query: listNBATeams
                });

                const allTeamsData = allTeams.data.listNBATeams.items;

                for (let i = 0; i < allTeamsData.length; i++) {
                    const teamName = allTeamsData[i].teamName;
                    const teamAbbr = allTeamsData[i].abbreviation;

                    for (let j = 0; j < nbaLogos.length; j++) {
                        if (nbaLogos[j].includes(teamName.toLowerCase())) {
                            allTeamsData[i].logo = nbaLogos[j];
                        } else if (nbaLogos[j].includes(teamAbbr.toLowerCase())) {
                            allTeamsData[i].logo = nbaLogos[j];
                        }
                    }

                    if (allTeamsData[i].division === 'Atlantic') {
                        atlanticTeams.push(allTeamsData[i]);
                    } else if (allTeamsData[i].division === 'Southeast') {
                        southeastTeams.push(allTeamsData[i]);
                    } else if (allTeamsData[i].division === 'Central') {
                        centralTeams.push(allTeamsData[i]);
                    } else if (allTeamsData[i].division === 'Pacific') {
                        pacificTeams.push(allTeamsData[i]);
                    } else if (allTeamsData[i].division === 'Northwest') {
                        northwestTeams.push(allTeamsData[i]);
                    } else {
                        southwestTeams.push(allTeamsData[i]);
                    }
                }

                const sortedAtlanticTeams = atlanticTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);
                const sortedSoutheastTeams = southeastTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);
                const sortedCentralTeams = centralTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);
                const sortedPacificTeams = pacificTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);
                const sortedNorthwestTeams = northwestTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);
                const sortedSouthwestTeams = southwestTeams.sort((a, b) => (a.teamName > b.teamName) ? 1 : -1);

                setAtlanticTeams(sortedAtlanticTeams);
                setSoutheastTeams(sortedSoutheastTeams);
                setCentralTeams(sortedCentralTeams);
                setPacificTeams(sortedPacificTeams);
                setNorthwestTeams(sortedNorthwestTeams);
                setSouthwestTeams(sortedSouthwestTeams);
            } catch (error) {
                console.error('Error fetching NBA data');
                console.log(error)
            }
        };

        fetchData();
    }, []);

    const displayTeams = (team) => {
        return (
            <li key={team.id} className="flex align-center justify-center">
                <a href={team.officialURL} target="_blank" rel="noreferrer" className="width-40"><img src={team.logo} alt={team.teamName} className="logo width-75"></img></a>
                <div className="width-40">
                    <a href={team.officialUrl} target="_blank" rel="noreferrer">{team.teamPlace} {team.teamName}</a>
                    <p className="margin-top-0">
                        Since: {team.playedSince} <br></br>
                        Venue: {team.venue}
                    </p>
                </div>
            </li>
        )
    }

    return (
        <div>
            <h1>NBA Teams</h1>
            <div className="flex flex-column ">
                <div className="width-100">
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
                            <h2>Central Division</h2>
                            <ul className="no-bullets no-start-padding">
                                {centralTeams.map((team) => (
                                    displayTeams(team)
                                ))}
                            </ul>
                        </div>
                        <div className="width-50">
                            <h2>Southeast Division</h2>
                            <ul className="no-bullets no-start-padding">
                                {southeastTeams.map((team) => (
                                    displayTeams(team)
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="width-100">
                    <h2 className="underline">Western Conference</h2>
                    <div className="flex">
                        <div className="width-50">
                            <h2>Northwest Division</h2>
                            <ul className="no-bullets no-start-padding">
                                {northwestTeams.map((team) => (
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
                        <div className="width-50">
                            <h2>Southwest Division</h2>
                            <ul className="no-bullets no-start-padding">
                                {southwestTeams.map((team) => (
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

export default NBAPage;