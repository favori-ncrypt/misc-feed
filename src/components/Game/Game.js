import React from 'react';
import './styles.css';

import Board from './Board/Board';

class Game extends React.Component {
    render() {
      return (
        <div className="game-board">
            <Board />
        </div>
      );
    }
  }

export default Game;