import React, { Component } from 'react';

import { connect } from 'react-redux'
import { switchCategory } from '../../redux'

import './NewsNavbar.css'

class NewsNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'general',
            categories: [
                'general',
                'technology',
                'entertainment',
                'science'
            ],
            expanded: true
        }
    }

    handleClick = (e, category) => {
        this.props.switchCategory(category)
        const { id } = e.target
        this.setState(prevState => ({
            selected: id,
            expanded: !prevState.expanded
        }))
    }

    handleExpand = () => {
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }))
    }

    render() {
        const mappedDropdown = this.state.categories
            .filter(category => category !== this.state.selected)
            .map((category, i) => {
                let display = category[0].toUpperCase() + category.slice(1)
                if (category === 'general') {
                    display = 'Headlines'
                }
            return (
                <div 
                    key={category+i}
                    id={category}
                    onClick={e => this.handleClick(e, category)}
                    className={'news__nav__link'}
                >
                    {display}
                </div>
            )
        })
        console.log(mappedDropdown)
        const { selected, expanded } = this.state
        return (
            <nav className="news__nav">
                <div
                    id={selected}
                    className= "news__nav__link nav__selected"
                    onClick={e => this.handleClick(e, selected)}
                >
                    <div>
                        <p>{selected === 'general' ? 'Headlines' : selected[0].toUpperCase() + selected.slice(1)}</p>
                        <div onClick={this.handleExpand}>▼</div>
                    </div>
                </div>
                <div className={expanded ? `dropdown-items` : `dropdown-items expanded`}>
                    { mappedDropdown }
                </div>
            </nav>
        );
    }
}

export default connect(null, { switchCategory })(NewsNavbar)