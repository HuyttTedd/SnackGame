import React, {useEffect, useState} from 'react';
import {
  randomIntFromInterval,
  reverseLinkedList,
  useInterval,
} from '../lib/utils.js';

import './Board.css';

/**
 * TODO: add a more elegant UX for before a game starts and after a game ends.
 * A game probably shouldn't start until the user presses an arrow key, and
 * once a game is over, the board state should likely freeze until the user
 * intentionally restarts the game.
 */

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

class SinglyLinkedList {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

const Direction = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
};

const BOARD_SIZE = 10;
var POSITION = 44;
const PROBABILITY_OF_DIRECTION_REVERSAL_FOOD = 0.3;

const getStartingSnakeLLValue = board => {
  const rowSize = board.length;
  const colSize = board[0].length;
  const startingRow = Math.round(rowSize / 3);
  const startingCol = Math.round(colSize / 3);
  const startingCell = board[startingRow][startingCol];
  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  };
};

// function move(setSnakeCells, position, setPosition, setALive, snakeCells) {
//   setPosition(position + 1)
//   if(snakeCells.has(50)) {
//     setALive(false);
//   } else {
//     return setSnakeCells(previousState => new Set([position]));
//   }
//   // return setSnakeCells(previousState => new Set([...previousState, position]));
// }


const Board = () => {
//create board
  const createBoard = BOARD_SIZE => {
    let counter = 1;
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      const currentRow = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        currentRow.push(counter++);
      }
      board.push(currentRow);
    }
    return board;
  };

  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([POSITION]));
  const [snake, setSnake] = useState(new SinglyLinkedList(44));
  const [position, setPosition] = useState(45);
  const [IsALive, setALive] = useState(true);
  const [keyCode, setKeyCode] = useState(null);

  const move = () => {
    setPosition(position + 1);
    console.log(keyCode);
    //check keyCode
    if()
    if(snakeCells.has(50)) {
      setALive(false);
    } else {
      return setSnakeCells(previousState => new Set([position]));
    }
  }

  //snack move
  useInterval(() => {
    move(setSnakeCells, position, setPosition, setALive, snakeCells);
  }, IsALive ? 500 : null);

  // left   = 37
  // up     = 38
  // right  = 39
  // down   = 40
  const handleUserKeyPress = event => {
    setKeyCode(event.keyCode);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);


//k:107 j:106 l:108 i:105
  return(
    <div className='board'>
      <button 
        onClick={() => move(setSnakeCells, position, setPosition, setALive, snakeCells) }
      >
          Move
      </button>
      {
        board.map((row, rowIdx) => (
          <div key={rowIdx} className='row'>
            {
              row.map((cellValue, cellIdx) => (
                <div 
                  key={cellIdx} 
                  className={`cell ${
                    snakeCells.has(cellValue) ? 'snake-cell' : ''
                  }`}>{cellValue}  
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
};

export default Board;