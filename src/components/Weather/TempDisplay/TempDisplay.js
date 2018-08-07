import React from 'react'

import { connect } from 'react-redux'

import './TempDisplay.css'

const TempDisplay = props => {
    return (
        <div className="prominent-temp">
            <h1>{Math.round(props.currentTemp)}°</h1>
        </div>
    )
}

export default connect(
    state => ({ currentTemp: state.currentTemp }),
    {}
)(TempDisplay)
