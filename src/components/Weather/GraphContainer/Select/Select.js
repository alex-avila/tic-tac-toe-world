import React, { Component } from 'react'

import { connect } from 'react-redux'
import { toggleMode, changeLocation, getWeather } from '../../../../redux'

import './Select.css'

class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMode: 'hourly'
        }
    }

    handleClick = mode => {
        if (mode !== this.state.currentMode) {
            this.setState({
                currentMode: mode
            })
            this.props.toggleMode()
        }
    }

    handleLocationRequest = () => {
        if (!this.props.active) {
            this.props.changeLocation(!this.props.active)
        } else {
            this.props.getWeather()
        }
    }

    render() {
        const { currentMode } = this.state
        const { active } = this.props
        return (
            <div className="select__wrapper--outer">
                <div className="select__wrapper--inner">
                    <div
                        className={
                            currentMode === 'hourly'
                                ? 'select__selection selected'
                                : 'select__selection'
                        }
                        onClick={() => this.handleClick('hourly')}
                    >
                        <span>Hourly</span>
                    </div>
                    <div
                        className={
                            currentMode === 'daily'
                                ? 'select__selection selected'
                                : 'select__selection'
                        }
                        onClick={() => this.handleClick('daily')}
                    >
                        <span>Daily</span>
                    </div>
                    <div
                        className={`location-icon ${active ? 'active' : null}`}
                        onClick={this.handleLocationRequest}
                    >
                        <i className="material-icons">my_location</i>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ active: state.locationActive }),
    { toggleMode, changeLocation, getWeather }
)(Select)
