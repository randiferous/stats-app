import React, { useState, useEffect } from 'react';

function GamesPage() {
    const [gamesArray, setGamesArray] = useState([]);

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const formattedDate = `${month}/${day}/${year}`;

    useEffect(() => {
        const effectGamesArray = [];
        const linksArray = [];

        const fetchData = async () => {
            try {
                const response = await fetch('https://statsapi.web.nhl.com/api/v1/schedule')
                const data = await response.json();
                // console.log(data);

                const responseArray = data.dates[0].games;

                for (let i = 0; i < responseArray.length; i++) {
                    const homeTeam = responseArray[i].teams.home.team.name;
                    const homeWins = responseArray[i].teams.home.leagueRecord.wins;
                    const homeLosses = responseArray[i].teams.home.leagueRecord.losses;
                    const homeOT = responseArray[i].teams.home.leagueRecord.ot;
                    const homeScore = responseArray[i].teams.home.score;
                    const awayTeam = responseArray[i].teams.away.team.name;
                    const awayWins = responseArray[i].teams.away.leagueRecord.wins;
                    const awayLosses = responseArray[i].teams.away.leagueRecord.losses;
                    const awayOT = responseArray[i].teams.away.leagueRecord.ot;
                    const awayScore = responseArray[i].teams.away.score;
                    const gameStatus = responseArray[i].status.detailedState;
                    const gameVenue = responseArray[i].venue.name;
                    const gameLink = responseArray[i].link;

                    const gameObject = {
                        homeTeam,
                        homeWins,
                        homeLosses,
                        homeOT,
                        homeScore,
                        awayTeam,
                        awayWins,
                        awayLosses,
                        awayOT,
                        awayScore,
                        gameStatus,
                        gameVenue
                    }

                    effectGamesArray.push(gameObject);
                    linksArray.push(gameLink);
                }

                try {
                    for (let i = 0; i < linksArray.length; i++) {
                        const response = await fetch(`https://statsapi.web.nhl.com${linksArray[i]}`);
                        const data = await response.json();
                        // console.log(data);

                        const awayShots = data.liveData.linescore.teams.away.shotsOnGoal;
                        const homeShots = data.liveData.linescore.teams.home.shotsOnGoal;
                        const awayPIM = data.liveData.boxscore.teams.away.teamStats.teamSkaterStats.pim;
                        const homePIM = data.liveData.boxscore.teams.home.teamStats.teamSkaterStats.pim;
                        const firstStar = data.liveData.decisions.firstStar?.fullName;
                        const secondStar = data.liveData.decisions.secondStar?.fullName;
                        const thirdStar = data.liveData.decisions.thirdStar?.fullName;

                        if (firstStar !== undefined) {
                            const firstStarLink = data.liveData.decisions.firstStar.link;
                            const secondStarLink = data.liveData.decisions.secondStar.link;
                            const thirdStarLink = data.liveData.decisions.thirdStar.link;

                            const starLinkArray = [firstStarLink, secondStarLink, thirdStarLink];
                            const teamAbbreviationArray = [];

                            for (let j = 0; j < starLinkArray.length; j++) {
                                const response = await fetch(`https://statsapi.web.nhl.com${starLinkArray[j]}`);
                                const data = await response.json();
                                const teamLink = data.people[0].currentTeam.link;

                                const teamResponse = await fetch(`https://statsapi.web.nhl.com${teamLink}`);
                                const teamData = await teamResponse.json();
                                const teamAbbreviation = teamData.teams[0].abbreviation;
                                teamAbbreviationArray.push(teamAbbreviation);
                                effectGamesArray[i].teamAbbreviationArray = teamAbbreviationArray;
                            }
                        }

                        effectGamesArray[i].awayShots = awayShots;
                        effectGamesArray[i].homeShots = homeShots;
                        effectGamesArray[i].awayPIM = awayPIM;
                        effectGamesArray[i].homePIM = homePIM;
                        effectGamesArray[i].firstStar = firstStar || 'N/A';
                        effectGamesArray[i].secondStar = secondStar || 'N/A';
                        effectGamesArray[i].thirdStar = thirdStar || 'N/A';
                    }

                    setGamesArray(effectGamesArray);
                } catch (error) {
                    console.error('Error fetching NHL data');
                }

            } catch (error) {
                console.error('Error fetching NHL data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Games</h1>
            <h2>{formattedDate}</h2>
            <div className = "flex flex-wrap space-evenly">
                {gamesArray.map((game, index) => (
                    <div key={index} className="width-40">
                        <div className="flex justify-center">
                            <div>
                                <h3>{game.awayTeam} ({game.awayWins}-{game.awayLosses}-{game.awayOT})</h3>
                                <h4>{game.awayScore}</h4>
                                <h5 className="margin-tb-0">{game?.awayShots} Shots</h5>
                                <h5 className="margin-tb-0">{game?.awayPIM} PIM</h5>
                            </div>
                            <h3>&nbsp;&nbsp;@&nbsp;&nbsp;</h3>
                            <div>
                                <h3>{game.homeTeam} ({game.homeWins}-{game.homeLosses}-{game.homeOT})</h3>
                                <h4>{game.homeScore}</h4>
                                <h5 className="margin-tb-0">{game?.homeShots} Shots</h5>
                                <h5 className="margin-tb-0">{game?.homePIM} PIM</h5>
                            </div>
                        </div>
                        <h4>{game.gameStatus}</h4>
                        <h5 className="margin-tb-0">1st Star: {game.firstStar} ({game.teamAbbreviationArray[0]})</h5>
                        <h5 className="margin-tb-0">2nd Star: {game.secondStar} ({game.teamAbbreviationArray[1]})</h5>
                        <h5 className="margin-tb-0">3rd Star: {game.thirdStar} ({game.teamAbbreviationArray[2]})</h5>
                        <h4>{game.gameVenue}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GamesPage;