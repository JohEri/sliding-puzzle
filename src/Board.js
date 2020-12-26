import React, { useState } from 'react';
import { canSwap, isSolved, shuffle, swap } from './logic';
import Tile from './Tile';

function Board({ rowLength }) {
  const [ numOfTiles ] = useState(rowLength * rowLength);
  const [ boardSize, setBoardSize ] = useState(Math.round(window.innerWidth * 0.33));
  const [ tiles, setTiles ] = useState([...Array(numOfTiles).keys()]);
  const [ isStarted, setIsStarted ] = useState(false);
  const [ numOfMoves, setNumOfMoves ] = useState(0);
  const tileWidth = Math.round(boardSize / rowLength); 
  const tileHeight = Math.round(boardSize / rowLength); 

  /* Using the useEffect hook for resizing the gameboard after rendering on window-resize. Making it responsive. */
  React.useEffect(() => {
    function handleResize() {
      /* Always makes the gameboard width and height 33% of the total window width */
      setBoardSize(Math.round(window.innerWidth * 0.33));
    }
    /* EL listening for the resize-event, and thus triggering the handleResize function */
    window.addEventListener('resize', handleResize);
  })

  /* Function for shuffling the tiles */
  const shuffleTiles = () => {
    /* Call the shuffle-function in the logic.js file */
    const newTiles = shuffle(tiles);
    setTiles(newTiles);
  }

  /* Function for swapping the position of the empty tile and the chosen (clicked) tile */
  const changeTilePosition = (tileIndex) => {
    /* Calling the canSwap function in the logic.js file to check if the chosen tile is next to the empty tile or not */
    if (canSwap(tileIndex, tiles.indexOf(tiles.length -1), rowLength)) {
      /* Fetching the new position of tiles using the swap-function in the logic.js file */
      const changedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1));
      /* Update the tiles with the updated version and add 1 move to total number of moves */
      setTiles(changedTiles);
      setNumOfMoves(numOfMoves + 1);
    }
  }

  /* Function for handling the clicking of a tile */
  const handleTileClick = (index) => {
    /* Checking if the start-game button has been pressed so the board has been shuffled */
    if (isStarted) {
      /* Change the tile position by calling the changeTilePosition function in logic.js */
      changeTilePosition(index);
    }
  }

  /* For handling the startgame button onClick */
  const handleStartClick = () => {
    /* Call the shuffleTiles function and set the start-state to true */
    shuffleTiles();
    setIsStarted(true);
  }

  /* width and height for the boardsize since it needs to be inline for the responsive trigger to work */
  const style = {
    width: boardSize,
    height: boardSize,
  };

  return (
    <>
      <ul style={style} className="Board">
        {/* For every ID in the tiles-array, print a Tile with the starter index and the tile ID */}
        { tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            width={tileWidth}
            height={tileHeight}
            handleTileClick={handleTileClick}
            numOfTiles={numOfTiles}
            rowLength={rowLength}
          />
        ))}
      </ul>
      {/* If the win-condition has been met and the game has been started, print a message prompting the user that the game has been won */}
      {isSolved(tiles) && isStarted && <div className="msgTxt">You won!</div>}
      {/* If the game is not started, show the startgame button, otherwise show the current number of moves */}
      {!isStarted ? 
      (<button onClick={() => handleStartClick()}>Start game</button>) : 
      (<div className="msgTxt">Moves: {numOfMoves}</div>)}
    </>
  );
}

export default Board;
