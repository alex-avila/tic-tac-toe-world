import React, { Component } from 'react'

import { connect } from 'react-redux'

import '../../../../../node_modules/react-vis/dist/style.css'

import {
    XYPlot,
    LineSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis
} from 'react-vis'

const breakpoint = 500

class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            windowWidth: 0
        }
    }

    componentDidMount() {
        this.setState({ windowWidth: window.innerWidth })
        window.addEventListener('resize', e => {
            this.setState({ windowWidth: window.innerWidth })
        })
    }

    componentWillMount() {
        window.addEventListener('resize', null)
    }

    render() {
        const height = this.state.windowWidth >= breakpoint ? 300 : 225
        const width = this.state.windowWidth >= breakpoint ? 450 : 350
        const { dailyPlots, hourlyPlots, modeIndex, graphModes } = this.props
        const dailyTickFormat = v => `${v.getMonth()}/${v.getDate()}`
        const hourlyTickFormat = v => `${v.getHours()}`
        return (
            <XYPlot
                height={height}
                width={width}
                yPadding={10}
                xType={'time'}
                animation
            >
                <VerticalGridLines tickTotal={8} />
                <HorizontalGridLines />
                <XAxis
                    tickFormat={
                        graphModes[modeIndex] === 'daily'
                            ? dailyTickFormat
                            : hourlyTickFormat
                    }
                    tickTotal={8}
                    title="Time"
                />
                <YAxis title="Degrees" />
                <LineSeries
                    data={
                        graphModes[modeIndex] === 'daily'
                            ? dailyPlots
                            : hourlyPlots
                    }
                    color={'#B2C1F5'}
                    curve={'curveMonotoneX'}
                />
            </XYPlot>
        )
    }
}

export default connect(
    state => state,
    {}
)(Graph)
