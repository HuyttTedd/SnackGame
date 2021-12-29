import React, {useEffect, useState, useRef} from 'react';
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

  let counter = useRef(44);
  let historyKey = useRef(39);

  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([POSITION]));
  const [snake, setSnake] = useState(new SinglyLinkedList(44));
  const [position, setPosition] = useState(45);
  const [IsALive, setALive] = useState(true);
  const [keyCode, setKeyCode] = useState(null);
  const [changeDirect, setChangeDirect] = useState(1);

  const step = {
    37: -1,
    38: -10,
    39: 1,
    40: 10
  };
  
  const move = () => {
  // left   = 37
  // up     = 38
  // right  = 39
  // down   = 40
    console.log(keyCode);
    //check exception: if snake is going up, it cannot go down. And if snake is going left, it cannot go right
    if((keyCode == 38 && historyKey.current == 40) ||
    (keyCode == 40 && historyKey.current == 38) ||
    (keyCode == 37 && historyKey.current == 39) ||
    (keyCode == 39 && historyKey.current == 37)) {
      counter.current = counter.current + step[historyKey.current];
      setKeyCode(historyKey.current);
      return setSnakeCells(previousState => new Set([counter.current]));
    }
    //check keyCode
    if(keyCode) {
      historyKey.current = keyCode ? keyCode : historyKey.current;
      counter.current = counter.current + step[historyKey.current];
      console.log(historyKey.current);
      console.log(counter.current);
      console.log("---------------");
      
      if(historyKey.current == 39 && counter.current % 10 == 1) {
        alert("Game over!");
      }
      return setSnakeCells(previousState => new Set([counter.current]));
    } else {
      counter.current++;
      if(historyKey.current == 39 && counter.current % 10 == 1) {
        // if (confirm("Game Over! Restart???") == true) {
        //   counter.current = 44;
        //   return setSnakeCells(previousState => new Set([counter.current]));
        // } else {
        //   setALive(false);
        // }
      }
      return setSnakeCells(previousState => new Set([counter.current]));
    }
  }

  //snack move
  useInterval(() => {
    move(setSnakeCells, position, setPosition, setALive, snakeCells);
  }, IsALive ? 500 : null);

  const handleUserKeyPress = event => {
    console.log('handleUserKeyPress');
    setKeyCode(event.keyCode);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  useEffect(() => {
    console.log('ggg');
  }, [move]);

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