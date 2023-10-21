import React, { useState, useEffect } from 'react';

function GamesPage() {
    const [gamesArray, setGamesArray] = useState([]);

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const formattedDate = `${month}/${day}/${year}`;

    useEffect(() => {
        const emptyGamesArray = [];
        const fetchData = async () => {
            try {
                const response = await fetch('https://statsapi.web.nhl.com/api/v1/schedule')
                const data = await response.json();
                const gamesArray = data.dates[0].games;

                console.log(gamesArray)

                for (let i = 0; i < gamesArray.length; i++) {
                    const homeTeam = gamesArray[i].teams.home.team.name;
                    const homeWins = gamesArray[i].teams.home.leagueRecord.wins;
                    const homeLosses = gamesArray[i].teams.home.leagueRecord.losses;
                    const homeOT = gamesArray[i].teams.home.leagueRecord.ot;
                    const homeScore = gamesArray[i].teams.home.score;
                    const awayTeam = gamesArray[i].teams.away.team.name;
                    const awayWins = gamesArray[i].teams.away.leagueRecord.wins;
                    const awayLosses = gamesArray[i].teams.away.leagueRecord.losses;
                    const awayOT = gamesArray[i].teams.away.leagueRecord.ot;
                    const awayScore = gamesArray[i].teams.away.score;
                    const gameStatus = gamesArray[i].status.detailedState;
                    const gameVenue = gamesArray[i].venue.name;
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

                    emptyGamesArray.push(gameObject);
                }

                setGamesArray(emptyGamesArray);
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
            <div>
                {gamesArray.map((game, index) => (
                    <div key={index}>
                        <div className="flex justify-center">
                            <div>
                                <h3>{game.awayTeam} ({game.awayWins}-{game.awayLosses}-{game.awayOT})</h3>
                                <h4>{game.awayScore}</h4>
                            </div>
                            <h3>&nbsp;&nbsp;@&nbsp;&nbsp;</h3>
                            <div>
                                <h3>{game.homeTeam} ({game.homeWins}-{game.homeLosses}-{game.homeOT})</h3>
                                <h4>{game.homeScore}</h4>
                            </div>
                        </div>
                        <h4>{game.gameStatus}</h4>
                        <h4>{game.gameVenue}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GamesPage;