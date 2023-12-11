import React, { useState, useEffect } from 'react';

function GamesPage() {
    const [gamesArray, setGamesArray] = useState([]);

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const formattedDate = `${month}/${day}/${year}`;

    useEffect(() => {
        const effectGamesArray = [];

        const fetchData = async () => {
            try {
                const response = await fetch('/scores')
                const data = await response.json();
                console.log(data);

                const responseArray = data.games;

                for (let i = 0; i < responseArray.length; i++) {
                    const homeTeam = responseArray[i].homeTeam.name.default;
                    const homeLogo = responseArray[i].homeTeam.logo;
                    const homeScore = responseArray[i].homeTeam.score;
                    const homeShots = responseArray[i].homeTeam.sog;

                    const awayTeam = responseArray[i].awayTeam.name.default;
                    const awayLogo = responseArray[i].awayTeam.logo;
                    const awayScore = responseArray[i].awayTeam.score;
                    const awayShots = responseArray[i].awayTeam.sog;

                    const gameOutcome = responseArray[i].gameOutcome.lastPeriodType;
                    const gameVenue = responseArray[i].venue.default;
                    const startTime = convertTimestamp(responseArray[i].startTimeUTC);
                    const gameState = responseArray[i].gameState;

                    const gameObject = {
                        homeTeam,
                        homeLogo,
                        homeScore,
                        homeShots,
                        awayTeam,
                        awayLogo,
                        awayScore,
                        awayShots,
                        gameOutcome,
                        gameVenue,
                        startTime,
                        gameState
                    }

                    effectGamesArray.push(gameObject);
                }

                setGamesArray(effectGamesArray);
            } catch (error) {
                console.error('Error fetching NHL data');
            }
        };

        fetchData();
    }, []);

    function convertTimestamp(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
        return `${hours}:${minutesStr} ${ampm}`;
    }

    return (
        <div>
            <h1>Games</h1>
            <h2>{formattedDate}</h2>
            <div className="flex flex-wrap space-evenly">
                {gamesArray.map((game, index) => (
                    <div key={index} className="width-40">
                        <div className="flex justify-center">
                            <div>
                                <h2 className="margin-b-0">{game.awayTeam}</h2>
                                <img src={game.awayLogo} alt="placeholder" className="width-40"></img>
                                <h3 className="margin-top-0">{game.awayScore}</h3>
                                <h5 className="margin-tb-0">{game?.awayShots} Shots</h5>
                            </div>
                            <div>
                                <h3>&nbsp;&nbsp;@&nbsp;&nbsp;</h3>
                                <h3 className="margin-t-175">VS</h3>
                            </div>
                            <div>
                                <h2 className="margin-b-0">{game.homeTeam}</h2>
                                <img src={game.homeLogo} alt="placeholder" className="width-40"></img>
                                <h3 className="margin-top-0">{game.homeScore}</h3>
                                <h5 className="margin-tb-0">{game?.homeShots} Shots</h5>
                            </div>
                        </div>
                        {
                            (((game.gameStatus === "In Progress") || (game.currentPeriod === "OT")) &&
                                (
                                    <h4 className="margin-tb-0">{game.gameStatus} - {game.currentPeriod}</h4>
                                ))
                            ||
                            (
                                <h4 className="margin-tb-0">Final - {game.gameOutcome}</h4>
                            )
                        }
                        <h4 className="margin-top-0">{game.gameVenue}, {game.startTime}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GamesPage;