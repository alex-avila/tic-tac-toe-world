import React from 'react'

import TempDisplay from './TempDisplay/TempDisplay'
import GraphContainer from './GraphContainer/GraphContainer'

import './Weather.css'

const Weather = () => {
  return (
    <div className="weather-wrapper">
      <TempDisplay />
      <GraphContainer />
    </div>
  )
}

export default Weather
