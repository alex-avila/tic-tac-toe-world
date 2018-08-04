let ai = {
  findAvailableMoves(board) {
    const availableMoves = []
    for (let space in board) {
      if (!board[space]) {
        availableMoves.push(space)
      }
    }
    return availableMoves
  },

  getState(board, target) {
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
    // only checking if 'o' wins because
    // it's impossible for 'o' to make a move
    // and end up losing on this turn
    const boardIsFull = !this.findAvailableMoves(board).length
    if (boardIsFull) {
      for (let i = 0; i < winConditions.length; i++) {
        let [a, b, c] = winConditions[i]
        let won =
          board[a] === target && board[b] === target && board[c] === target
        if (won) {
          return 10 // win
        }
      }
      return 5
    } else {
      for (let i = 0; i < winConditions.length; i++) {
        let [a, b, c] = winConditions[i]
        let won =
          board[a] === target && board[b] === target && board[c] === target
        if (won) {
          return 10 // win
        }
      }
    }

    for (let i = 0; i < winConditions.length; i++) {
      let [a, b, c] = winConditions[i]
      let won =
        board[a] === target && board[b] === target && board[c] === target
      if (won) {
        return 10 // win
      }
    }

    // if board is full

    // if none of those won
    return
  },

  // mathMaxMin(arr, depth = 1) {
  //     let arrCount
  //     let index = 0
  //     arr.forEach((item1, i) => {
  //         if (typeof item1 === 'object') {
  //             arrCount = 0
  //             if (item1.includes(item2 => typeof item2 === 'object')) {
  //                 arrCount++
  //             }
  //             index = i
  //         }
  //     })
  //     // arrCount === 0 means that the current array does not include arrays
  //     if (arrCount && arrCount > 0) {
  //         this.mathMaxMin(arr[index], depth + 1)
  //     } else if (arrCount === 0) {
  //         if (depth % 2 === 0) {
  //             arr[index] = Math.min(...arr[index])
  //             // console.log(...arr[index])
  //         } else {
  //             arr[index] = Math.max(...arr[index])
  //         }
  //     } else {
  //         arr[index] = arr[index]
  //     }

  //     if (arr.some(item => typeof item === 'object')) {
  //         this.mathMaxMin(arr)
  //     } else {
  //         //   console.log('hello')
  //         return arr
  //     }
  //     return arr
  // },

  minimax(board, moves, max) {
    // DATA HANDLING //
    // make an object with the moves and make each move have a value of null
    // as we go through this function
    // we will add either a 1, 0, or -1

    // STEPS //
    // 1a start as max
    // 2a loop through moves
    // 3a send each board with the current move to getState
    // 4a if getState tells us we win, add '1' to the array // important //
    // 5a if getState tells us nothing, don't alter the array
    // and run minimax again as the max = false, so it's min's turn

    // 1b start as min
    // 2b loop through new moves
    // 3b send each newBard with the current move to getState
    // 4b if getState tells us we win, add '-1' to the array // important //
    // 5b if getSTate tells us nothing,

    // 6 go back to step one ...and so on... and so on... and so on...

    // getState should check if the board is full
    // if it doesn't see a win, it should return a '0' // important //

    let target
    let results = []
    if (max) {
      // max's turn
      target = 'o'
      moves.forEach(move => {
        const newBoard = { ...board, [move]: target }
        let result = this.getState(newBoard, target)
        if (result === 10) {
          results.push(10) // win
        } else if (result === 5) {
          results.push(5)
        } else {
          results.push(
            Math.min(
              ...this.minimax(
                newBoard,
                this.findAvailableMoves(newBoard),
                false
              )
            )
          )
        }
      })
    } else {
      // min's turn
      target = 'x'
      moves.forEach(move => {
        const newBoard = { ...board, [move]: target }
        let result = this.getState(newBoard, target)
        if (result === 10) {
          results.push(0)
        } else if (result === 5) {
          results.push(5)
        } else {
          const minmaxResults = Math.max(
            ...this.minimax(newBoard, this.findAvailableMoves(newBoard), true)
          )
          results.push(minmaxResults)
        }
      })
    }
    // console.log(results)
    // run results through a function that will return a one level array
    return results
  },

  // depth 1 is max, depth 2 is min, depth 3 is max, depth 4 is min...

  // DESCRIPTION //
  // take an array and make a new array
  // that new array will consist of only the min values
  // of the first level after the overall max level

  // STEPS //
  // get to an array that doesn't contain an array
  // get the min or max depending on the depth
  // and overwrite that value in the parent array
  // now do this recursively???????

  // mathMaxMin(arr, depth = 1) {
  //     let arrCount
  //     let index = 0
  //     arr.forEach((item1, i) => {
  //         if (typeof item1 === 'object') {
  //             arrCount = 0
  //             if (item1.includes(item2 => typeof item2 === 'object')) {
  //                 arrCount++
  //             }
  //         }
  //         index = i
  //     })
  //     // arrCount === 0 means that the current array does not include arrays
  //     if (arrCount && arrCount > 0) {
  //         this.mathMaxMin(arr[index], depth + 1)
  //     } else if (arrCount) {
  //         if (depth % 2 === 0) {
  //             arr[index] = Math.max(...arr[index])
  //         } else {
  //             arr[index] = Math.min(...arr[index])
  //         }
  //     } else {
  //         arr[index] = arr[index]
  //     }
  //     return arr
  // },

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
