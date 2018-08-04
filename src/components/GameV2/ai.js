let ai = {
  getState(board, contender) {
    const oponent = contender === 'o' ? 'x' : 'o'
    const winConditions = [
      ['topL', 'topM', 'topR'],
      ['midL', 'midM', 'midR'],
      ['botL', 'botM', 'botR'],
      ['topL', 'midM', 'botR'],
      ['topR', 'midM', 'botL'],
      ['topL', 'midL', 'botL'],
      ['topM', 'midM', 'botM'],
      ['topR', 'midR', 'botR']
    ]
    for (let i = 0; i < winConditions.length; i++) {
      let [a, b, c] = winConditions[i]
      if (
        board[a] === contender &&
        board[b] === contender &&
        board[c] === contender
      ) {
        return 1 // win or lose
      }
    }
    return 0
  },

  findAvailableMoves(board) {
    const availableMoves = []
    for (let space in board) {
      if (!board[space]) {
        availableMoves.push(space)
      }
    }
    return availableMoves
  },

  // minimax(board, moves, computer) {
  //     for (let i = 0; i < moves.length; i++) {
  //         const newBoard = {...board, [moves[i]]: 'o'}
  //         const gameState = this.getState(newBoard, 'o')

  //     }
  // },

  // for every available move
  minimax(board, moves, contender) {
    const results = []
    for (let i = 0; i < moves.length; i++) {
      const newBoard = { ...board, [moves[i]]: contender }
      const value = this.getState(newBoard, contender)
      if (value === 1 || value === -1) {
        results.push(value)
        if (value === -1) {
          console.log('woah')
        }
      } else {
        contender = contender === 'o' ? 'x' : 'o'
        const deepResults = this.minimax(
          newBoard,
          this.findAvailableMoves(newBoard),
          contender
        )
        results.push(deepResults)
      }
    }
    if (results.length) {
      return [...results]
    }
  },

  // go through every available move
  // run getState on each
  // if getState finds that there is a win condition met
  // push the number '1' to the results
  // if it doesn't run this function again
  // this function should add to the extisting array an array
  // results: [],
  getBestMove(board, contender, moves) {
    // win = 1
    // lose = -1
    // inconclusive = 0
    const results = []
    for (let i = 0; i < moves.length; i++) {
      let boardCopy = { ...board, [moves[i]]: contender }
      if (this.getState(boardCopy, contender) === 1) {
        results.push(1)
      } else {
        results.push(0)
      }
    }

    for (let i = 0; i < results.length; i++) {
      if (results[i] === 1) {
        return moves[i]
      }
    }
    return moves[Math.floor(Math.random() * moves.length)]

    // alternate contender
    // contender = contender === 'o' ? 'x' : 'o'
    // this.getBestMove(board, contender, moves)
  }
}

export default ai
