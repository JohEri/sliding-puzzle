import React from 'react';
import { Motion, spring } from 'react-motion';
import { getRowColPair, getVisualPosition } from './logic';

function Tile(props) {
    const { tile, index, width, height, handleTileClick, numOfTiles, rowLength } = props;
    const { row, col } = getRowColPair(index, rowLength);
    const visualPos = getVisualPosition(row, col, width, height);
    /* Some style for the tiles. Can't be in the CSS-file since it needs the logic-functions to know where to position itself */
    const tileStyle = {
        /* Calculate 100% width divided by the number of rows (100% / 3 = 33.333%) */
        width: `calc(100% / ${rowLength})`,
        height: `calc(100% / ${rowLength})`,
        /* X and Y position that we got from the getVisualPosition function in logic.js */
        translateX: visualPos.x,
        translateY: visualPos.y,
    };

    /* X and Y positions for the Motion animation component */
    const motionStyle = {
        translateX: spring(visualPos.x),
        translateY: spring(visualPos.y)
    }

    return (
        /* Using react-motion animation package */
        <Motion style={motionStyle}>
            {({ translateX, translateY }) => (
            <li
                style={{
                    ...tileStyle,
                    transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                    /* Change opacity to 0 if the tile is the last tile (the tile which is "not there") */
                    opacity: tile === numOfTiles - 1 ? 0 : 1,
                }}
                className="Tile"
                onClick={() => handleTileClick(index)}
            >
                {tile + 1}    
            </li>
            )}
        </Motion>
    );
}

export default Tile;
