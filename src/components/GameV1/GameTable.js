import React, { Component } from 'react'

import './GameTable.css'

class GameTable extends Component {
    constructor() {
        super()
        this.state = {
            player: 'x',
            computer: 'o',
            boxes: {
                topL: '',
                topM: '',
                topR: '',
                midL: '',
                midM: '',
                midR: '',
                botL: '',
                botM: '',
                botR: ''
            }
        }
        this.winConditions = [
            ['topL', 'topM', 'topR'],
            ['midL', 'midM', 'midR'],
            ['botL', 'botM', 'botR'],
            ['topR', 'midM', 'botL'],
            ['topL', 'midM', 'botR'],
            ['topL', 'midL', 'botL'],
            ['topM', 'midM', 'botM'],
            ['topR', 'midR', 'botR'],
        ]
        this.icons = {
            x: <span className="x"></span>,
            o: <span className="o"></span>
        }
        this.availableBoxes = [] // content generated in component mount
        this.moves = 0
        this.win = false
        this.winner = null
        this.turn = 'player'
    }

    // list available boxes when component mounts
    componentDidMount() {
        this.findAvailableBoxes()
    }

    random = len => {
        return Math.floor(Math.random() * len)
    }
    
    generateBoxes = () => {
        const generatedBoxes = []
        const prefixes = ['top', 'mid', 'bot']
        const suffixes = ['L', 'M', 'R']
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const idName = prefixes[i] + suffixes[j]
                const box = <li key={idName} className={prefixes[i] + ' ' + suffixes[j]} id={idName} onClick={this.playerDraw}></li>
                generatedBoxes.push(box)
            }
        }
        return generatedBoxes
    }
    
    playerDraw = e => {
        const { id } = e.target
        // if target is available box, draw and set it in state
        if (this.availableBoxes.indexOf(id) !== -1 && !this.win && this.turn === 'player') {
            e.target.style.background = 'lightblue'
            this.setState(
                prevState => ({
                    boxes: {
                        ...prevState.boxes,
                        [id]: this.state.player
                    }
                }),
                () => {
                    this.findAvailableBoxes()
                    this.checkWinConditions()
                    this.turn = 'computer'
                    if (!this.win) {
                        setTimeout(() => this.computerDraw(), 250)
                    }
                }
            )
        }
    }

    computerDraw = () => {
        if (this.availableBoxes.length && this.turn === 'computer') {
            const box = this.availableBoxes[this.random(this.availableBoxes.length - 1)]
            const boxElem = document.getElementById(box)
            boxElem.style.background = `palevioletred`
            this.setState(
                prevState => ({
                    boxes: {
                        ...prevState.boxes,
                        [box]: this.state.computer
                    }
                }),
                () => {
                    this.findAvailableBoxes()
                    this.checkWinConditions()
                    this.turn = 'player'
                }
            )
        }
    }

    findAvailableBoxes = () => {
        this.availableBoxes = []
        const { boxes } = this.state
        for (let key in boxes) {
            if (!boxes[key]) {
                this.availableBoxes.push(key)
            }
        }
    }
    
    checkWinConditions = () => {
        const xKeys = []
        const oKeys = []
        const { boxes, player, computer } = this.state
        // get all boxes that belong to each contender
        for (let key in boxes) {
            if (boxes[key] === player) {
                xKeys.push(key)
            }
            if (boxes[key] === computer) {
                oKeys.push(key)
            }
        }
        // loop through winConditions
        // if every item in each array of winConditions is in either keys someone won
        const xWon = this.winConditions.some((arr) => {
            return arr.every(item => xKeys.indexOf(item) !== -1)
        })
        const oWon = this.winConditions.some((arr) => {
            return arr.every(item => oKeys.indexOf(item) !== -1)
        })

        if (xWon) {
            this.win = true
            this.winner = 'player'
        } else if (oWon) {
            this.win = true
            this.winner = 'computer'
        }
    }

    render() {
        return (
            <ul className="grid">
                {this.generateBoxes()}
            </ul>
        );
    }
}

export default GameTable