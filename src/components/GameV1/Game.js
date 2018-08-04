import React, { Component } from 'react'

import GameTable from './GameTable'

import './Game.css'

class Game extends Component {
  render() {
    return (
      <div className="game__wrapper--outer">
        <div className="game__wrapper--inner">
          <GameTable />
        </div>
      </div>
    )
  }
}

export default Game
