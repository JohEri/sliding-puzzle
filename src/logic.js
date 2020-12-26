/* Function for checking if the puzzle is done. Takes in the tile-id's */
export function isSolved(tiles) {
    /* Loops the same amount of times as tile-id's in the array */ 
    for (var i = 0; i < tiles.length; i++) {
        /* If the tile ID is not the same as the index, it means the tile is not on its starting (correct) position. (Tile 0 has starting position 0, 1 has 1, etc.) */
        if (tiles[i] !== i) {
            return false;
        }
    }
    /* If all the tiles equalled their subsequent indexes, it means the game has been won */
    return true;
}

/* Function for getting the row + col pair from the tile index and number of rows */
export function getRowColPair(index, rowLength) {
    /* The row (0, 1, or 2) will always be the index divided by the number of rows. For example a tile on index 4 (in the middle of the board) is on row-id 4 divided by 3 rounded down which is 1 */
    /* The column (0, 1, or 2) will always be the modulo (the leftover) of the index divided by the number of rows. For example a tile on index 4 (in the middle of the board) is on column-id 4 modulo 3 which is 1. Since you have 1 leftover if you divide 4 by 3.  */
    return {
        row: Math.floor(index / rowLength),
        col: index % rowLength,
    };
}

/* Gets the x and y coordinates for a tile based on the tiles current row, column and the size of the tile */
export function getVisualPosition(row, col, width, height) {
    /* Column multiplied by the tiles width equals the x-axis coordinates, row multiplied by the tiles height equals the y-axis coordinates */
    /* 0, 0 means the tile will be placed in the upper left corner of the board (The first tiles startposition). Since it's on boardindex 0 the coordinates will be 0, 0. */
    return {
        x: col * width,
        y: row * height,
    };
}

/* Randomize the location of the tiles */
export function shuffle(tiles) {
    
    const newTiles = tiles.sort(() => Math.random() - 0.5);
    /* Make sure the random positions is not the solution of the puzzle. If the random positions are the solution, shuffle them again. */
    return !isSolved(newTiles)
        ? newTiles
        : shuffle(newTiles);
}

/* Function to check if the chosen source-tile is next to the empty tile (destination) */
export function canSwap(source, destination, rowLength) {
    /* Fetch the row/col pairs from the source and destination indexes */
    const { row: sourceRow, col: sourceCol } = getRowColPair(source, rowLength);
    const { row: destRow, col: destCol } = getRowColPair(destination, rowLength);
    /* return true/false based on if (sourcerow - destinationrow) + (sourcecolumn -destinationcolumn) equals 1 or -1  */
    /* If it returns 1 or -1 it means the indexes are next to eachother and are able to swap */
    return Math.abs(sourceRow - destRow) + Math.abs(sourceCol - destCol) === 1;
}

/* Function for swapping the position of tiles */
export function swap(tiles, source, destination) {
    const newTiles = [...tiles];
    /* Swaps the clicked tiles position (source) with the empty tiles position (destination) */
    [newTiles[source], newTiles[destination]] = [newTiles[destination], newTiles[source]];
    /* Returns the new order of tiles */
    return newTiles;
}
