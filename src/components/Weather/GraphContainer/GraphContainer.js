import React from 'react'

import Select from './Select/Select'
import Graph from './Graph/Graph'

import './GraphContainer.css'

const GraphContainer = () => {

    return (
        <div className="graph-container">
            <Select />
            <Graph />
        </div>
    )
}

export default GraphContainer