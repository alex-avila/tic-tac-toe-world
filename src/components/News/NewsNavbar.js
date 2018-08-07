import React, { Component } from 'react'

import { connect } from 'react-redux'
import { switchCategory } from '../../redux'

import './NewsNavbar.css'

class NewsNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'general'
        }
    }

    handleClick = (e, category) => {
        this.props.switchCategory(category)
        const { id } = e.target
        this.setState({
            selected: id
        })
    }

    render() {
        const className = 'news__nav__link'
        const selectedClassName = 'news__nav__link nav__selected'
        const { selected } = this.state
        return (
            <nav className="news__nav">
                <div
                    id="general"
                    className={
                        selected === 'general' ? selectedClassName : className
                    }
                    onClick={e => this.handleClick(e, 'general')}
                >
                    Headlines
                </div>
                <div
                    id="technology"
                    className={
                        selected === 'technology'
                            ? selectedClassName
                            : className
                    }
                    onClick={e => this.handleClick(e, 'technology')}
                >
                    Technology
                </div>
                {/* <div
                    id="entertainment"
                    className={selected === 'entertainment' ? selectedClassName : className}
                    onClick={e => this.handleClick(e, 'entertainment')}
                >
                    Entertainment
                </div> */}
                <div
                    id="science"
                    className={
                        selected === 'science' ? selectedClassName : className
                    }
                    onClick={e => this.handleClick(e, 'science')}
                >
                    Science
                </div>
            </nav>
        )
    }
}

export default connect(
    null,
    { switchCategory }
)(NewsNavbar)
